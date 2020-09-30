import mock from 'mock-fs';

import { isSass, isLess, getStyleExtensions } from '..';

describe('[Startup] utils:get-style-extensions', () => {
    afterAll(() => {
        mock.restore();
    });

    beforeEach(() => {
        mock({
            'package.json': JSON.stringify({}),
        });
    });

    test('isSass returns true if explicitly enabled', () => {
        expect(isSass()).toBeFalsy();

        mock({
            'package.json': JSON.stringify({ cli: { sass: true } }),
        });

        expect(isSass()).toBeTruthy();

        mock({
            'package.json': JSON.stringify({ cli: { sass: false } }),
        });

        expect(isSass()).toBeFalsy();
    });

    test('isLess returns true if explicitly enabled', () => {
        expect(isLess()).toBeFalsy();

        mock({
            'package.json': JSON.stringify({ cli: { less: true } }),
        });

        expect(isLess()).toBeTruthy();

        mock({
            'package.json': JSON.stringify({ cli: { less: false } }),
        });

        expect(isLess()).toBeFalsy();
    });

    test('getStyleExtensions should return only enabled extra extensions', () => {
        expect(getStyleExtensions()).toEqual(['css']);

        mock({
            'package.json': JSON.stringify({ cli: { sass: true } }),
        });

        expect(getStyleExtensions().sort()).toEqual(['css', 'scss'].sort());

        mock({
            'package.json': JSON.stringify({ cli: { less: true } }),
        });

        expect(getStyleExtensions().sort()).toEqual(['css', 'less'].sort());

        mock({
            'package.json': JSON.stringify({ cli: { sass: true, less: true } }),
        });

        expect(getStyleExtensions().sort()).toEqual(['css', 'scss', 'less'].sort());
    });
});
