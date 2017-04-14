require('source-map-support').install();
import '../polyfills';
import { API_HOST, API_PORT, DEVELOPMENT, HOST, PORT, WEBPACK_DEV_HOST, WEBPACK_DEV_PORT } from './config';
import { Observable } from 'rxjs';
import { BackendServer, BackendServerOptions } from './server/backend-server';
import { loggerFactory } from './logging';

const loggerHmr = loggerFactory.getLogger('server.entry.HMR');

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

// -- HOT RELOAD SETUP --
if (DEVELOPMENT && module && module['hot']) {
  const hot = module['hot'];

  // Check for changes in backend server
  loggerHmr.debug('Hot Module Replacement is activated');
  hot.accept([
    require.resolve('./server/backend-server.tsx'),
    require.resolve('./config')
  ], () => {
    loggerHmr.debug('Reload Backend Server');
    try {
      // Create a new server
      const newServer = new BackendServer(options);

      // Stop old server
      server.stopApiServer();
      server.stop();

      // Copy webpack server to the new server
      newServer.webpackDevServer = server.webpackDevServer;

      // Set new server as the primary server
      server = newServer;

      // Start server again
      server.startApiServer();
      server.start();

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
