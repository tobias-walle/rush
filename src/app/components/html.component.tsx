import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as serialize from 'serialize-javascript';
import * as Helmet from 'react-helmet';
import { IS_SERVER_SIDE } from "../utils/config";

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

    let head: JSX.Element;
    let stylesElement = <style type="text/css" dangerouslySetInnerHTML={{__html: styles.join('  ')}}/>;
    let htmlAttributes: any;
    if (IS_SERVER_SIDE) {
      let helmet = Helmet.rewind();
      htmlAttributes = helmet.htmlAttributes;
      head = (
        <head>
          {helmet.base.toComponent()}
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.script.toComponent()}
          {stylesElement}
        </head>
      )
    } else {
      head = (
        <Helmet>
          {stylesElement}
        </Helmet>
      );
    }

    return (
      <html {...htmlAttributes ? htmlAttributes.toString() : undefined}>
      {head}
      <body>
      <div id="container"
           dangerouslySetInnerHTML={{__html: content}}
      />

      <script
        dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}
        charSet="UTF-8"
      />
      <script src="/static/vendor.bundle.js"></script>
      <script src="/static/bundle.js"></script>
      </body>
      </html>
    )
  }
}