import { Configuration } from 'webpack';

import {
    Overrides as DevelopmentOverrides,
    createConfig as createDevelopmentConfig,
} from './development.config';

import {
    Overrides as ProductionOverrides,
    createConfig as createProductionConfig,
} from './production.config';

export type Overrides = DevelopmentOverrides | ProductionOverrides;

export enum WebComponent {
    Full = 'full',
    Light = 'light',
}

export const sharedDependencies = {
    '@servicetitan/design-system': 'SharedDependencies.ServiceTitan.DesignSystem',
    'classnames': 'SharedDependencies.ClassNames',
    'formstate': 'SharedDependencies.FormState',
    'mobx': 'SharedDependencies.MobX',
    'mobx-react': 'SharedDependencies.MobXReact',
    'mobx-utils': 'SharedDependencies.MobXUtils',
    'react': 'SharedDependencies.React',
    'react-dom': 'SharedDependencies.ReactDOM',
};

export interface Options {
    customStyleRules?: boolean;
    exposeSharedDependencies?: boolean;
    webComponent?: WebComponent;
}

function isProduction(overrides: Overrides): overrides is ProductionOverrides {
    return overrides.configuration.mode === 'production';
}

export function createWebpackConfig(overrides: Overrides, options?: Options): Configuration {
    return isProduction(overrides)
        ? createProductionConfig(overrides, options)
        : createDevelopmentConfig(overrides, options);
}
