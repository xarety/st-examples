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
            <HashBrowserRouter>
                <Page
                    sidebar={
                        <Sidebar>
                            <Sidebar.Section padding="y">
                                <SideNav title="Runtime">
                                    <SideNavLinkItem pathname={`${basename}/table`} exact>
                                        Table
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname={`${basename}/table-master-detail`}>
                                        Table (Master/Detail)
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname={`${basename}/table-state-caching`}>
                                        Table (State Caching)
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname={`${basename}/confirm`} exact>
                                        Confirm
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname={`${basename}/confirm-navigation`}>
                                        Confirm Navigation
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname={`${basename}/file-uploader`}>
                                        File Uploader
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname={`${basename}/number-input`}>
                                        Number Input
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname={`${basename}/notifications`}>
                                        Notifications
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname={`${basename}/dropdown-state`}>
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
                        <Route path={`${basename}/table`} component={TableExample} />
                        <Route
                            path={`${basename}/table-master-detail`}
                            component={TableMasterDetailExample}
                        />
                        <Route
                            path={`${basename}/table-state-caching`}
                            component={TableStateCachingExample}
                        />
                        <Route path={`${basename}/confirm`} component={ConfirmExample} />
                        <Route
                            path={`${basename}/confirm-navigation`}
                            component={ConfirmNavigationExample}
                        />
                        <Route path={`${basename}/file-uploader`} component={FileUploaderExample} />
                        <Route path={`${basename}/number-input`} component={NumberInputExample} />
                        <Route
                            path={`${basename}/notifications`}
                            component={NotificationsExample}
                        />
                        <Route
                            path={`${basename}/dropdown-state`}
                            component={DropdownStateExample}
                        />
                        <Redirect path={`${basename}/`} to={`${basename}/table`} />
                    </Switch>
                </Page>
            </HashBrowserRouter>
        </React.StrictMode>
    );
};
