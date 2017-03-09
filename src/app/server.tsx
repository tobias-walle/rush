import * as React from 'react';
import { Observable } from 'rxjs';
import { AppContainer } from 'react-hot-loader';
import { DEVELOPMENT } from './utils/config';
import { BackendServer, BackendServerOptions } from './server/backend-server';

// Server Config
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

// Webpack dev server config
const WEBPACK_DEV_HOST = process.env.WEBPACK_HOST || HOST || '127.0.0.1';
const WEBPACK_DEV_PORT = process.env.WEBPACK_PORT || 3001;

// API Config
const API_HOST = process.env.API_HOST || HOST || '127.0.0.1';
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
server = new BackendServer(options);
if (DEVELOPMENT) {
  server.startWebpackDevServer();
}

server.startApiServer();
server.start();


// -- HOT RELOAD SETUP -- THIS IS STILL EXPERIMENTAL AND MAY HAVE SOME BUGS WHICH REQUIRES A FULL RELOAD
if (DEVELOPMENT && module && module['hot']) {
  const hot = module['hot'];

  // Check for changes in backend server
  hot.accept(require.resolve('./server/backend-server.tsx'), () => {
    console.log('[HMR] Reload Backend Server');
    try {
      // Reload backend server
      let NewBackendServer = require('./server/backend-server.tsx').BackendServer;

      // Create a new server
      let newServer = new NewBackendServer(options);

      // Stop old server
      server.stopApiServer();
      server.stop();

      // Copy webpackserver to new server
      newServer.webpackDevServer = server.webpackDevServer;

      // Set new server as the primary server
      server = newServer;

      // Start server again
      server.startApiServer();
      server.start();

    } catch (err) {
      console.error('Hot Reload failed:', err);
    }
  });

  // Check for changes
  Observable.interval(1000)
    .filter(() => hot.status() === 'idle')
    .subscribe(() => {
        try {
          hot.check({
            ignoreDeclined: true,
            ignoreUnaccepted: true,
          }).then((result) => {
          })
            .catch((err) => console.error('[HMR Check Promise]', err));
        } catch (err) {
          console.error('[HMR Check]', err);
        }
      }
    );
}

