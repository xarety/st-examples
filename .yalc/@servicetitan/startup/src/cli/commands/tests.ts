import { Config } from '@jest/types';
import { runCLI } from '@jest/core';

import { logErrors, readJson, getDestinationFolders } from '../utils';
import { Command } from '.';

/**
 * Named as tests to exclude it from the Jest pattern
 */
export class Tests implements Command {
    constructor(private args: Config.Argv) {}

    @logErrors
    async execute() {
        const { testPathIgnorePatterns = [], ...config } = {
            ...readJson('./package.json').cli?.test,
            ...this.args,
        };

        const {
            results: { success },
        } = await runCLI(
            {
                verbose: true,
                preset: 'ts-jest',
                testRunner: 'jest-circus/runner',
                moduleNameMapper: JSON.stringify({
                    '\\.(css|scss|less|svg)$': 'identity-obj-proxy',
                }),
                modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
                globals: JSON.stringify({
                    'ts-jest': {
                        tsConfig: './tsconfig.test.json',
                    },
                }),
                testPathIgnorePatterns: [...getDestinationFolders(), ...testPathIgnorePatterns],
                ...config,
            },
            [process.cwd()]
        );

        if (!success) {
            // eslint-disable-next-line require-atomic-updates
            process.exitCode = 1;
        }
    }
}
