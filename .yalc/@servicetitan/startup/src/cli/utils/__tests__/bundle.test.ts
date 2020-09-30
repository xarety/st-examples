import mock from 'mock-fs';

import { isBundle } from '..';

describe('[Startup] utils:bundle', () => {
    afterAll(() => {
        mock.restore();
    });

    beforeEach(() => {
        mock({
            'package.json': JSON.stringify({}),
        });
    });

    test('isBundle returns true if not explicitly disabled', () => {
        expect(isBundle()).toBeTruthy();

        mock({
            'package.json': JSON.stringify({ cli: { webpack: true } }),
        });

        expect(isBundle()).toBeTruthy();

        mock({
            'package.json': JSON.stringify({ cli: { webpack: false } }),
        });

        expect(isBundle()).toBeFalsy();
    });
});
