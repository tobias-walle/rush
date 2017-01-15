import * as React from 'react';
let styles = require('./link.scss');

export interface LinkProps {
    active?: boolean,
    children?: JSX.Element,
    onClick?: () => void,
}

export class Link extends React.Component<LinkProps, any> {
    constructor(props: LinkProps) {
        super(props);
    }

    render(): JSX.Element {
        let { active, children, onClick } = this.props;
        if (active) {
            return <span className={styles.linkActive}>{children}</span>;
        }

        return <a className={styles.link} href="#" onClick={e => onClick()}>{ children }</a>;
    }
}