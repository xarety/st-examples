import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { HashBrowserRouter } from '@servicetitan/hash-browser-router';

import { SideNav, Sidebar } from '@servicetitan/design-system';
import { SideNavLinkItem } from '@servicetitan/link-item';

import { useOptionalDependencies } from '@servicetitan/react-ioc';
import { BASENAME_TOKEN } from '@servicetitan/web-components';
import { lazyModule } from '@servicetitan/lazy-module';

import { Page } from './page';

const TableExample = lazyModule({
    loader: async () => {
        const { TableExample } = await import(
            /* webpackChunkName: "table" */ '@servicetitan/table/dist/demo'
        );

        return TableExample;
    },
    name: 'TableExample',
});

const TableMasterDetailExample = lazyModule({
    loader: async () => {
        const { TableMasterDetailExample } = await import(
            /* webpackChunkName: "table" */ '@servicetitan/table/dist/demo'
        );

        return TableMasterDetailExample;
    },
    name: 'TableMasterDetailExample',
});

const TableStateCachingExample = lazyModule({
    loader: async () => {
        const { TableStateCachingExample } = await import(
            /* webpackChunkName: "table" */ '@servicetitan/table/dist/demo'
        );

        return TableStateCachingExample;
    },
    name: 'TableStateCachingExample',
});

const ConfirmExample = lazyModule({
    loader: async () => {
        const { ConfirmExample } = await import(
            /* webpackChunkName: "confirm" */ './examples/confirm'
        );

        return ConfirmExample;
    },
    name: 'ConfirmExample',
});

const ConfirmNavigationExample = lazyModule({
    loader: async () => {
        const { BasicExample } = await import(
            /* webpackChunkName: "confirm-navigation" */ '@servicetitan/confirm-navigation/dist/demo'
        );

        return BasicExample;
    },
    name: 'ConfirmNavigationExample',
});

const FileUploaderExample = lazyModule({
    loader: async () => {
        const { FileUploaderExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return FileUploaderExample;
    },
    name: 'FileUploaderExample',
});

const NumberInputExample = lazyModule({
    loader: async () => {
        const { NumberInputExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return NumberInputExample;
    },
    name: 'NumberInputExample',
});

const NotificationsExample = lazyModule({
    loader: async () => {
        const { NotificationsExample } = await import(
            /* webpackChunkName: "notifications" */ './examples/notifications'
        );

        return NotificationsExample;
    },
    name: 'NotificationsExample',
});

const DropdownStateExample = lazyModule({
    loader: async () => {
        const { DropdownStateExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return DropdownStateExample;
    },
    name: 'DropdownStateExample',
});

export const App: React.FC = () => {
    const [basename = ''] = useOptionalDependencies(BASENAME_TOKEN);

    return (
        <React.StrictMode>
            <HashBrowserRouter basename={basename}>
                <Page
                    sidebar={
                        <Sidebar localStorageKey="servicetitan-examples__navigation">
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
