const { register } = require('@servicetitan/web-components');
const { App } = require('./app');

declare const WEB_COMPONENT_LIGHT: boolean;

if (WEB_COMPONENT_LIGHT) {
    register(App, true);
} else {
    require('./design-system.css');
    register(App, false);
}
