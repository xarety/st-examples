jest.mock('../get-folders');

import fs from 'fs';
import mock from 'mock-fs';
import { mocked } from 'ts-jest/utils';

import { getFolders, assetsCopy } from '..';

describe('[Startup] utils:assets-copy', () => {
    beforeAll(() => {
        mocked(getFolders).mockReturnValue({ source: 'src', destination: 'dist' });
    });

    afterAll(() => {
        mock.restore();
    });

    test('assetsCopy saves structure', async () => {
        mock({
            src: {
                '1.jpg': '1.jpg',
                'a': {
                    '2.jpg': '2.jpg',
                },
                'b': {
                    c: {
                        '3.jpg': '3.jpg',
                        '4.jpg': '4.jpg',
                        '5.jpg': '5.jpg',
                    },
                },
            },
        });

        await assetsCopy();

        expect(fs.readFileSync('./dist/1.jpg', 'utf8')).toEqual('1.jpg');
        expect(fs.readFileSync('./dist/a/2.jpg', 'utf8')).toEqual('2.jpg');
        expect(fs.readFileSync('./dist/b/c/3.jpg', 'utf8')).toEqual('3.jpg');
        expect(fs.readFileSync('./dist/b/c/4.jpg', 'utf8')).toEqual('4.jpg');
        expect(fs.readFileSync('./dist/b/c/5.jpg', 'utf8')).toEqual('5.jpg');
    });

    test('assetsCopy copies only allowed files', async () => {
        mock({
            src: {
                '1.jpg': '1.jpg',
                '2.tsx': '2.tsx',
                '3.png': '3.png',
            },
        });

        await assetsCopy();

        expect(fs.existsSync('./dist/1.jpg')).toBeTruthy();
        expect(fs.existsSync('./dist/2.tsx')).toBeFalsy();
        expect(fs.existsSync('./dist/3.png')).toBeTruthy();
    });
});
