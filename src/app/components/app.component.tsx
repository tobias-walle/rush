import * as React from 'react';
import { Store } from 'redux';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { History } from 'history';
import { routes } from '../routes';
import { startWindowSizeListener, windowSizeChange } from '../modules/browser/browser.redux';

export interface AppProps {
  store: Store<any>;
  history: History;
}

export class AppComponent extends React.Component<AppProps, any> {

  componentDidMount() {
    const store = this.props.store;
    store.dispatch(windowSizeChange());
    store.dispatch(startWindowSizeListener());
  }

  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={routes}/>
      </Provider>
    );
  }
}