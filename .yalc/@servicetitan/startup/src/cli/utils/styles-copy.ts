import cpx from 'cpx';
import util from 'util';

import { log, getFolders, getStyleExtensions } from '.';

export async function stylesCopy() {
    const { source, destination } = getFolders();
    const extensions = getStyleExtensions();

    log.info(`Copying ${extensions.map(e => e.toUpperCase()).join(', ')} files...`);

    await util.promisify(cpx.copy)(
        `${source}/**/*.` + (extensions.length > 1 ? `{${extensions.join()}}` : extensions[0]),
        destination
    );
}

export async function stylesCopyWatch() {
    const { source, destination } = getFolders();
    const extensions = getStyleExtensions();

    await new Promise<void>((_0, reject) => {
        cpx.watch(
            `${source}/**/*.` + (extensions.length > 1 ? `{${extensions.join()}}` : extensions[0]),
            destination,
            { initialCopy: false }
        ).on('watch-error', reject);
    });
}
