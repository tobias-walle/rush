import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import '@src/polyfills';
import { Observable } from 'rxjs';
import { UIServer, UIServerOptions } from '@app/server/ui-server';
import { loggerFactory } from '@src/logging';
import * as config from '@src/config';

const loggerHmr = loggerFactory.getLogger('server.HMR');

// Start Server
let server: UIServer;
let options: UIServerOptions;
const updateOptions = async () => {
  const { HOST, PORT, WEBPACK_DEV_HOST, WEBPACK_DEV_PORT, API_HOST, API_PORT } = await import('@src/config');
  options = {
    host: HOST,
    port: PORT,
    webpackDevHost: WEBPACK_DEV_HOST,
    webpackDevPort: WEBPACK_DEV_PORT,
    apiHost: API_HOST,
    apiPort: API_PORT,
  };
};

(async () => {

  await updateOptions();
  server = new UIServer(options);
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
      require.resolve('@src/polyfills'),
      require.resolve('@app/server/ui-server.tsx'),
      require.resolve('@src/config')
    ], async () => {
      loggerHmr.debug('Reload Backend Server');
      try {
        // Create a new server
        updateOptions();
        const { UIServer: NewUIServer } = await import('@app/server/ui-server');
        const newServer = new NewUIServer(options);

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
})();