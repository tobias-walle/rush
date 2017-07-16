import * as React from 'react';
import { Store } from 'redux';
import { WithStyles } from 'isomorphic-style-loader-utils';
import { History } from 'history';
const ConnectedRouter = require('react-router-redux').ConnectedRouter;
const Provider = require('react-redux').Provider;
const mainStyles = require('../styles/main.scss');

export interface ClientWrapperProps {
  store: Store<any>;
  history: History;
  children?: any;
}

@WithStyles(mainStyles)
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
