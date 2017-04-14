require('source-map-support').install();
import '../polyfills';
import { Observable } from 'rxjs';
import { BackendServer, BackendServerOptions } from './server/backend-server';
import { loggerFactory } from '../logging';

const loggerHmr = loggerFactory.getLogger('server.entry.HMR');

// Start Server
let server: BackendServer;
let options: BackendServerOptions;
let config = require('./../config');
const updateOptions = () => {
  config = require('./../config');
  options = {
    host: config.HOST,
    port: config.PORT,
    webpackDevHost: config.WEBPACK_DEV_HOST,
    webpackDevPort: config.WEBPACK_DEV_PORT,
    apiHost: config.API_HOST,
    apiPort: config.API_PORT,
  };
};
updateOptions();
server = new BackendServer(options);
if (config.DEVELOPMENT) {
  server.startWebpackDevServer();
}

server.start();

// -- HOT RELOAD SETUP --
if (config.DEVELOPMENT && module && module['hot']) {
  const hot = module['hot'];

  // Check for changes in backend server
  loggerHmr.debug('Hot Module Replacement is activated');
  hot.accept([
    require.resolve('../polyfills'),
    require.resolve('./server/backend-server.tsx'),
    require.resolve('../config')
  ], () => {
    loggerHmr.debug('Reload Backend Server');
    try {
      // Create a new server
      updateOptions();
      const NewBackendServer = require('./server/backend-server').BackendServer;
      const newServer = new NewBackendServer(options);

      // Stop old server
      server.stop().subscribe(() => {
        // Copy webpack server to the new server
        newServer.webpackDevServer = server.webpackDevServer;

        // Set new server as the primary server
        server = newServer;

        // Start server again
        server.start();
      });
    } catch (err) {
      loggerHmr.error('Hot Reload failed:', err);
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
          }).then(() => {
          })
            .catch((err) => loggerHmr.error(err.toString()));
        } catch (err) {
          loggerHmr.error(err);
        }
      },
    );
}
