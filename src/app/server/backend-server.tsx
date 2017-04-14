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
import { loggerFactory } from '../../logging';

const STATIC_PATH = '/static';

const logger = loggerFactory.getLogger('server.backend');

export class BackendServerOptions {
  host: string;
  port: number;
  webpackDevHost: string;
  webpackDevPort: number;
  apiHost: string;
  apiPort: number;
}

export class BackendServer {
  private rootDir = path.resolve();
  private publicPath = path.resolve(this.rootDir + '/dist/client');

  private app: any;
  private httpProxy: any;

  options: BackendServerOptions;

  httpServer: Server;
  webpackDevServer: any;

  constructor(options: BackendServerOptions) {
    this.setOptions(options);
  }

  init() {
    this.app = express();
    this.httpServer = http.createServer(this.app);

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

  setOptions(options: BackendServerOptions) {
    this.options = Object.seal(options);
    this.init();
  }

  setupWebpackDevServerRoutes() {
    this.app.all(`${STATIC_PATH}/*`, (req, res) => {
      this.httpProxy.web(req, res, {
        target: `http://${this.options.webpackDevHost}:${this.options.webpackDevPort}/`,
      });
    });
  }

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

  setupStaticRoutes() {
    this.app.use(STATIC_PATH, express.static(this.publicPath));
  }

  setupHtmlRoutes() {
    // Scripts paths
    let scripts;
    let jsFileNames = ['vendor.js', 'app.js'];
    if (!DEVELOPMENT) {
      // In production, the file names must be loaded dynamically
      const manifestPath = path.join(this.publicPath, 'manifest.json');
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      jsFileNames = jsFileNames.map(fileName => manifest[fileName]);
    }
    // Map the filenames to the script paths
    scripts = jsFileNames.map(fileName => path.join(STATIC_PATH, fileName));

    this.app.use((req, res) => {

      // Setup state
      const initialState = {};
      const store = createStore(
        require('../modules/root').reducer,
        initialState,
        getStoreMiddleware()
      );

      if (DISABLE_SERVER_SIDE_RENDERING) {
        // Just provider Html without SSR
        renderToString(
          <HtmlComponent scripts={scripts} store={store}/>,
        )
          .then(({html}) => {
            res.status(200).send(html);
          })
          .catch(err => logger.error(err));
        ;
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
            scripts={scripts}
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

  startWebpackDevServer(host = this.options.webpackDevHost, port = this.options.webpackDevPort) {
    this.webpackDevServer = new WebServer(host, port);
    this.webpackDevServer.start();
  }

  stopWebpackDevServer() {
    this.webpackDevServer.stop();
  }

  start() {
    this.httpServer.listen(this.options.port, () => {
      logger.info(`Server is running on ${this.options.host}:${this.options.port}/`);
    });
  }

  stop() {
    logger.info('Stop Backend Server');
    this.httpServer.close();
  }
}
