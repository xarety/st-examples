jest.mock('../get-folders');
jest.mock('../get-style-extensions');

import fs from 'fs';
import mock from 'mock-fs';
import { mocked } from 'ts-jest/utils';

import { getFolders, isSass, isLess, getStyleExtensions, tcm } from '..';

describe('[Startup] utils:tcm', () => {
    beforeAll(() => {
        mocked(getFolders).mockReturnValue({ source: 'src', destination: 'dist' });
        mocked(getStyleExtensions).mockImplementation(() => {
            const result = ['css'];

            if (isSass()) {
                result.push('scss');
            }

            if (isLess()) {
                result.push('less');
            }

            return result;
        });
    });

    afterAll(() => {
        mock.restore();
    });

    beforeEach(() => {
        mocked(isSass).mockReturnValue(false)();
        mocked(isLess).mockReturnValue(false)();
    });

    test('tcm generates types only for enabled style types', async () => {
        const initFolder = () => {
            mock({
                src: {
                    'styles.module.css': '.a { display: none; }',
                    'styles.module.scss': '.a { display: none; }',
                    'styles.module.less': '.a { display: none; }',
                },
            });
        };

        initFolder();

        await tcm();

        expect(fs.readFileSync('./src/styles.module.css.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.existsSync('./src/styles.module.scss.d.ts')).toBeFalsy();
        expect(fs.existsSync('./src/styles.module.less.d.ts')).toBeFalsy();

        mocked(isSass).mockReturnValue(true)();
        mocked(isLess).mockReturnValue(false)();

        initFolder();

        await tcm();

        expect(fs.readFileSync('./src/styles.module.css.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.existsSync('./src/styles.module.less.d.ts')).toBeFalsy();

        mocked(isSass).mockReturnValue(false)();
        mocked(isLess).mockReturnValue(true)();

        initFolder();

        await tcm();

        expect(fs.readFileSync('./src/styles.module.css.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.existsSync('./src/styles.module.scss.d.ts')).toBeFalsy();
        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );

        mocked(isSass).mockReturnValue(true)();
        mocked(isLess).mockReturnValue(true)();

        initFolder();

        await tcm();

        expect(fs.readFileSync('./src/styles.module.css.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
    });

    test('tcm ignores global selector for css modules', async () => {
        mock({
            src: {
                'styles.module.css': `
                    .a :global(.b) .c {
                        display: none;
                    }
                `,
            },
        });

        await tcm();

        expect(fs.readFileSync('./src/styles.module.css.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.css.d.ts', 'utf8')).not.toContain(
            'readonly "b": string;'
        );
        expect(fs.readFileSync('./src/styles.module.css.d.ts', 'utf8')).toContain(
            'readonly "c": string;'
        );
    });

    test('tcm ignores global selector for sass modules', async () => {
        mocked(isSass).mockReturnValue(true)();

        mock({
            src: {
                'styles.module.scss': `
                    .a :global(.b) .c {
                        display: none;
                    }
                `,
            },
        });

        await tcm();

        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).not.toContain(
            'readonly "b": string;'
        );
        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "c": string;'
        );
    });

    test('tcm ignores global selector for less modules', async () => {
        mocked(isLess).mockReturnValue(true)();

        mock({
            src: {
                'styles.module.less': `
                    .a :global(.b) .c {
                        display: none;
                    }
                `,
            },
        });

        await tcm();

        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).not.toContain(
            'readonly "b": string;'
        );
        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "c": string;'
        );
    });

    test('tcm handles nested selectors for sass modules', async () => {
        mocked(isSass).mockReturnValue(true)();

        mock({
            src: {
                'styles.module.scss': `
                    .a :global(.b) {
                        .c {
                            display: none;
                        }
                    }
                `,
            },
        });

        await tcm();

        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).not.toContain(
            'readonly "b": string;'
        );
        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "c": string;'
        );
    });

    test('tcm handles nested selectors for less. modules', async () => {
        mocked(isLess).mockReturnValue(true)();

        mock({
            src: {
                'styles.module.less': `
                    .a :global(.b) {
                        .c {
                            display: none;
                        }
                    }
                `,
            },
        });

        await tcm();

        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).not.toContain(
            'readonly "b": string;'
        );
        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "c": string;'
        );
    });

    xtest('tcm handles imports for sass modules', async () => {
        mocked(isSass).mockReturnValue(true)();

        mock({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            node_modules: {
                package: {
                    'shared.scss': `
                        .a {
                            display: none;
                        }
                    `,
                },
            },
            src: {
                'styles.scss': `
                    .b {
                        display: none;
                    }
                `,
                'styles.module.scss': `
                    @import '~package/shared.scss';
                    @import './styles.scss';

                    .c {
                        display: none;
                    }
                `,
            },
        });

        await tcm();

        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "b": string;'
        );
        expect(fs.readFileSync('./src/styles.module.scss.d.ts', 'utf8')).toContain(
            'readonly "c": string;'
        );
    });

    test('tcm handles imports for less modules', async () => {
        mocked(isLess).mockReturnValue(true)();

        mock({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            node_modules: {
                package: {
                    'shared.less': `
                        .a {
                            display: none;
                        }
                    `,
                },
            },
            src: {
                'styles.less': `
                    .b {
                        display: none;
                    }
                `,
                'styles.module.less': `
                    @import '~package/shared.less';
                    @import './styles.less';

                    .c {
                        display: none;
                    }
                `,
            },
        });

        await tcm();

        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "a": string;'
        );
        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "b": string;'
        );
        expect(fs.readFileSync('./src/styles.module.less.d.ts', 'utf8')).toContain(
            'readonly "c": string;'
        );
    });
});
