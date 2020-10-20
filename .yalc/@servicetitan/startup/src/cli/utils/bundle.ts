import fs from 'fs';
import path from 'path';
import util from 'util';
import execa from 'execa';
import crypto from 'crypto';
import getPort, { makeRange } from 'get-port';
import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { createWebpackConfig, WebComponent, sharedDependencies } from '../../webpack';
import { log, readJson, isSass, isLess, getFolders } from '.';

export function isBundle() {
    return readJson('./package.json').cli?.webpack !== false;
}

export function isCustomStyleRules() {
    const configuration = readJson('./package.json').cli ?? {};

    if (typeof configuration.webpack !== 'object') {
        return false;
    }

    return configuration.webpack['custom-style-rules'] === true;
}

export function isWebComponent() {
    return readJson('./package.json').cli?.['web-component'] === true;
}

function generateName(packageName: string) {
    const name = packageName.replace(/\//g, '-').replace(/[^\w-]/g, '');
    const hash = crypto.randomBytes(4).toString('hex');

    return `${name}-${hash}`;
}

async function prepareWebComponent() {
    const { destination } = getFolders();
    const { name } = readJson('./package.json');

    await execa(
        'tsc',
        [
            '--project',
            path.resolve(__dirname, '../../../web-component/tsconfig.json'),
            '--outDir',
            `./${destination}`,
        ],
        {
            stdio: 'inherit',
        }
    );

    fs.copyFileSync(
        path.resolve(__dirname, '../../../web-component/design-system.css'),
        `./${destination}/design-system.css`
    );

    fs.writeFileSync(
        `./${destination}/metadata.json`,
        JSON.stringify({
            name: generateName(name),
            sharedDependencies,
        }),
        'utf8'
    );
}

export async function bundle() {
    log.info('Bundling the package...');

    const run = async (config: Configuration) => {
        if (!config.module) {
            config.module = {
                rules: [],
            };
        }

        if (isSass() && !isCustomStyleRules()) {
            config.module.rules.push(
                {
                    test: /\.module.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { modules: { exportLocalsConvention: 'camelCase' } },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /(\.scss)$/,
                    exclude: /\.module.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                }
            );
        }

        if (isLess() && !isCustomStyleRules()) {
            config.module.rules.push(
                {
                    test: /\.module.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { modules: { exportLocalsConvention: 'camelCase' } },
                        },
                        'less-loader',
                    ],
                },
                {
                    test: /(\.less)$/,
                    exclude: /\.module.less$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                }
            );
        }

        const stats = await util.promisify<webpack.Configuration, webpack.Stats>(webpack)(config);

        if (stats.hasErrors()) {
            throw stats.toString('errors-only');
        }

        process.stdout.write(
            stats.toString(
                typeof config.stats === 'object'
                    ? {
                          colors: true,
                          ...config.stats,
                      }
                    : config.stats
            ) + '\n'
        );
    };

    if (isWebComponent()) {
        await prepareWebComponent();

        return Promise.all([
            run(
                createWebpackConfig(
                    {
                        configuration: { mode: 'development' },
                    },
                    { webComponent: WebComponent.Light }
                )
            ),
            run(
                createWebpackConfig(
                    {
                        configuration: { mode: 'development' },
                    },
                    { webComponent: WebComponent.Full }
                )
            ),
        ]);
    }

    return run(
        fs.existsSync('./webpack.prod.config.js')
            ? require(path.resolve('./webpack.prod.config.js'))
            : createWebpackConfig({
                  configuration: { mode: 'production' },
              })
    );
}

export async function bundleWatch() {
    log.info('Bundling the package...');

    if (isWebComponent()) {
        await prepareWebComponent();
    }

    const { devServer, ...config } = isWebComponent()
        ? createWebpackConfig(
              {
                  configuration: { mode: 'development' },
              },
              { webComponent: WebComponent.Full }
          )
        : fs.existsSync('./webpack.dev.config.js')
        ? require(path.resolve('./webpack.dev.config.js'))
        : createWebpackConfig({
              configuration: { mode: 'development' },
          });

    if (isSass() && !isCustomStyleRules()) {
        config.module.rules.push(
            {
                test: /\.module.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: { exportLocalsConvention: 'camelCase' } },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /(\.scss)$/,
                exclude: /\.module.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        );
    }

    if (isLess() && !isCustomStyleRules()) {
        config.module.rules.push(
            {
                test: /\.module.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { modules: { exportLocalsConvention: 'camelCase' } },
                    },
                    'less-loader',
                ],
            },
            {
                test: /(\.less)$/,
                exclude: /\.module.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            }
        );
    }

    const server = new WebpackDevServer(webpack(config), devServer);

    const port = await getPort({
        port: makeRange(devServer.port ?? 8080, ((devServer.port as number) ?? 8080) + 250),
        host: devServer.host,
    });

    await new Promise<void>((_0, reject) => {
        server.listen(port, devServer.host, e => {
            if (e) {
                reject(e);
            }
        });
    });
}
