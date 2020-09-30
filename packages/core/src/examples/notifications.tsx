import React from 'react';

import { Text } from '@servicetitan/design-system';

import {
    BasicExample,
    StatusVariationsExample,
    DurationExample,
    ActionButtonExample,
    ProgressExample,
    PreventDuplicatesExample,
    MultilineMessageExample,
    ServerDefaultExample,
    ServerCustomExample,
} from '@servicetitan/notifications/dist/demo';

export const NotificationsExample: React.FC = () => (
    <React.Fragment>
        <Text size={4} className="m-b-half">
            Basic usage
        </Text>
        <BasicExample />

        <Text size={4} className="m-t-4 m-b-half">
            Status Variations
        </Text>
        <StatusVariationsExample />

        <Text size={4} className="m-t-4 m-b-half">
            Duration
        </Text>
        <DurationExample />

        <Text size={4} className="m-t-4 m-b-half">
            Action Button
        </Text>
        <ActionButtonExample />

        <Text size={4} className="m-t-4 m-b-half">
            Progress
        </Text>
        <ProgressExample />

        <Text size={4} className="m-t-4 m-b-half">
            Prevent Duplicates
        </Text>
        <PreventDuplicatesExample />

        <Text size={4} className="m-t-4 m-b-half">
            Multiline Message
        </Text>
        <MultilineMessageExample />

        <Text size={4} className="m-t-4 m-b-half">
            Server Default
        </Text>
        <ServerDefaultExample />

        <Text size={4} className="m-t-4 m-b-half">
            Server Custom
        </Text>
        <ServerCustomExample />
    </React.Fragment>
);
