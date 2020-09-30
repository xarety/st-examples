import {
    assetsCopy,
    assetsCopyWatch,
    stylesCopy,
    stylesCopyWatch,
    tcm,
    tcmWatch,
    logErrors,
} from '../utils';
import { Command } from '.';

interface Args {
    watch?: boolean;
}

export class PreparePackage implements Command {
    constructor(private args: Args) {}

    @logErrors
    async execute() {
        if (!this.args.watch) {
            await Promise.all([assetsCopy(), stylesCopy(), tcm()]);
        } else {
            await Promise.all([assetsCopyWatch(), stylesCopyWatch(), tcmWatch()]);
        }
    }
}
