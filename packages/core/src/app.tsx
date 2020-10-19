import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { HashBrowserRouter } from '@servicetitan/hash-browser-router';

import { SideNav, Frame, Page, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import {
    TableExample,
    TableMasterDetailExample,
    TableStateCachingExample,
} from '@servicetitan/table/dist/demo';
import { FileUploaderExample, NumberInputExample } from '@servicetitan/form/dist/demo';
import { ConfirmExample } from './examples/confirm';
import { BasicExample as ConfirmNavigationExample } from '@servicetitan/confirm-navigation/dist/demo';
import { NotificationsExample } from './examples/notifications';

import './app.css';

export const App: React.FC = () => (
    <React.StrictMode>
        <HashBrowserRouter>
            <Frame>
                <Page
                    sidebar={
                        <Sidebar>
                            <Sidebar.Section padding="y">
                                <SideNav title="Runtime">
                                    <SideNavLinkItem pathname="/new/examples/table" exact>
                                        Table
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/new/examples/table-master-detail">
                                        Table (Master/Detail)
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/new/examples/table-state-caching">
                                        Table (State Caching)
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/new/examples/confirm" exact>
                                        Confirm
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/new/examples/confirm-navigation">
                                        Confirm Navigation
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/new/examples/file-uploader">
                                        File Uploader
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/new/examples/number-input">
                                        Number Input
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/new/examples/notifications">
                                        Notifications
                                    </SideNavLinkItem>
                                </SideNav>
                            </Sidebar.Section>
                        </Sidebar>
                    }
                    maxWidth="wide"
                >
                    <Switch>
                        <Route path="/new/examples/table" component={TableExample} />
                        <Route
                            path="/new/examples/table-master-detail"
                            component={TableMasterDetailExample}
                        />
                        <Route
                            path="/new/examples/table-state-caching"
                            component={TableStateCachingExample}
                        />
                        <Route path="/new/examples/confirm" component={ConfirmExample} />
                        <Route
                            path="/new/examples/confirm-navigation"
                            component={ConfirmNavigationExample}
                        />
                        <Route path="/new/examples/file-uploader" component={FileUploaderExample} />
                        <Route path="/new/examples/number-input" component={NumberInputExample} />
                        <Route
                            path="/new/examples/notifications"
                            component={NotificationsExample}
                        />
                        <Redirect path="/new/examples/" to="/new/examples/table" />
                    </Switch>
                </Page>
            </Frame>
        </HashBrowserRouter>
    </React.StrictMode>
);
