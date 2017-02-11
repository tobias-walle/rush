import * as React from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { render } from 'react-dom'
import { createStore } from 'redux';
import { browserHistory } from 'react-router';

import { WithStylesContext } from "isomorphic-style-loader-utils";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { DEVELOPMENT, RENDER_CSS_ON_CLIENT, DISABLE_SERVER_SIDE_RENDERING } from "./utils/config";
import { reducer } from "./modules/root";
import { syncHistoryWithStore } from 'react-router-redux';
import { getStoreMiddleware } from "./utils/redux-helper";
import { AppContainer } from 'react-hot-loader';

// Load initial state
const initialState = window['__data'];
let store: any;
let middleware = getStoreMiddleware();
if (DEVELOPMENT) {
  // If not production, activate redux debug tools
  middleware = composeWithDevTools(middleware);
}

store = createStore(reducer, initialState, middleware);

syncHistoryWithStore(browserHistory, store);

// Render the app
const getRootComponent = () => {
  let AppComponent = require('./components/app-component').AppComponent;

  let RootComponent = () => (
    <AppComponent history={browserHistory}
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
  module['hot'].accept('./components/app-component.tsx', () => {
    let NextRootComponent = getRootComponent();

    render((
      <AppContainer>
        <NextRootComponent />
      </AppContainer>
    ), document.getElementById('container'));
  })
}