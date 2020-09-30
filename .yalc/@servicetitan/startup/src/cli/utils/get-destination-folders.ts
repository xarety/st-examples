import fs from 'fs';
import path from 'path';
import execa from 'execa';

interface Package {
    name: string;
    version: string;
    private: boolean;
    location: string;
}

export function getDestinationFolders() {
    const packages: Package[] = JSON.parse(execa.sync('lerna', ['la', '--json']).stdout);

    return packages
        .map(({ location }) => {
            const tsConfigPath = path.join(location, 'tsconfig.json');

            if (!fs.existsSync(tsConfigPath)) {
                return '';
            }

            const { outDir } = require(tsConfigPath).compilerOptions ?? {};

            if (!outDir) {
                return '';
            }

            return path
                .join('/', path.relative(process.cwd(), location), outDir, '/')
                .replace(/\\/g, '/');
        })
        .filter(path => !!path);
}
