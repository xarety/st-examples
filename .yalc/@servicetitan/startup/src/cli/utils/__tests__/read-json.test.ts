import mock from 'mock-fs';

import { readJson } from '..';

describe('[Startup] utils:read-json', () => {
    afterAll(() => {
        mock.restore();
    });

    test('readJson works with the current directory', () => {
        mock({
            'file.json': JSON.stringify({
                a: true,
                b: 'string',
                c: {
                    d: 7,
                },
            }),
        });

        expect(readJson('file.json')).toEqual({
            a: true,
            b: 'string',
            c: {
                d: 7,
            },
        });
    });

    test('readJson works with the nested directory', () => {
        mock({
            path: {
                to: {
                    folder: {
                        'file.json': JSON.stringify({
                            a: true,
                            b: 'string',
                            c: {
                                d: 7,
                            },
                        }),
                    },
                },
            },
        });

        expect(readJson('./path/to/folder/file.json')).toEqual({
            a: true,
            b: 'string',
            c: {
                d: 7,
            },
        });
    });
});
