import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as serialize from 'serialize-javascript';
import * as Helmet from 'react-helmet';

export class HtmlProps {
    store: any;
    component?: React.ReactElement<any>;
    styles?: string[];
}

export class HtmlComponent extends React.Component<HtmlProps, any> {
    constructor(props: HtmlProps) {
        super(props);
    }

    render(): JSX.Element {
        let {component, store, styles} = this.props;
        if (styles === undefined) {
            styles = [];
        }
        let content: string = component ? ReactDOM.renderToString(component) : '';
        let head = Helmet.rewind();

        return (
            <html {...head.htmlAttributes.toString()}>
            <head>
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}
                <style type="text/css"
                       dangerouslySetInnerHTML={{__html: styles.join('  ')}}/>
            </head>
            <body>
            <div id="container"
                 dangerouslySetInnerHTML={{__html: content}}
            />

            <script
                dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}
                charSet="UTF-8"
            />
            <script src="/dist/vendor.bundle.js"></script>
            <script src="/dist/bundle.js"></script>
            </body>
            </html>
        )
    }
}