import fs from 'fs';
import cpx from 'cpx';
import util from 'util';
import path from 'path';

import { logErrors } from '../utils';
import { Command } from '.';

export class Init implements Command {
    @logErrors
    async execute() {
        await util.promisify(cpx.copy)(
            path.resolve(__dirname, '../../../template/**/{.*,*}'),
            process.cwd()
        );

        if (fs.existsSync(path.join(process.cwd(), '.npmignore'))) {
            fs.renameSync(
                path.join(process.cwd(), '.npmignore'),
                path.join(process.cwd(), '.gitignore')
            );
        }
    }
}
