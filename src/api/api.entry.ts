import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import '@src/polyfills';
import { loggerFactory } from '../logging';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';

const loggerHmr = loggerFactory.getLogger('server.api.HMR');

let apiServer;
const startServer = async () => {
  const {API_HOST, API_PORT} = await import('@src/config');
  const {ApiServer: NewApiServer} = await import('@api/server/api-server');

  const start = () => {
    apiServer = new NewApiServer(API_HOST, API_PORT);
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
    require.resolve('@src/config'),
    require.resolve('@api/server/api-server'),
  ], async () => {
    loggerHmr.debug('Reload Api Server');
    await startServer();
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

