import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { HashBrowserRouter } from '@servicetitan/hash-browser-router';

import { SideNav, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import { useOptionalDependencies } from '@servicetitan/react-ioc';
import { BASENAME_TOKEN } from '@servicetitan/web-components';

import {
    TableExample,
    TableMasterDetailExample,
    TableStateCachingExample,
} from '@servicetitan/table/dist/demo';
import {
    FileUploaderExample,
    NumberInputExample,
    DropdownStateExample,
} from '@servicetitan/form/dist/demo';
import { BasicExample as ConfirmNavigationExample } from '@servicetitan/confirm-navigation/dist/demo';

import { Page } from './page';
import { ConfirmExample } from './examples/confirm';
import { NotificationsExample } from './examples/notifications';

export const App: React.FC = () => {
    const [basename = ''] = useOptionalDependencies(BASENAME_TOKEN);

    return (
        <React.StrictMode>
            <HashBrowserRouter basename={basename}>
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
                                    <SideNavLinkItem pathname="/dropdown-state">
                                        Dropdown State
                                    </SideNavLinkItem>
                                </SideNav>
                            </Sidebar.Section>
                        </Sidebar>
                    }
                    spacing="relaxed"
                    fullHeight
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
                        <Route path="/dropdown-state" component={DropdownStateExample} />
                        <Redirect path="/" to="/table" />
                    </Switch>
                </Page>
            </HashBrowserRouter>
        </React.StrictMode>
    );
};
