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
        <HashBrowserRouter basename="/new/examples">
            <Frame>
                <Page
                    sidebar={
                        <Sidebar>
                            <Sidebar.Section padding="y">
                                <SideNav title="Runtime">
                                    <SideNavLinkItem pathname="/table" exact>
                                        Table
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/table-master-detail">
                                        Table (Master/Detail)
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/table-state-caching">
                                        Table (State Caching)
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/confirm" exact>
                                        Confirm
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/confirm-navigation">
                                        Confirm Navigation
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/file-uploader">
                                        File Uploader
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/number-input">
                                        Number Input
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/notifications">
                                        Notifications
                                    </SideNavLinkItem>
                                </SideNav>
                            </Sidebar.Section>
                        </Sidebar>
                    }
                    maxWidth="wide"
                >
                    <Switch>
                        <Route path="/table" component={TableExample} />
                        <Route path="/table-master-detail" component={TableMasterDetailExample} />
                        <Route path="/table-state-caching" component={TableStateCachingExample} />
                        <Route path="/confirm" component={ConfirmExample} />
                        <Route path="/confirm-navigation" component={ConfirmNavigationExample} />
                        <Route path="/file-uploader" component={FileUploaderExample} />
                        <Route path="/number-input" component={NumberInputExample} />
                        <Route path="/notifications" component={NotificationsExample} />
                        <Redirect path="/" to="/table" />
                    </Switch>
                </Page>
            </Frame>
        </HashBrowserRouter>
    </React.StrictMode>
);
