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
    '@servicetitan/design-system': 'ServiceTitan.DesignSystem',
    'classnames': 'ClassNames',
    'formstate': 'FormState',
    'mobx': 'MobX',
    'mobx-react': 'MobXReact',
    'mobx-utils': 'MobXUtils',
    'react': 'React',
    'react-dom': 'ReactDOM',
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
