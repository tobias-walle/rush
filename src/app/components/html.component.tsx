import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as serialize from 'serialize-javascript';
import * as Helmet from 'react-helmet';
import { IS_SERVER_SIDE } from '../utils/config';

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
    const {component, store} = this.props;
    let styles = this.props.styles;
    if (styles === undefined) {
      styles = [];
    }
    const content: string = component ? ReactDOM.renderToString(component) : '';

    let head: JSX.Element;
    const stylesElement = <style type='text/css' dangerouslySetInnerHTML={{__html: styles.join('  ')}}/>;
    let htmlAttributes: any;
    if (IS_SERVER_SIDE) {
      const helmet = Helmet.rewind();
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
      );
    } else {
      head = (
        <head>
          {stylesElement}
        </head>
      );
    }

    return (
      <html {...htmlAttributes ? htmlAttributes.toString() : undefined}>
      {head}
      <body>
      <div
        id='container'
        dangerouslySetInnerHTML={{__html: content}}
      />

      <script
        dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}
        charSet='UTF-8'
      />
      <script src='/static/vendor.bundle.js'/>
      <script src='/static/bundle.js'/>
      </body>
      </html>
    );
  }
}
