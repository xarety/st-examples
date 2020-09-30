import { register } from '@sandboxes/web-components';
import { App } from './app';

declare global {
    const WEB_COMPONENT_LIGHT: boolean;
}

if (WEB_COMPONENT_LIGHT) {
    register(App, true);
} else {
    require('./design-system.css');
    register(App, false);
}
