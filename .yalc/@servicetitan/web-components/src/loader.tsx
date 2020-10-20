import React from 'react';

import { LOG_SERVICE_TOKEN } from '@servicetitan/log-service';
import { useOptionalDependencies } from '@servicetitan/react-ioc';

import { isCompatible } from './is-compatible';

declare global {
    const EXPOSED_DEPENDENCIES: Record<string, { version: string; variable: string }>;
}

async function getBundleInfo(packageUrl: string) {
    const { dependencies } = await (await fetch(`${packageUrl}/package.json`)).json();
    const metadata = await (await fetch(`${packageUrl}/dist/metadata.json`)).json();

    const mismatch = Object.entries(EXPOSED_DEPENDENCIES).reduce(
        (result, [dependency, { version: hostVersion }]) => {
            const packageVersion = dependencies[dependency];

            if (packageVersion && !isCompatible(hostVersion, packageVersion)) {
                result[dependency] = { host: hostVersion, package: packageVersion };
            }

            return result;
        },
        {} as Record<string, { host: string; package: string }>
    );

    for (const [dependency, variable] of Object.entries(metadata.sharedDependencies)) {
        const packageVersion = dependencies[dependency];

        if (!EXPOSED_DEPENDENCIES[dependency]) {
            mismatch[dependency] = { host: 'missing', package: packageVersion };
        } else if (EXPOSED_DEPENDENCIES[dependency].variable !== variable) {
            mismatch[dependency] = { host: 'wrong global variable', package: packageVersion };
        }
    }

    const hasMismatch = !!Object.keys(mismatch).length;
    return {
        url: `${packageUrl}/dist/bundle/${hasMismatch ? 'full' : 'light'}/index.js`,
        WebComponent: metadata.name,
        mismatch: hasMismatch ? mismatch : undefined,
    };
}

export interface LoaderProps {
    src: string;
    fallback?: NonNullable<React.ReactNode> | null;
}

export const Loader: React.FC<LoaderProps> = ({ src, fallback = <h2>Loading...</h2> }) => {
    const [logService] = useOptionalDependencies(LOG_SERVICE_TOKEN);

    const Loader = React.useMemo(
        () =>
            React.lazy(async () => {
                const { url, WebComponent, mismatch } = await getBundleInfo(src);

                if (mismatch) {
                    logService?.warning(
                        'MicroFrontends.DependenciesMismatch',
                        undefined,
                        'Some of the package dependencies have incompatible versions.',
                        { package: src, dependencies: mismatch }
                    );
                }

                if (Array.from(document.scripts).every(({ src }) => src !== url)) {
                    await new Promise(resolve => {
                        const script = document.createElement('script');

                        script.onload = resolve;
                        script.async = true;
                        script.src = url;

                        document.body.append(script);
                    });
                }

                return { default: () => <WebComponent /> };
            }),
        [src, logService]
    );

    return (
        <React.Suspense fallback={fallback}>
            <Loader />
        </React.Suspense>
    );
};
