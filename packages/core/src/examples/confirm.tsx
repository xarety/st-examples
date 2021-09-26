import { Fragment, FC } from 'react';

import { Text } from '@servicetitan/design-system';

import {
    BasicExample,
    HookExample,
    ConfigurableExample,
    ToggleableExample,
    YesNoExample,
    CustomExample,
} from '@servicetitan/confirm/dist/demo';

export const ConfirmExample: FC = () => (
    <Fragment>
        <Text size={4} className="m-b-half">
            Default confirmation
        </Text>
        <BasicExample />

        <Text size={4} className="m-t-4 m-b-half">
            Hook usage
        </Text>
        <HookExample />

        <Text size={4} className="m-t-4 m-b-half">
            Configurable default dialog
        </Text>
        <ConfigurableExample />

        <Text size={4} className="m-t-4 m-b-half">
            Toggleable confirmation
        </Text>
        <ToggleableExample />

        <Text size={4} className="m-t-4 m-b-half">
            (Yes / No / Cancel) confrimation
        </Text>
        <YesNoExample />

        <Text size={4} className="m-t-4 m-b-half">
            Custom confirmation component
        </Text>
        <CustomExample />
    </Fragment>
);
