import { isBundle, bundle, bundleWatch, logErrors } from '../utils';
import { Command } from '.';

interface Args {
    watch?: boolean;
}

export class BundlePackage implements Command {
    constructor(private args: Args) {}

    @logErrors
    async execute() {
        if (!isBundle()) {
            return;
        }

        if (!this.args.watch) {
            await bundle();
        } else {
            await bundleWatch();
        }
    }
}
