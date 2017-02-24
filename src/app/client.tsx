import 'rxjs';
import * as React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { render } from 'react-dom'
import { createStore } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { WithStylesContext } from "isomorphic-style-loader-utils";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AppContainer } from 'react-hot-loader';

import { DEVELOPMENT, RENDER_CSS_ON_CLIENT, DISABLE_SERVER_SIDE_RENDERING } from "./utils/config";

const history = browserHistory;

// Load initial state
let store: any;
const setupStore = () => {
  // Imports
  const initialState = window['__data'];
  const reducer = require('./modules/root').reducer;
  const getStoreMiddleware = require('./utils/redux-helper').getStoreMiddleware;

  let middleware = getStoreMiddleware(history);
  if (DEVELOPMENT) {
    // If not production, activate redux debug tools
    middleware = composeWithDevTools(middleware);
  }

  store = createStore(reducer, initialState, middleware);

  syncHistoryWithStore(history, store);
};
setupStore();

// Render the app
const getRootComponent = () => {
  let AppComponent = require('./components/app.component.tsx').AppComponent;

  let RootComponent = () => (
    <AppComponent history={history}
                  store={store}
    />
  );

  if (RENDER_CSS_ON_CLIENT || DISABLE_SERVER_SIDE_RENDERING) {
    // Main styles
    let mainStyles = require('./styles/main.scss');

    // Add Component style context
    let OldRootComponent = withStyles(mainStyles)(RootComponent);
    RootComponent = () => (
      <WithStylesContext onInsertCss={ styles => styles._insertCss()}>
        <OldRootComponent/>
      </WithStylesContext>
    );
  }
  return RootComponent;
};

let RootComponent = getRootComponent();
render(
  <AppContainer>
    <RootComponent/>
  </AppContainer>, document.getElementById('container')
);

if (module['hot']) {

  const reRenderApp = () => {
    let NextRootComponent = getRootComponent();

    render((
      <AppContainer>
        <NextRootComponent />
      </AppContainer>
    ), document.getElementById('container'));
  };

  module['hot'].accept('./components/app.component.tsx', () => {
    reRenderApp();
  });

  module['hot'].accept('./modules/root', () => {
    setupStore();
    reRenderApp();
  });
}