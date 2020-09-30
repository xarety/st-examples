const exec = require('@lerna/exec');

import { tsc, tscWatch, logErrors } from '../utils';
import { Command } from '.';

interface Args {
    scope?: string;
    ignore?: string;
    coherently?: boolean;
}

export class Start implements Command {
    constructor(private args: Args) {}

    @logErrors
    async execute() {
        await exec({
            cmd: 'startup prepare-package',
            scope: this.args.scope,
            ignore: this.args.ignore,
            parallel: !this.args.coherently,
            stream: true,
        });

        await tsc();

        await Promise.all([
            exec({
                'cmd': 'startup prepare-package',
                'scope': this.args.scope,
                'ignore': this.args.ignore,
                'parallel': true,
                'stream': true,
                '--': ['--watch'],
            }),
            tscWatch(),
            exec({
                'cmd': 'startup bundle-package',
                'scope': this.args.scope,
                'ignore': this.args.ignore,
                'parallel': true,
                'stream': true,
                '--': ['--watch'],
            }),
        ]);
    }
}
