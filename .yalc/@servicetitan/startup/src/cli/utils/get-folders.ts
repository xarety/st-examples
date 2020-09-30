import { readJson } from '.';

export function getFolders() {
    const { rootDir, outDir } = readJson('./tsconfig.json').compilerOptions ?? {};
    const configuration = readJson('./package.json').cli;

    if (!outDir) {
        throw '"compilerOptions.outDir" must be defined in the "tsconfig.json"!';
    }

    return {
        // TODO: use only rootDir
        source: configuration?.source ?? rootDir ?? 'src',
        destination: outDir,
    };
}
