import * as React from 'react';
import { Store } from 'redux';
import { History } from 'history';
const ConnectedRouter = require('react-router-redux').ConnectedRouter;
const Provider = require('react-redux').Provider;

export interface ClientWrapperProps {
  store: Store<any>;
  history: History;
  children?: any;
}

export class ClientWrapper extends React.Component<ClientWrapperProps, {}> {
  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {this.props.children}
        </ConnectedRouter>
      </Provider>
    );
  }
}
