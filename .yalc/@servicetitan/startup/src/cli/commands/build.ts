const exec = require('@lerna/exec');

import { tsc, logErrors } from '../utils';
import { Command } from '.';

interface Args {
    'scope'?: string;
    'ignore'?: string;
    'coherently'?: boolean;
    'cdn-path'?: string;
}

export class Build implements Command {
    constructor(private args: Args) {}

    @logErrors
    async execute() {
        if (this.args['cdn-path']) {
            process.env.CLIENT_CDN_PATH = this.args['cdn-path'];
        }

        await exec({
            cmd: 'startup prepare-package',
            scope: this.args.scope,
            ignore: this.args.ignore,
            parallel: !this.args.coherently,
            stream: true,
        });

        await tsc();

        await exec({
            cmd: 'startup bundle-package',
            scope: this.args.scope,
            ignore: this.args.ignore,
            parallel: !this.args.coherently,
            stream: true,
        });
    }
}
