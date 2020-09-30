import mock from 'mock-fs';

import { getFolders } from '..';

describe('[Startup] utils:get-folders', () => {
    afterAll(() => {
        mock.restore();
    });

    test('getFolders throws an exception if "compilerOptions.outDir" isn\'t defined', () => {
        mock({
            'package.json': JSON.stringify({}),
            'tsconfig.json': JSON.stringify({}),
        });

        let error;

        try {
            getFolders();
        } catch (e) {
            error = e;
        }

        expect(error).toBe('"compilerOptions.outDir" must be defined in the "tsconfig.json"!');
    });

    test('"compilerOptions.outDir" used as the destination', () => {
        mock({
            'package.json': JSON.stringify({}),
            'tsconfig.json': JSON.stringify({ compilerOptions: { outDir: 'path' } }),
        });

        expect(getFolders().destination).toBe('path');
    });

    test('"src" is the default source', () => {
        mock({
            'package.json': JSON.stringify({}),
            'tsconfig.json': JSON.stringify({ compilerOptions: { outDir: 'dist' } }),
        });

        expect(getFolders().source).toBe('src');
    });

    test('"compilerOptions.rootDir" used as the source', () => {
        mock({
            'package.json': JSON.stringify({}),
            'tsconfig.json': JSON.stringify({
                compilerOptions: { outDir: 'dist', rootDir: 'path' },
            }),
        });

        expect(getFolders().source).toBe('path');
    });

    test('source from "package.json" has the highest priority', () => {
        mock({
            'package.json': JSON.stringify({ cli: { source: 'path' } }),
            'tsconfig.json': JSON.stringify({
                compilerOptions: { outDir: 'dist', rootDir: 'src' },
            }),
        });

        expect(getFolders().source).toBe('path');
    });
});
