import '../polyfills';
import 'rxjs/Observable';
import * as React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import { DEVELOPMENT } from '../config';

// Load initial state
let store: any;
const history: History = createBrowserHistory();
const setupStore = async (reload = false) => {
  // Imports
  const initialState = window['__data'];
  const { reducer } = await import('./modules/root');
  const { getStoreMiddleware } = await import('./utils/redux-helper');

  let middleware = getStoreMiddleware(history);
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

// Render
const renderApp = async () => {
  const { Entry } = await import('./modules/root');
  const { ClientWrapper } = await import('./client/client-wrapper');
  render(
    <AppContainer>
      <ClientWrapper
        store={store}
        history={history}
      >
        <Entry />
      </ClientWrapper>
    </AppContainer>, document.getElementById('container'),
  );
};

(async () => {
  await setupStore();
  await renderApp();

  if (module['hot']) {
    module['hot'].accept(['./client/client-wrapper.tsx'], async () => {
      await renderApp();
    });

    module['hot'].accept(['./modules/root.ts', './utils/redux-helper.ts'], async () => {
      await Promise.all([
        setupStore(true),
        renderApp()
      ]);
    });

    module['hot'].accept();
  }
})();
