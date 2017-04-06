import * as http from 'http';
import * as path from 'path';
import * as React from 'react';
import { Server } from 'http';
import { WebServer } from './webpack-dev-server';
import { createStore } from 'redux';
import { WithStylesContext } from 'isomorphic-style-loader-utils';
import { DEVELOPMENT, DISABLE_SERVER_SIDE_RENDERING } from '../config';
import { ApiServer } from '../../api/index';
import { HtmlComponent } from '../components/html.component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { EntryComponent } from '../modules/root';
import { ServerWrapperComponent } from './server-app-wrapper.component';
import { renderToString } from 'react-router-server';
import { getStoreMiddleware } from '../utils/redux-helper';
import * as morgan from 'morgan';
import * as express from 'express';

// Load main styles as string
const mainStyles = require('../styles/main.scss');

export class BackendServerOptions {
  host?: string = 'localhost';
  port?: number = 3000;
  webpackDevHost?: string = 'localhost';
  webpackDevPort?: number = 3001;
  apiHost?: string = 'localhost';
  apiPort?: number = 3002;
}

export class BackendServer {
  private rootDir = path.resolve();
  private publicPath = path.resolve(this.rootDir + '/dist/client');

  private app: any;
  private httpProxy: any;

  options: BackendServerOptions;

  httpServer: Server;
  webpackDevServer: any;
  apiServer: ApiServer;

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
    this.app.all('/static/*', (req, res) => {
      this.httpProxy.web(req, res, {
        target: `http://${this.options.webpackDevHost}:${this.options.webpackDevPort}/`,
      });
    });
  }

  setupApiRoutes() {
    this.app.use('/api', (req, res) => {
      this.httpProxy.web(req, res, {
          target: `http://${this.options.apiHost}:${this.options.apiPort}/`,
        }
      );
    });

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
    this.app.use('/static', express.static(this.publicPath));
  }

  setupHtmlRoutes() {
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
          <HtmlComponent store={store}/>,
        )
          .then(({html}) => {
            res.status(200).send(html);
          })
          .catch(err => console.error(err));
        ;
      } else {
        // Load styles
        const css: string[] = [];
        // Wrap app with style context
        const EntryComponentWithStyles = withStyles(mainStyles)(EntryComponent);

        // Send the result
        const context: any = {};
        renderToString(
          <HtmlComponent
            store={store}
            component={(
              <ServerWrapperComponent
                store={store}
                url={req.url}
                context={context}
              >
                <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
                  <EntryComponentWithStyles/>
                </WithStylesContext>
              </ServerWrapperComponent>
            )}
            styles={css}
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
          .catch(err => console.error(err));
      }
    });
  }

  startWebpackDevServer(host = this.options.webpackDevHost, port = this.options.webpackDevPort) {
    this.webpackDevServer = new WebServer(host, port);
    this.webpackDevServer.start();
  }

  startApiServer(host = this.options.apiHost, port = this.options.apiPort) {
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
    this.httpServer.listen(this.options.port, () => {
      console.log(`Server is running on ${this.options.host}:${this.options.port}/`);
    });
  }

  stop() {
    console.log('Stop Backend Server');
    this.httpServer.close();
  }
}
