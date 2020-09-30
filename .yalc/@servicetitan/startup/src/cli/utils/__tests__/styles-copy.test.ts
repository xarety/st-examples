jest.mock('../get-folders');
jest.mock('../get-style-extensions');

import fs from 'fs';
import mock from 'mock-fs';
import { mocked } from 'ts-jest/utils';

import { getFolders, getStyleExtensions, stylesCopy } from '..';

describe('[Startup] utils:styles-copy', () => {
    beforeAll(() => {
        mocked(getFolders).mockReturnValue({ source: 'src', destination: 'dist' });
    });

    afterAll(() => {
        mock.restore();
    });

    beforeEach(() => {
        mocked(getStyleExtensions).mockReturnValue(['css'])();
    });

    test('stylesCopy saves structure', async () => {
        mock({
            src: {
                '1.css': '1.css',
                'a': { '2.css': '2.css' },
                'b': { c: { '3.css': '3.css' } },
            },
        });

        await stylesCopy();

        expect(fs.existsSync('./dist/1.css')).toBeTruthy();
        expect(fs.existsSync('./dist/a/2.css')).toBeTruthy();
        expect(fs.existsSync('./dist/b/c/3.css')).toBeTruthy();
    });

    test('stylesCopy copies only enabled style files', async () => {
        const initFolder = () => {
            mock({
                src: { '1.css': '1.css', '2.scss': '2.scss', '3.less': '3.less' },
            });
        };

        initFolder();

        await stylesCopy();

        expect(fs.existsSync('./dist/1.css')).toBeTruthy();
        expect(fs.existsSync('./dist/2.scss')).toBeFalsy();
        expect(fs.existsSync('./dist/3.less')).toBeFalsy();

        mocked(getStyleExtensions).mockReturnValue(['css', 'scss'])();

        initFolder();

        await stylesCopy();

        expect(fs.existsSync('./dist/1.css')).toBeTruthy();
        expect(fs.existsSync('./dist/2.scss')).toBeTruthy();
        expect(fs.existsSync('./dist/3.less')).toBeFalsy();

        mocked(getStyleExtensions).mockReturnValue(['css', 'less'])();

        initFolder();

        await stylesCopy();

        expect(fs.existsSync('./dist/1.css')).toBeTruthy();
        expect(fs.existsSync('./dist/2.scss')).toBeFalsy();
        expect(fs.existsSync('./dist/3.less')).toBeTruthy();

        mocked(getStyleExtensions).mockReturnValue(['css', 'scss', 'less'])();

        initFolder();

        await stylesCopy();

        expect(fs.existsSync('./dist/1.css')).toBeTruthy();
        expect(fs.existsSync('./dist/2.scss')).toBeTruthy();
        expect(fs.existsSync('./dist/3.less')).toBeTruthy();
    });
});
