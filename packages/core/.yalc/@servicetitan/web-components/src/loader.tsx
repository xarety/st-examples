import React from 'react';

declare global {
    const EXPOSED_DEPENDENCIES: Record<string, string>;
}

async function getBundleInfo(packageUrl: string) {
    const { dependencies, cli } = await (await fetch(`${packageUrl}/package.json`)).json();

    const isCompatible = Object.entries(EXPOSED_DEPENDENCIES).every(([dependency, version]) => {
        if (!dependencies[dependency]) {
            return true;
        }

        // TODO: use semver comparison
        return dependencies[dependency] === version;
    });

    return {
        url: `${packageUrl}/dist/bundle/${isCompatible ? 'light' : 'full'}/index.js`,
        WebComponent: cli['web-component'],
    };
}

export interface LoaderProps {
    src: string;
}

export const Loader: React.FC<LoaderProps> = ({ src }) => {
    const Loader = React.useMemo(
        () =>
            React.lazy(async () => {
                const { url, WebComponent } = await getBundleInfo(src);

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
        [src]
    );

    return <Loader />;
};
