import { lazyModule } from '@servicetitan/lazy-module';

export const ColorPickerExample = lazyModule({
    loader: async () => {
        const { ColorPickerExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return ColorPickerExample;
    },
    name: 'ColorPickerExample',
});

export const ConfirmExample = lazyModule({
    loader: async () => {
        const { ConfirmExample } = await import(/* webpackChunkName: "confirm" */ './confirm');

        return ConfirmExample;
    },
    name: 'ConfirmExample',
});

export const ConfirmNavigationExample = lazyModule({
    loader: async () => {
        const { BasicExample } = await import(
            /* webpackChunkName: "confirm-navigation" */ '@servicetitan/confirm-navigation/dist/demo'
        );

        return BasicExample;
    },
    name: 'ConfirmNavigationExample',
});

export const DateRangePickerExample = lazyModule({
    loader: async () => {
        const { DateRangePickerExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return DateRangePickerExample;
    },
    name: 'DateRangePickerExample',
});

export const DropdownStateExample = lazyModule({
    loader: async () => {
        const { DropdownStateExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return DropdownStateExample;
    },
    name: 'DropdownStateExample',
});

export const FileUploaderExample = lazyModule({
    loader: async () => {
        const { FileUploaderExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return FileUploaderExample;
    },
    name: 'FileUploaderExample',
});

export const InputDateMaskExample = lazyModule({
    loader: async () => {
        const { InputDateMaskExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return InputDateMaskExample;
    },
    name: 'InputDateMaskExample',
});

export const NotificationsExample = lazyModule({
    loader: async () => {
        const { NotificationsExample } = await import(
            /* webpackChunkName: "notifications" */ './notifications'
        );

        return NotificationsExample;
    },
    name: 'NotificationsExample',
});

export const NumberInputExample = lazyModule({
    loader: async () => {
        const { NumberInputExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return NumberInputExample;
    },
    name: 'NumberInputExample',
});

export const OrdinalNumberInputExample = lazyModule({
    loader: async () => {
        const { OrdinalNumberInputExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return OrdinalNumberInputExample;
    },
    name: 'OrdinalNumberInputExample',
});

export const PhoneNumberInputExample = lazyModule({
    loader: async () => {
        const { PhoneNumberInputExample } = await import(
            /* webpackChunkName: "form" */ '@servicetitan/form/dist/demo'
        );

        return PhoneNumberInputExample;
    },
    name: 'PhoneNumberInputExample',
});

export const TableExample = lazyModule({
    loader: async () => {
        const { TableExample } = await import(
            /* webpackChunkName: "table" */ '@servicetitan/table/dist/demo'
        );

        return TableExample;
    },
    name: 'TableExample',
});

export const TableMasterDetailExample = lazyModule({
    loader: async () => {
        const { TableMasterDetailExample } = await import(
            /* webpackChunkName: "table" */ '@servicetitan/table/dist/demo'
        );

        return TableMasterDetailExample;
    },
    name: 'TableMasterDetailExample',
});

export const TableStateCachingExample = lazyModule({
    loader: async () => {
        const { TableStateCachingExample } = await import(
            /* webpackChunkName: "table" */ '@servicetitan/table/dist/demo'
        );

        return TableStateCachingExample;
    },
    name: 'TableStateCachingExample',
});
