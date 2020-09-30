import fs from 'fs';
import util from 'util';
import path from 'path';
import glob from 'glob';
import sass from 'node-sass';
import sassPackageImporter from 'node-sass-package-importer';
import less from 'less';
const lessPackageImporter = require('less-plugin-npm-import');
import chokidar from 'chokidar';

import DtsCreator from 'typed-css-modules';

import { log, getFolders, isSass, isLess, getStyleExtensions } from '.';

async function compileScss(filePath: string) {
    const result = await util.promisify(sass.render)({
        data: fs.readFileSync(filePath, 'utf8'),
        importer: sassPackageImporter(),
        includePaths: [path.dirname(filePath)],
    });

    return result.css.toString();
}

async function compileLess(filePath: string) {
    const result = await less.render(fs.readFileSync(filePath, 'utf8'), {
        plugins: [new lessPackageImporter({ prefix: '~' })],
        paths: [path.dirname(filePath)],
    });

    return result.css;
}

interface RunOptions {
    pattern?: string;
    outDir?: string;
    watch?: boolean;
    camelCase?: boolean;
    dropExtension?: boolean;
    preprocessor?: 'less' | 'scss';
    silent?: boolean;
}

async function run(searchDir: string, options: RunOptions = {}) {
    const filesPattern = path.join(
        searchDir,
        options.pattern ??
            (!options.preprocessor
                ? '**/*.css'
                : options.preprocessor === 'scss'
                ? '**/*.scss'
                : '**/*.less')
    );

    const creator = new DtsCreator({
        rootDir: process.cwd(),
        searchDir,
        outDir: options.outDir,
        camelCase: options.camelCase,
        dropExtension: options.dropExtension,
    });

    const writeFile = async (filePath: string) => {
        try {
            const content = await creator.create(
                filePath,
                !options.preprocessor
                    ? undefined
                    : options.preprocessor === 'scss'
                    ? await compileScss(filePath)
                    : await compileLess(filePath),
                !!options.watch
            );
            await content.writeFile();

            if (!options.silent) {
                log.info('Wrote ' + content.outputFilePath);
            }
        } catch (error) {
            log.error(error);
        }
    };

    if (!options.watch) {
        const files = await util.promisify(glob)(filesPattern);

        await Promise.all(files.map(writeFile));
    } else {
        log.info('Watch ' + filesPattern + '...');

        const watcher = chokidar.watch([filesPattern.replace(/\\/g, '/')], { ignoreInitial: true });
        watcher.on('add', writeFile);
        watcher.on('change', writeFile);

        await new Promise<void>(() => {});
    }
}

export async function tcm() {
    const { source } = getFolders();
    const extensions = getStyleExtensions();

    log.info(
        `Generating TypeScript definition files for ${extensions
            .map(e => e.toUpperCase())
            .join(', ')} Module files...`
    );

    await Promise.all([
        run('./', {
            pattern: `${source}/**/*.module.css`,
            camelCase: true,
            silent: true,
        }),
        isSass()
            ? run('./', {
                  pattern: `${source}/**/*.module.scss`,
                  preprocessor: 'scss',
                  camelCase: true,
                  silent: true,
              })
            : Promise.resolve(),
        isLess()
            ? run('./', {
                  pattern: `${source}/**/*.module.less`,
                  preprocessor: 'less',
                  camelCase: true,
                  silent: true,
              })
            : Promise.resolve(),
    ]);
}

export async function tcmWatch() {
    const { source } = getFolders();

    await Promise.all([
        run('./', {
            pattern: `${source}/**/*.module.css`,
            camelCase: true,
            watch: true,
        }),
        isSass()
            ? run('./', {
                  pattern: `${source}/**/*.module.scss`,
                  preprocessor: 'scss',
                  camelCase: true,
                  watch: true,
              })
            : Promise.resolve(),
        isLess()
            ? run('./', {
                  pattern: `${source}/**/*.module.less`,
                  preprocessor: 'less',
                  camelCase: true,
                  watch: true,
              })
            : Promise.resolve(),
    ]);
}
