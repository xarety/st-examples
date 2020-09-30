import { readJson } from '.';

export function isSass() {
    return readJson('./package.json').cli?.sass === true;
}

export function isLess() {
    return readJson('./package.json').cli?.less === true;
}

export function getStyleExtensions() {
    const result = ['css'];

    if (isSass()) {
        result.push('scss');
    }

    if (isLess()) {
        result.push('less');
    }

    return result;
}
