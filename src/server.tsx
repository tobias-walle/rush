import { Server } from "http";
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
import { createMemoryHistory } from "react-router";
import { WithStylesContext } from "isomorphic-style-loader-utils";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { syncHistoryWithStore } from 'react-router-redux';

import { RENDER_CSS_ON_CLIENT, DEVELOPMENT, DISABLE_SERVER_SIDE_RENDERING } from "./utils/config";
import { ApiServer } from "../api/index";
import { Observable } from "rxjs";
import { AppContainer } from 'react-hot-loader';
import { getStoreMiddleware } from "./utils/redux-helper";
import { reducer } from "./modules/root";
import { HtmlComponent } from "./components/html-component";
import { AppComponent } from "./components/app-component";

// Check if this file is executed as a hot reload
let isHotReload = false;
if (module['hot'] && module['hot']['data']) {
  isHotReload = module['hot'].data['reloading'];
}

class BackendServerOptions {
  host?: string = 'localhost';
  port?: number = 3000;
  webpack_dev_host?: string = 'localhost';
  webpack_dev_port?: number = 3001;
  api_host?: string = 'localhost';
  api_port?: number = 3002;
}

class BackendServer {
  private rootDir = path.resolve();
  private publicPath = path.resolve(this.rootDir + '/dist/client');

  private app: express.Application;
  private proxy: any;

  options: BackendServerOptions;

  httpServer: Server;
  webpackDevServer: any;
  apiServer: ApiServer;

  constructor(
    options: BackendServerOptions
  ) {
    this.setOptions(options);
  }

  init() {
    this.app = express();

    // Create a proxy for the webpack dev server and the api
    this.proxy = require('http-proxy').createProxyServer();

    // Setup
    this.setupApiRoutes();
    if (DEVELOPMENT) {
      this.setupWebpackDevServerRoutes();
    } else {
      this.setupStaticRoutes();
    }
    this.setupHtmlRoutes();
  }

  setOptions(options: BackendServerOptions) {
    this.options = Object.seal(options);
    this.init();
  }

  setupWebpackDevServerRoutes() {
    this.app.all('/static/*', (req, res) => {
      this.proxy.web(req, res, {
        target: `http://${WEBPACK_DEV_HOST}:${WEBPACK_DEV_PORT}/`
      })
    });
  }

  setupApiRoutes() {
    this.app.use('/api', (req, res) => {
      this.proxy.web(req, res, {
        target: `http://${API_HOST}:${API_PORT}`
      })
    });
  }

  setupStaticRoutes() {
    this.app.use('/static', express.static(this.publicPath));
  }

  setupHtmlRoutes() {
    this.app.use((req, res) => {
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
          let store = createStore(reducer, initialState, getStoreMiddleware());

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
            let RootComponent = () => (
              <AppContainer>
                <AppComponent store={store}
                              history={history}
                />
              </AppContainer>
            );

            // Load styles if configured
            let css: string[] = [];
            if (!RENDER_CSS_ON_CLIENT) {
              // Load main styles as string
              let mainStyles = require('./styles/main.scss');

              // Wrap app with style context
              let OldAppComponent = withStyles(mainStyles)(RootComponent);
              RootComponent = () => (
                <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
                  <OldAppComponent/>
                </WithStylesContext>
              );
            }

            // Send the result
            let html = renderToString(
              <HtmlComponent store={store} component={<RootComponent/>} styles={css}/>
            );
            res.status(200).send(html);
          }
        } else {
          // No routes where found, send 404
          res.status(404).send('Not found');
        }
      });
    });
  }

  startWebpackDevServer(host = this.options.webpack_dev_host, port = this.options.webpack_dev_port) {
    this.webpackDevServer = new WebServer(host, port);
    this.webpackDevServer.start();
  }

  startApiServer(host = this.options.api_host, port = this.options.api_port) {
    this.apiServer = new ApiServer(host, port);
    this.apiServer.start();
  }

  stopWebpackDevServer() {
    this.webpackDevServer.stop();
  }

  stopApiServer() {
    this.apiServer.stop();
  }

  start() {
    this.httpServer = this.app.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}/`);
    });
  }

  stop() {
    console.log('Stop Backend Server');
    this.httpServer.close();
  }
}

// Server Config
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Webpack dev server config
const WEBPACK_DEV_HOST = process.env.WEBPACK_HOST || HOST || 'localhost';
const WEBPACK_DEV_PORT = process.env.WEBPACK_PORT || 3001;

// API Config
const API_HOST = process.env.API_HOST || HOST || 'localhost';
const API_PORT = process.env.API_PORT || 3002;

// Start Server
let server: BackendServer;
let options: BackendServerOptions = {
  host: HOST,
  port: 3000,
  webpack_dev_host: WEBPACK_DEV_HOST,
  webpack_dev_port: WEBPACK_DEV_PORT,
  api_host: API_HOST,
  api_port: API_PORT,
};
if (isHotReload) {
  server = module['hot']['data']['server'];
  if (server) {
    // Update class
    server.stopApiServer();
    server.stop();
    let webpackDevServer = server.webpackDevServer;
    server = new BackendServer(server.options);
    server.webpackDevServer = webpackDevServer;
  }
}
if (!server) {
  server = new BackendServer(options);
  if (DEVELOPMENT) {
    server.startWebpackDevServer();
  }
}
server.startApiServer();
server.start();


// -- HOT RELOAD SETUP --
if (DEVELOPMENT && module['hot']) {
  const hot = module['hot'];
  hot.accept();
  hot.dispose((data) => {
    data['server'] = server;
    data['reloading'] = true;
  });
  Observable.interval(1000)
    .filter(() => hot.status() === 'idle')
    .subscribe(() => {
      hot.check((err, outdatedModules) => {
        console.log('check');
        if (err) {
          console.error(err);
        } else {
          console.log(outdatedModules);
        }
      })
    });
}

