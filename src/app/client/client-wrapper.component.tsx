import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export interface ClientWrapperComponentProps {
  store: Store<any>;
  children?: any;
}

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
