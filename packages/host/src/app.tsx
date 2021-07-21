import React from 'react';

import { Frame } from '@servicetitan/design-system';
import { Loader } from '@servicetitan/web-components';

import './app.css';

export const App: React.FC = () => (
    <React.StrictMode>
        <Frame>
            <Loader src="http://localhost:8888" />
        </Frame>
    </React.StrictMode>
);
