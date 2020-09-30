import { ESLint } from 'eslint';
import stylelint, { LinterOptions } from 'stylelint';

import { log, logErrors, readJson, getDestinationFolders } from '../utils';
import { Command } from '.';

interface StylelintOptions extends LinterOptions {
    ignorePattern: string | string[];
}

export function getESLintConfig(): ESLint.Options {
    return readJson('./package.json').cli?.lint?.eslint ?? {};
}

export function getStylelintConfig(): Partial<StylelintOptions> {
    return readJson('./package.json').cli?.lint?.stylelint ?? {};
}

interface Args {
    fix?: boolean;
}

export class Lint implements Command {
    constructor(private args: Args) {}

    @logErrors
    private async eslint() {
        log.info('Running the eslint...');

        const eslint = new ESLint({
            extensions: ['.ts', '.tsx'],
            baseConfig: {
                ignorePatterns: [
                    'node_modules',
                    '*.css.d.ts',
                    '*.scss.d.ts',
                    '*.less.d.ts',
                    ...getDestinationFolders(),
                ],
            },
            fix: this.args.fix,
            ...getESLintConfig(),
        });

        const results = await eslint.lintFiles([process.cwd()]);

        if (this.args.fix) {
            await ESLint.outputFixes(results);
        }

        const formatter = await eslint.loadFormatter('stylish');

        process.stdout.write(formatter.format(results));

        if (ESLint.getErrorResults(results).length) {
            // eslint-disable-next-line require-atomic-updates
            process.exitCode = 1;
        }
    }

    @logErrors
    private async stylelint() {
        log.info('Running the stylelint...');

        const { output, errored } = await stylelint.lint({
            files: '**/*.{css,scss,less}',
            ignorePattern: ['node_modules', ...getDestinationFolders()],
            formatter: 'string',
            fix: this.args.fix,
            ...getStylelintConfig(),
        } as StylelintOptions);

        process.stdout.write(output);

        if (errored) {
            process.exitCode = 1;
        }
    }

    async execute() {
        await this.eslint();
        await this.stylelint();
    }
}
