import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SideNav, Frame, Page, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import './app.css';

export const App: React.FC = () => (
    <React.StrictMode>
        <BrowserRouter>
            <Frame>
                <Page
                    sidebar={
                        <Sidebar>
                            <Sidebar.Section padding="y">
                                <SideNav title="Application">
                                    <SideNavLinkItem pathname="/" exact>
                                        Main page
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/second-page">
                                        Second page
                                    </SideNavLinkItem>
                                </SideNav>
                            </Sidebar.Section>
                        </Sidebar>
                    }
                    maxWidth="wide"
                >
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={() => <React.Fragment>Main page</React.Fragment>}
                        />
                        <Route
                            path="/second-page"
                            component={() => <React.Fragment>Second page</React.Fragment>}
                        />
                    </Switch>
                </Page>
            </Frame>
        </BrowserRouter>
    </React.StrictMode>
);
