import '../polyfills';
import 'rxjs';
import { composeWithDevTools } from 'redux-devtools-extension';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { WithStylesContext } from 'isomorphic-style-loader-utils';
import { AppContainer } from 'react-hot-loader';
import { DEVELOPMENT } from './config';
import * as React from 'react';
import { EntryComponent } from './modules/root';
import { ClientWrapperComponent } from './client/client-wrapper.component';

// Load initial state
let store: any;
const setupStore = (reload = false) => {
  // Imports
  const initialState = window['__data'];
  const reducer = require('./modules/root').reducer;
  const getStoreMiddleware = require('./utils/redux-helper').getStoreMiddleware;

  let middleware = getStoreMiddleware();
  if (DEVELOPMENT) {
    // If not production, activate redux debug tools
    middleware = composeWithDevTools(middleware);
  }

  if (reload) {
    store.replaceReducer(reducer);
  } else {
    store = createStore(reducer, initialState, middleware);
  }
};
setupStore();

// Render
const renderApp = () => {
  render(
    <AppContainer>
      <WithStylesContext onInsertCss={styles => styles._insertCss()}>
        <ClientWrapperComponent
          store={store}
        >
          <EntryComponent/>
        </ClientWrapperComponent>
      </WithStylesContext>
    </AppContainer>, document.getElementById('container'),
  );
};
renderApp();

if (module['hot']) {
  module['hot'].accept(['./client/client-wrapper.component.tsx'], () => {
    renderApp();
  });

  module['hot'].accept(['./modules/root.ts', './utils/redux-helper.ts'], () => {
    setupStore(true);
    renderApp();
  });

  module['hot'].accept();
}
