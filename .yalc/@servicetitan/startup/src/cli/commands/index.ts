export * from './build';
export * from './bundle-package';
export * from './init';
export * from './lint';
export * from './prepare-package';
export * from './start';
export * from './tests';

export interface Command {
    execute(): Promise<void>;
}
