import fs from 'fs';

export function readJson<T = any>(path: string): T {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}
