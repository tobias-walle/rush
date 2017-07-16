import { loggerFactory } from '../../logging';
import * as express from 'express';
import * as http from 'http';
import * as enableDestroy from 'server-destroy';
import { ApiRouter } from './api-router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishReplay';

const logger = loggerFactory.getLogger('server.api');

export class ApiServer {
  private server: http.Server;
  private router: ApiRouter;

  /**
   * Creates the API Server.
   * @param host The host on which the server should listen.
   * @param port The port on which the server should listen.
   */
  constructor(
    public host: string,
    public port: number
  ) {
    // Setup app
    const app = express();
    this.server = http.createServer(app);
    enableDestroy(this.server);

    // Setup main router
    this.router = new ApiRouter();
    app.use((req, res, next) => {
      this.router.route(req, res, next);
    });
  }

  /**
   * Start the API Server.
   */
  start() {
    if (this.port !== undefined && this.port !== null) {
      this.server.listen(this.port, () => {
        logger.info(`Api Server is running on ${this.host}:${this.port}/`);
      });
    } else {
      throw Error('The port of the API Server is not defined.');
    }
  }

  /**
   * Stop the API Server
   * @return An Observable, which resolves once the server is closed
   */
  stop(): Observable<any> {
    if (this.server) {
      logger.info('Stop API server');
      const closeObservable = Observable.fromEvent(this.server, 'close').publishReplay(1).refCount();
      (this.server as any).destroy();
      return closeObservable;
    } else {
      return Observable.of();
    }
  }
}
