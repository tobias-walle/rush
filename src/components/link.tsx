import * as React from 'react';

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
            return <span>{children}</span>;
        }

        return <a href="#" onClick={e => onClick()}>{ children }</a>;
    }
}