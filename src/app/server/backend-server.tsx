import { Server } from 'http';
import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import { WebServer } from './webpack-dev-server';
import { match } from 'react-router';
import { routes } from '../routes';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { createMemoryHistory } from 'react-router';
import { WithStylesContext } from 'isomorphic-style-loader-utils';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { syncHistoryWithStore } from 'react-router-redux';

import { DEVELOPMENT, DISABLE_SERVER_SIDE_RENDERING, RENDER_CSS_ON_CLIENT } from '../utils/config';
import { ApiServer } from '../../api/index';
import { getStoreMiddleware } from '../utils/redux-helper';
import { reducer } from '../modules/root';
import { HtmlComponent } from '../components/html.component';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

// Load main styles as string
let mainStyles = require('../styles/main.scss');

export class BackendServerOptions {
  host?: string = 'localhost';
  port?: number = 3000;
  webpack_dev_host?: string = 'localhost';
  webpack_dev_port?: number = 3001;
  api_host?: string = 'localhost';
  api_port?: number = 3002;
}

export class BackendServer {
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
        target: `http://${this.options.webpack_dev_host}:${this.options.webpack_dev_port}/`
      });
    });
  }

  setupApiRoutes() {
    this.app.use('/api', (req, res) => {
      this.proxy.web(req, res, {
        target: `http://${this.options.api_host}:${this.options.api_port}`
      });
    });
  }

  setupStaticRoutes() {
    this.app.use('/static', express.static(this.publicPath));
  }

  setupHtmlRoutes() {
    this.app.use((req, res) => {
      // Search for UI Routes
      match({routes, location: req.originalUrl}, (error: any, nextLocation: Location, nextState: any) => {
        if (error) {
          // Send message if an error occurs
          res.status(500).send(error.message);
        } else if (nextLocation) {
          // Redirect on redirection
          res.redirect(302, nextLocation.pathname + nextLocation.search);
        } else if (nextState) {
          // Create history
          let history = createMemoryHistory();

          // Setup state
          let initialState = {};
          let store = createStore(reducer, initialState, getStoreMiddleware(history));

          syncHistoryWithStore(history, store);

          if (DISABLE_SERVER_SIDE_RENDERING) {
            // Just provider Html without SSR
            res.status(200).send(renderToString(
              <HtmlComponent store={store}/>
            ));
          } else {
            // Prepare app
            let RootComponent = () => (
              <Provider store={store}>
                <RouterContext {...nextState}/>
              </Provider>
            );

            // Load styles if configured
            let css: string[] = [];
            if (!RENDER_CSS_ON_CLIENT) {
              console.log('Load main styles');

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
              <HtmlComponent store={store}
                             component={<RootComponent/>}
                             styles={css}/>
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
    this.httpServer = this.app.listen(this.options.port, () => {
      console.log(`Server is running on ${this.options.host}:${this.options.port}/`);
    });
  }

  stop() {
    console.log('Stop Backend Server');
    this.httpServer.close();
  }
}

