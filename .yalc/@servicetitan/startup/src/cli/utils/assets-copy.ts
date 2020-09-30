import cpx from 'cpx';
import util from 'util';

import { log, getFolders } from '.';

const extensions = ['jpg', 'png', 'gif', 'svg', 'eot', 'otf', 'ttf', 'woff', 'woff2'];

export async function assetsCopy() {
    const { source, destination } = getFolders();

    log.info('Copying asset files...');

    await util.promisify(cpx.copy)(`${source}/**/*.{${extensions.join()}}`, destination);
}

export async function assetsCopyWatch() {
    const { source, destination } = getFolders();

    await new Promise<void>((_0, reject) => {
        cpx.watch(`${source}/**/*.{${extensions.join()}}`, destination, { initialCopy: false }).on(
            'watch-error',
            reject
        );
    });
}
