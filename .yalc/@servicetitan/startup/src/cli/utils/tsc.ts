import execa from 'execa';

import { log } from '.';

export async function tsc() {
    log.info('Building TypeScript files...');

    await execa('tsc', ['-b'], { stdio: 'inherit' });
}

export async function tscWatch() {
    await execa('tsc', ['-b', '-w', '--preserveWatchOutput'], { stdio: 'inherit' });
}
