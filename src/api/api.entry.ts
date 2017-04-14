import '../polyfills';
import { loggerFactory } from '../logging';
import { Observable } from 'rxjs';
require('source-map-support').install();

const loggerHmr = loggerFactory.getLogger('server.api.HMR');

let apiServer;
const startServer = () => {
  const config = require('../config');
  const NewApiServer = require('./api-server').ApiServer;

  const start = () => {
    apiServer = new NewApiServer(config.API_HOST, config.API_PORT);
    apiServer.start();
  };

  if (apiServer) {
    // Reload routes
    apiServer.stop().subscribe(() => {
      start();
    });
  } else {
    start();
  }
};
startServer();

// -- HOT RELOAD SETUP
if (module['hot']) {
  loggerHmr.debug('Hot Module Replacement is activated');
  const hot = module['hot'];
  hot.accept([
    require.resolve('../config'),
    require.resolve('./api-server'),
  ], () => {
    loggerHmr.debug('Reload Api Server');
    startServer();
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

