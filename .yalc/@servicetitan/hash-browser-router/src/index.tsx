import {
    BrowserHistoryBuildOptions,
    History,
    Location,
    LocationListener,
    createBrowserHistory,
} from 'history';
import React from 'react';
import { BrowserRouterProps, Router } from 'react-router-dom';

function useHistory(options: BrowserHistoryBuildOptions) {
    return React.useRef(createHashBrowserHistory(options)).current;
}

export const HashBrowserRouter: React.FC<BrowserRouterProps> = props => {
    const history = useHistory(props);
    const { children } = props;

    return <Router history={history}>{children}</Router>;
};

function createHashBrowserHistory(props: BrowserHistoryBuildOptions): History {
    const parent = createBrowserHistory(props);

    const history: Partial<History> = {
        createHref: location => '/#' + parent.createHref(location),

        push: (path: History.LocationDescriptor, state?: History.LocationState) => {
            if (typeof path === 'string') {
                parent.push('/#' + path, state);
            } else {
                parent.push({
                    ...path,
                    pathname: '/',
                    hash: path.pathname,
                });
            }

            triggerSammyLocationChange();
        },

        replace: (path: History.LocationDescriptor, state?: History.LocationState) => {
            if (typeof path === 'string') {
                parent.replace('/#' + path, state);
            } else {
                parent.replace({
                    ...path,
                    pathname: '/',
                    hash: path.pathname,
                });
            }

            triggerSammyLocationChange();
        },

        block: prompt => {
            if (typeof prompt === 'function') {
                return parent.block((origLocation, action) => {
                    const location = convertLocationToHashRouterView(origLocation);
                    return prompt(location, action);
                });
            }

            return parent.block(prompt);
        },

        listen: (listener: LocationListener) => {
            const enchantedListener: LocationListener = (location, action) => {
                listener(convertLocationToHashRouterView(location), action);
            };

            return parent.listen(enchantedListener);
        },

        get location() {
            return convertLocationToHashRouterView(parent.location);
        },
        set location(l) {
            parent.location = l;
        },
    };

    return Object.setPrototypeOf(history, parent);
}

function convertLocationToHashRouterView(l: Location): Location {
    let search = '';
    let pathname = l.hash ? l.hash.substring(1) : '/';
    const index = pathname.indexOf('?');
    if (index !== -1) {
        search = pathname.substr(index);
        pathname = pathname.substr(0, index);
    }
    return {
        ...l,
        search,
        pathname,
        hash: '',
    };
}

function triggerSammyLocationChange() {
    /*
     * We have to skip ahead `componentWillUnmount` to avoid «race condition»
     * e.g. in the SettingsLayout component "window.app.swap" could be fired after
     * the new Sammy route load and it would hide that page.
     */
    setTimeout(() => {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
}
