import React from 'react';

import { Page as AnvilPage, PageProps as AnvilPageProps } from '@servicetitan/design-system';

import classnames from 'classnames';

import * as Styles from './page.module.css';

export interface PageProps extends AnvilPageProps {
    fullHeight?: boolean;
}

export const Page: React.FC<PageProps> = ({ className, fullHeight, ...props }) => (
    <AnvilPage
        maxWidth="wide"
        spacing="none"
        className={classnames(Styles.page, className, fullHeight && Styles.fullHeight)}
        {...props}
    />
);
