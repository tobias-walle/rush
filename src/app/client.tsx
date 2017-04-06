import './polyfills';
import 'rxjs';
import { composeWithDevTools } from 'redux-devtools-extension';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { WithStylesContext } from 'isomorphic-style-loader-utils';
import { AppContainer } from 'react-hot-loader';
import { DEVELOPMENT } from './config';

import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { EntryComponent } from './modules/root';

// Load initial state
let store: any;
const setupStore = () => {
  // Imports
  const initialState = window['__data'];
  const reducer = require('./modules/root').reducer;
  const getStoreMiddleware = require('./utils/redux-helper').getStoreMiddleware;

  let middleware = getStoreMiddleware();
  if (DEVELOPMENT) {
    // If not production, activate redux debug tools
    middleware = composeWithDevTools(middleware);
  }

  store = createStore(reducer, initialState, middleware);
};
setupStore();

// Render the app
const getRootComponent = () => {
  const ClientWrapperComponent = require('./client/client-wrapper.component.tsx').ClientWrapperComponent;

  // Load styles
  const mainStyles = require('./styles/main.scss');

  const RootComponent = withStyles(mainStyles)(() => (
    <ClientWrapperComponent
      store={store}
    >
      <EntryComponent/>
    </ClientWrapperComponent>
  ));

  // Add Component style context
  return () => (
    <WithStylesContext onInsertCss={styles => styles._insertCss()}>
      <RootComponent/>
    </WithStylesContext>
  );
};

const RootComponent = getRootComponent();
render(
  <AppContainer>
    <RootComponent/>
  </AppContainer>, document.getElementById('container'),
);

if (module['hot']) {

  const reRenderApp = () => {
    const NextRootComponent = getRootComponent();

    render((
      <AppContainer>
        <NextRootComponent />
      </AppContainer>
    ), document.getElementById('container'));
  };

  module['hot'].accept('./client/client-wrapper.component.tsx', () => {
    reRenderApp();
  });

  module['hot'].accept(['./modules/root', './utils/redux-helper'], () => {
    console.log('Hot Reload root');
    setupStore();
    reRenderApp();
  });

  module['hot'].accept();
}
