import { Configuration } from 'webpack';
import { CleanWebpackPlugin, Options as CleanWebpackPluginOptions } from 'clean-webpack-plugin';
import MiniCssExtractPlugin, {
    PluginOptions as MiniCssExtractPluginOptions,
} from 'mini-css-extract-plugin';
import merge from 'webpack-merge';

import { Options } from '.';
import { createConfig as createSharedConfig, Overrides as SharedOverrides } from './shared.config';

export interface Overrides {
    configuration: SharedOverrides['configuration'] & {
        mode: 'production';
    };
    plugins?: SharedOverrides['plugins'] & {
        CleanWebpackPlugin?: CleanWebpackPluginOptions;
        MiniCssExtractPlugin?: MiniCssExtractPluginOptions;
    };
}

const cdnPath = process.env.CLIENT_CDN_PATH;

export function createConfig(
    { configuration, plugins = {} }: Overrides,
    options: Options = {}
): Configuration {
    const {
        CleanWebpackPlugin: cleanWebpackPluginOptions,
        MiniCssExtractPlugin: miniCssExtractPluginOptions,
    } = plugins;

    const { customStyleRules, webComponent } = options;

    return merge(
        createSharedConfig({ plugins }, options),
        {
            devtool: 'source-map',
            module: {
                rules: !customStyleRules
                    ? [
                          {
                              test: /\.module.css$/,
                              use: [
                                  MiniCssExtractPlugin.loader,
                                  {
                                      loader: 'css-loader',
                                      options: { modules: { exportLocalsConvention: 'camelCase' } },
                                  },
                              ],
                          },
                          {
                              test: /(\.css)$/,
                              exclude: /\.module.css$/,
                              use: [MiniCssExtractPlugin.loader, 'css-loader'],
                          },
                      ]
                    : [],
            },
            plugins: [
                new CleanWebpackPlugin({ ...cleanWebpackPluginOptions }),
                ...(!customStyleRules
                    ? [
                          new MiniCssExtractPlugin({
                              ...(webComponent
                                  ? { filename: 'index.css' }
                                  : {
                                        filename: '[name].[contenthash:8].bundle.css',
                                        chunkFilename: '[name].[contenthash:8].bundle.css',
                                    }),
                              ...miniCssExtractPluginOptions,
                          }),
                      ]
                    : []),
            ],
            output: {
                ...(!webComponent
                    ? {
                          filename: '[name].[contenthash:8].bundle.js',
                          chunkFilename: '[name].[contenthash:8].bundle.js',
                      }
                    : {}),
            },
        },
        configuration,
        cdnPath
            ? {
                  output: {
                      publicPath: cdnPath,
                  },
              }
            : {}
    );
}
