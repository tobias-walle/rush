import { Observable } from 'rxjs';
import { DEVELOPMENT } from './utils/config';
import { BackendServer, BackendServerOptions } from './server/backend-server';

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
const options: BackendServerOptions = {
  host: HOST,
  port: PORT,
  webpackDevHost: WEBPACK_DEV_HOST,
  webpackDevPort: WEBPACK_DEV_PORT,
  apiHost: API_HOST,
  apiPort: API_PORT,
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
  console.log('[HMR] Hot Module Replacement is activated');
  hot.accept(require.resolve('./server/backend-server.tsx'), () => {
    console.log('[HMR] Reload Backend Server');
    try {
      // Reload backend server
      const NewBackendServer = require('./server/backend-server.tsx').BackendServer;

      // Create a new server
      const newServer = new NewBackendServer(options);

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
      },
    );
}
