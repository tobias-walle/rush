import * as React from 'react';
import { Store } from 'redux';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { History } from 'history';
import { routes } from '../routes';

export interface AppProps {
  store: Store<any>;
  history: History;
}

export const AppComponent = (props: AppProps) => {
  let { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>
  );
};