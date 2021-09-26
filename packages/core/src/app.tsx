import { FC, StrictMode, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { Sidebar, SideNav } from '@servicetitan/design-system';

import { HashBrowserRouter } from '@servicetitan/hash-browser-router';
import { useOptionalDependencies } from '@servicetitan/react-ioc';
import { BASENAME_TOKEN, EventBus } from '@servicetitan/web-components';
import { SideNavLinkItem } from '@servicetitan/link-item';

import { Page } from './page';

import {
    ColorPickerExample,
    ConfirmExample,
    ConfirmNavigationExample,
    DateRangePickerExample,
    DropdownStateExample,
    FileUploaderExample,
    InputDateMaskExample,
    NotificationsExample,
    NumberInputExample,
    OrdinalNumberInputExample,
    PhoneNumberInputExample,
    TableExample,
    TableMasterDetailExample,
    TableStateCachingExample,
} from './examples';

export const App: FC = () => {
    const [basename = '', eventBus] = useOptionalDependencies(BASENAME_TOKEN, EventBus);

    useEffect(() => {
        const myCustomEventHandler = () => {
            console.log('`my-custom-event` has been fired');
        };
        eventBus?.on('my-custom-event', myCustomEventHandler);

        return () => {
            eventBus?.off('my-custom-event', myCustomEventHandler);
        };
    }, [eventBus]);

    return (
        <StrictMode>
            <HashBrowserRouter basename={basename}>
                <Page
                    sidebar={
                        <Sidebar localStorageKey="servicetitan-examples__navigation">
                            <Sidebar.Section padding="y">
                                <SideNav title="Examples">
                                    <SideNavLinkItem pathname="/color-picker">
                                        Color Picker
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/confirm" exact>
                                        Confirm
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/confirm-navigation">
                                        Confirm Navigation
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/date-range-picker">
                                        Date Range Picker
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/dropdown-state">
                                        Dropdown State
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/file-uploader">
                                        File Uploader
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/input-date-mask">
                                        Input Date Mask
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/notifications">
                                        Notifications
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/number-input">
                                        Number Input
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/original-number-input">
                                        Original Number Input
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/phone-number-input">
                                        Phone Number Input
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/table" exact>
                                        Table
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/table-master-detail">
                                        Table (Master/Detail)
                                    </SideNavLinkItem>
                                    <SideNavLinkItem pathname="/table-state-caching">
                                        Table (State Caching)
                                    </SideNavLinkItem>
                                </SideNav>
                            </Sidebar.Section>
                        </Sidebar>
                    }
                    spacing="relaxed"
                    fullHeight
                >
                    <Switch>
                        <Route path="/color-picker" component={ColorPickerExample} />
                        <Route path="/confirm" component={ConfirmExample} />
                        <Route path="/confirm-navigation" component={ConfirmNavigationExample} />
                        <Route path="/date-range-picker" component={DateRangePickerExample} />
                        <Route path="/dropdown-state" component={DropdownStateExample} />
                        <Route path="/file-uploader" component={FileUploaderExample} />
                        <Route path="/input-date-mask" component={InputDateMaskExample} />
                        <Route path="/notifications" component={NotificationsExample} />
                        <Route path="/number-input" component={NumberInputExample} />
                        <Route
                            path="/original-number-input"
                            component={OrdinalNumberInputExample}
                        />
                        <Route path="/phone-number-input" component={PhoneNumberInputExample} />
                        <Route path="/table" component={TableExample} />
                        <Route path="/table-master-detail" component={TableMasterDetailExample} />
                        <Route path="/table-state-caching" component={TableStateCachingExample} />
                        <Redirect path="/" to="/table" />
                    </Switch>
                </Page>
            </HashBrowserRouter>
        </StrictMode>
    );
};
