import React from 'react';
import ReactDOM from 'react-dom';

import retargetEvents from 'react-shadow-dom-retarget-events';

declare global {
    const WEB_COMPONENT_NAME: string;
}

export function register(Component: React.ComponentType, light: boolean) {
    const currentDir = (document.currentScript as HTMLScriptElement).src
        .split('/')
        .slice(0, -1)
        .join('/');

    class WebComponent extends HTMLElement {
        mountPoint = document.createElement('div');

        connectedCallback() {
            const root = this.attachShadow({ mode: 'open' });
            root.innerHTML = `<link href="${currentDir}/index.css" rel="stylesheet">`;

            if (light) {
                const designSystem = Array.from(document.styleSheets).find(
                    ({ href }) => href && /design-system.+\.bundle.css/.test(href)
                );

                if (designSystem) {
                    root.innerHTML += `<link href="${designSystem.href}" rel="stylesheet">`;
                }
            }

            root.appendChild(this.mountPoint);

            ReactDOM.render(<Component />, this.mountPoint);

            retargetEvents(root);
        }

        disconnectedCallback() {
            ReactDOM.unmountComponentAtNode(this.mountPoint);
        }
    }

    customElements.define(WEB_COMPONENT_NAME, WebComponent);
}
