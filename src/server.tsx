import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import { WebServer } from './server/webpack-dev-server';
import { match } from 'react-router';
import { routes } from './routes';
import { MatchState } from 'react-router/lib/match';
import { Location } from 'history';
import { renderToString } from "react-dom/server";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Router, createMemoryHistory } from "react-router";
import { WithStylesContext } from "isomorphic-style-loader-utils";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { RENDER_CSS_ON_CLIENT, DEVELOPMENT, DISABLE_SERVER_SIDE_RENDERING } from "./utils/config";
import { HtmlComponent } from "./components/html-component";
import { reducer } from "./modules/reducer";
import { syncHistoryWithStore } from 'react-router-redux';
import { ApiServer } from "../api/index";

// Server Config
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Webpack dev server config
const WEBPACK_DEV_HOST = process.env.WEBPACK_HOST || HOST || 'localhost';
const WEBPACK_DEV_PORT = process.env.WEBPACK_PORT || 3001;

// API Config
const API_HOST = process.env.API_HOST || HOST || 'localhost';
const API_PORT = process.env.API_PORT || 3002;

// Paths
const ROOT_DIR = path.resolve();
const PUBLIC_PATH = path.resolve(ROOT_DIR + '/dist/client');

// Setup Server
let app: express.Application = express();

// Create a proxy for the webpack dev server and the api
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();

// Start webpack dev server in development mode
if (DEVELOPMENT) {

  // Create and start the webpack dev server.
  let webpackDevServer = new WebServer(WEBPACK_DEV_HOST, WEBPACK_DEV_PORT);
  webpackDevServer.start();

  // Send all remaining request to the dev server
  app.all('/static/*', (req, res) => {
    proxy.web(req, res, {
      target: `http://${WEBPACK_DEV_HOST}:${WEBPACK_DEV_PORT}/`
    })
  });
}

// Setup and start API
let apiServer: ApiServer = new ApiServer(API_HOST, API_PORT);
app.use('/api', (req, res) => {
  proxy.web(req, res, {
    target: `http://${API_HOST}:${API_PORT}`
  })
});
apiServer.start();

// Provide static files
app.use('/static', express.static(PUBLIC_PATH));

app.use((req, res) => {
  // Search for UI Routes
  match({routes, location: req.originalUrl}, (error: any, nextLocation: Location, nextState: MatchState) => {
    if (error) {
      // Send message if an error occurs
      res.status(500).send(error.message);
    } else if (nextLocation) {
      // Redirect on redirection
      res.redirect(302, nextLocation.pathname + nextLocation.search);
    } else if (nextState) {

      // Setup state
      let initialState = {};
      let store = createStore(reducer, initialState);

      // Create history
      let history = createMemoryHistory();

      syncHistoryWithStore(history, store);

      if (DISABLE_SERVER_SIDE_RENDERING) {
        // Just provider Html without SSR
        res.status(200).send(renderToString(
          <HtmlComponent store={store}/>
        ))
      } else {
        // Prepare app
        let AppComponent = () => (
          <Provider store={store}>
            <Router history={history} routes={routes}/>
          </Provider>
        );

        // Load styles if configured
        let css: string[] = [];
        if (!RENDER_CSS_ON_CLIENT) {
          // Load main styles as string
          let mainStyles = require('./styles/main.scss');

          // Wrap app with style context
          let OldAppComponent = withStyles(mainStyles)(AppComponent);
          AppComponent = () => (
            <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
              <OldAppComponent/>
            </WithStylesContext>
          )
        }

        // Send the result
        res.status(200).send(renderToString(
          <HtmlComponent store={store} component={<AppComponent/>} styles={css}/>
        ));
      }
    } else {
      // No routes where found, send 404
      res.status(404).send('Not found');
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}/`);
});

