import * as http from 'http';
import * as path from 'path';
import * as React from 'react';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as express from 'express';
import { Observable } from 'rxjs';
import { Server } from 'http';
import { renderToString } from 'react-router-server';
import { createStore } from 'redux';
import createMemoryHistory from 'history/createMemoryHistory';
import { Html } from '@app/components/html';
import { Entry } from '@modules/root';
import { getStoreMiddleware } from '@app/utils/redux-helper';
import { loggerFactory } from '@src/logging';
import { DEVELOPMENT, DISABLE_SERVER_SIDE_RENDERING, DISABLE_SERVER_SIDE_STYLE_RENDERING } from '@src/config';
import { ServerWrapper } from './server-wrapper';
import { WebServer } from './webpack-dev-server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import enableDestroy = require('server-destroy');

const STATIC_PATH = '/static';
const FAVICON_PATH = '/favicon.ico';
const logger = loggerFactory.getLogger('server.ui');

export class UIServerOptions {
  host: string;
  port: number;
  webpackDevHost: string;
  webpackDevPort: number;
  apiHost: string;
  apiPort: number;
}

export class UIServer {
  options: UIServerOptions;

  httpServer: Server;
  webpackDevServer: any;

  private rootDir = path.resolve();
  private publicPath = path.resolve(this.rootDir + '/dist/client');

  private app: express.Application;
  private httpProxy: any;
  constructor(options: UIServerOptions) {
    this.setOptions(options);
  }

  /**
   * Run the initial setup of the server. This create the server instance and setups all the routes.
   */
  init() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    enableDestroy(this.httpServer);

    // Middleware
    if (DEVELOPMENT) {
      this.app.use(morgan('dev'));
    }

    // Create a proxy for the webpack dev server and the api
    this.httpProxy = require('http-proxy').createProxyServer({
      ws: true,
    });

    // Setup
    this.setupApiRoutes();
    if (DEVELOPMENT) {
      this.setupWebpackDevServerRoutes();
    } else {
      this.setupStaticRoutes();
    }
    this.setupFaviconRoutes();
    this.setupHtmlRoutes();
  }

  /**
   * Set the options of the server.
   * @param options The options to set.
   */
  setOptions(options: UIServerOptions) {
    this.options = Object.seal(options);
    this.init();
  }

  /**
   * Setup routes for the webpack development server proxy.
   */
  setupWebpackDevServerRoutes() {
    this.app.all(`${STATIC_PATH}/*`, (req, res) => {
      this.httpProxy.web(req, res, {
        target: `http://${this.options.webpackDevHost}:${this.options.webpackDevPort}/`,
      });
    });
  }

  /**
   * Setup routes for the api proxy.
   */
  setupApiRoutes() {
    // Http Proxy
    this.app.use('/api', (req, res) => {
      this.httpProxy.web(req, res, {
        target: `http://${this.options.apiHost}:${this.options.apiPort}/`,
      }
      );
    });

    // WebSocket proxy
    this.httpServer.on('upgrade', (req, socket, head) => {
      this.httpProxy.ws(req, socket, head, {
        target: {
          host: this.options.apiHost,
          port: this.options.apiPort,
        },
        ignorePath: true
      });
    });
  }

  /**
   * Setup routes to static content.
   */
  setupStaticRoutes() {
    this.app.use(STATIC_PATH, express.static(this.publicPath));
  }

  /**
   * Setup the favicon.
   */
  setupFaviconRoutes() {
    this.app.get(FAVICON_PATH, (req, res, next) => {
      res.redirect(`${STATIC_PATH}/assets${FAVICON_PATH}`);
    });
  }

  /**
   * Create an array of paths with the scripts, which should loaded by the client initially.
   * @return {string[]} An array of string with the public paths to the scripts.
   */
  createScriptPaths() {
    // Scripts paths
    let jsFileNames = ['vendor.js', 'app.js'];
    if (!DEVELOPMENT) {
      // In production, the file names must be loaded dynamically
      const manifestPath = path.join(this.publicPath, 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      jsFileNames = jsFileNames.map(fileName => manifest[fileName]);
    }
    // Map the filenames to the script paths
    return jsFileNames.map(fileName => path.join(STATIC_PATH, fileName));
  }

  /**
   * Setup the routes for sending the html documents to the client.
   */
  setupHtmlRoutes() {
    const scriptPaths = this.createScriptPaths();
    const store = createReduxStore();

    this.app.use((req, res) => {
      if (DISABLE_SERVER_SIDE_RENDERING) {
        // Just provider Html without SSR
        renderToString(
          <Html scripts={scriptPaths} store={store} />,
        )
          .then(({ html }) => {
            res.status(200).send(html);
          })
          .catch(err => {
            logger.error(err);
            res.status(500).send(err.toString());
          });
      } else {
        const context: any = {};
        const sheet = new ServerStyleSheet();
        const component = (
          <StyleSheetManager sheet={(sheet as any).instance}>
            <ServerWrapper
              store={store}
              url={req.url}
              context={context}
            >
              <Entry />
            </ServerWrapper>
          </StyleSheetManager>
        );
        const styles: JSX.Element[] =  sheet.getStyleElement();
        renderToString(
          <Html
            store={store}
            scripts={scriptPaths}
            component={component}
            styles={DISABLE_SERVER_SIDE_RENDERING ? undefined : styles}
          />,
        )
          .then(({ html }) => {
            if (context.url) {
              res.writeHead(302, {
                Location: context.url
              });
              res.end();
            } else {
              res.send(html);
            }
          })
          .catch(err => {
            logger.error(err);
            res.status(500).send(err.toString());
          });
      }
    });
  }

  /**
   * Start the webpack development server.
   */
  startWebpackDevServer() {
    this.webpackDevServer = new WebServer(this.options.webpackDevHost, this.options.webpackDevPort);
    this.webpackDevServer.start();
  }

  /**
   * Start the http server.
   */
  start() {
    this.httpServer.listen(this.options.port, () => {
      logger.info(`UI Server is running on ${this.options.host}:${this.options.port}/`);
    });
  }

  /**
   * Stop the http server.
   * @return {Observable<any>} Observable that resolves once the ui server is closed.
   */
  stop(): Observable<any> {
    logger.info('Stop UI Server');
    const closeObservable = Observable.fromEvent(this.httpServer, 'close').publishReplay(1).refCount();
    (this.httpServer as any).destroy();
    return closeObservable;
  }
}

/**
 * Create the redux store, which should be send to the client.
 * @return {Store<any>} The redux store
 */
function createReduxStore() {
  // Setup state
  const initialState = {};
  const history = createMemoryHistory();
  return createStore(
    require('../modules/root').reducer,
    initialState,
    getStoreMiddleware(history)
  );
}
