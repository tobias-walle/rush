import * as React from 'react';
import { Store } from 'redux';
import { StaticRouter } from 'react-router';
import { WithStyles } from 'isomorphic-style-loader-utils';
const Provider = require('react-redux').Provider;
const mainStyles = require('../styles/main.scss');

export interface ServerWrapperProps {
  store: Store<any>;
  url: string;
  context: any;
  children?: any;
}

export interface ServerWrapperState {
}

@WithStyles(mainStyles)
export class ServerWrapper extends React.Component<ServerWrapperProps, ServerWrapperState> {
  render() {
    const {store, url} = this.props;
    const context = this.props.context || {};

    return (
      <Provider store={store}>
        <StaticRouter
          location={url}
          context={context}
        >
          {this.props.children}
        </StaticRouter>
      </Provider>
    );
  }
}
