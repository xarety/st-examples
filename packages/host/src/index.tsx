import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';

import { App } from './app';

configure({ enforceActions: 'observed' });

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);

ReactDOM.render(<App />, appContainer);
