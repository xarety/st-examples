import { Configuration } from './configuration';

declare global {
    export interface Window {
        configuration: Configuration;
    }
}

window.configuration = new Configuration();

export function configure(options: Partial<Record<keyof Configuration, string>>) {
    for (const [key, value] of Object.entries(options)) {
        window.configuration[key as keyof Configuration] = value;
    }
}
