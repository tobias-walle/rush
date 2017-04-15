import * as http from 'http';
import * as path from 'path';
import * as React from 'react';
import { Server } from 'http';
import { WebServer } from './webpack-dev-server';
import { createStore } from 'redux';
import { WithStylesContext } from 'isomorphic-style-loader-utils';
import { DEVELOPMENT, DISABLE_SERVER_SIDE_RENDERING, DISABLE_SERVER_SIDE_STYLE_RENDERING } from '../../config';
import { HtmlComponent } from '../components/html.component';
import { EntryComponent } from '../modules/root';
import { ServerWrapperComponent } from './server-app-wrapper.component';
import { renderToString } from 'react-router-server';
import { getStoreMiddleware } from '../utils/redux-helper';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as express from 'express';
import * as enableDestroy from 'server-destroy';
import { loggerFactory } from '../../logging';
import { Observable } from 'rxjs';
import createMemoryHistory from 'history/createMemoryHistory';

const STATIC_PATH = '/static';
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
  private rootDir = path.resolve();
  private publicPath = path.resolve(this.rootDir + '/dist/client');

  private app: any;
  private httpProxy: any;

  options: UIServerOptions;

  httpServer: Server;
  webpackDevServer: any;

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
          <HtmlComponent scripts={scriptPaths} store={store}/>,
        )
          .then(({html}) => {
            res.status(200).send(html);
          })
          .catch(err => logger.error(err));
      } else {
        // Load styles
        const css: string[] = [];
        // Wrap app with style context
        // Send the result
        const context: any = {};
        const component = (
          <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
            <ServerWrapperComponent
              store={store}
              url={req.url}
              context={context}
            >
              <EntryComponent/>
            </ServerWrapperComponent>
          </WithStylesContext>
        );
        renderToString(
          <HtmlComponent
            store={store}
            scripts={scriptPaths}
            component={component}
            styles={!DISABLE_SERVER_SIDE_STYLE_RENDERING ? css : []}
          />,
        )
          .then(({html}) => {
            if (context.url) {
              res.writeHead(302, {
                Location: context.url
              });
              res.end();
            } else {
              res.send(html);
            }
          })
          .catch(err => logger.error(err));
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
