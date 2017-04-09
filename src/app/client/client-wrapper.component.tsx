import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { WithStyles } from 'isomorphic-style-loader-utils';
const mainStyles = require('../styles/main.scss');

export interface ClientWrapperComponentProps {
  store: Store<any>;
  children?: any;
}

@WithStyles(mainStyles)
export class ClientWrapperComponent extends React.Component<ClientWrapperComponentProps, {}> {
  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter>
          {this.props.children}
        </BrowserRouter>
      </Provider>
    );
  }
}
