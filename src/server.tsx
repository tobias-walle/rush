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

const HOST = (process.env.HOST || 'localhost');
const PORT = process.env.PORT !== undefined ? process.env.PORT : 3000;

const ROOT_DIR = path.resolve();
const PUBLIC_PATH = path.resolve(ROOT_DIR + '/dist/client');


let app: express.Application = express();

// Start webpack dev server in development mode
if (DEVELOPMENT) {
  // Create a proxy for the webpack development server
  let httpProxy = require('http-proxy');
  let proxy = httpProxy.createProxyServer();

  // Create and start the webpack dev server.
  const WEBPACK_PORT = PORT + 1;
  const WEBPACK_HOST = HOST;

  let webpackDevServer = new WebServer(WEBPACK_HOST, WEBPACK_PORT);
  webpackDevServer.start();

  // Send all remaining request to the dev server
  app.all('/static/*', (req, res) => {
    proxy.web(req, res, {
      target: `http://${WEBPACK_HOST}:${WEBPACK_PORT}/`
    })
  });
}

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

