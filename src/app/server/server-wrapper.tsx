import * as React from 'react';
import { Store } from 'redux';
import { StaticRouter } from 'react-router';
const Provider = require('react-redux').Provider;

export interface ServerWrapperProps {
  store: Store<any>;
  url: string;
  context: any;
  children?: any;
}

export interface ServerWrapperState {
}

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
