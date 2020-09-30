#!/usr/bin/env node

import { argv } from 'yargs';
import {
    Command,
    Init,
    PreparePackage,
    Start,
    Build,
    BundlePackage,
    Lint,
    Tests,
} from './commands';
import { log } from './utils';

interface Newable<T> {
    new (...args: any[]): T;
}

function getCommand(name: string): Newable<Command> {
    switch (name) {
        case 'init':
            return Init;

        case 'prepare-package':
            return PreparePackage;

        case 'start':
            return Start;

        case 'build':
            return Build;

        case 'bundle-package':
            return BundlePackage;

        case 'lint':
            return Lint;

        case 'test':
            return Tests;

        default:
            log.error(`${name}: command not found!`);
            process.exit(127);
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
new (getCommand(argv._[0]))({ ...argv, _: argv._.slice(1) }).execute().catch(() => {
    process.exit(1);
});
