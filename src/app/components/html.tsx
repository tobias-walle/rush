import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
const serialize = require('serialize-javascript');

export class HtmlProps {
  store: any;
  scripts?: string[];
  component?: JSX.Element;
  styles?: JSX.Element[];
}

export const Html = ({component, store, scripts = [], styles = []}: HtmlProps) => {
  const content: string = component ? ReactDOM.renderToString(component) : '';

  let head: JSX.Element;
  head = (
    <head>
      <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no'/>
      {styles}
    </head>
  );

  return (
    <html>
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
    {scripts.map(scriptPath => <script src={scriptPath} key={scriptPath}/>)}
    </body>
    </html>
  );
};
