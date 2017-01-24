import * as React from 'react';
import { WithStyles } from "isomorphic-style-loader-utils";
let styles = require('./link.scss');

export interface LinkProps {
    active?: boolean,
    children?: JSX.Element,
    onClick?: () => void,
}

@WithStyles(styles)
export class LinkComponent extends React.Component<LinkProps, any> {
    constructor(props: LinkProps) {
        super(props);
    }

    render(): JSX.Element {
        let { active, children, onClick } = this.props;
        if (active) {
            return <span className={styles.linkActive}>{children}</span>;
        }

        return <span className={styles.link} onClick={e => onClick()}>{ children }</span>;
    }
}