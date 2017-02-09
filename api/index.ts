import * as express from 'express';
import * as morgan from "morgan";

export class ApiServer {
  private app: express.Application;

  /**
   * Creates the API Server.
   * @param host The host on which the server should listen.
   * @param port The port on which the server should listen.
   * @param options Additional options
   */
  constructor(
    public host: string,
    public port: number,
    private options: {
      logging?: true
    } = {}
  ) {
    this.app = express();

    if (options.logging) {
    }

    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * Setup the middleware
   */
  private setupMiddleware() {
    this.app.use(morgan('dev'));
  }

  /**
   * Setup the api routes.
   */
  private setupRoutes() {
    this.app.get('/hello', (req, res) => {
      res.send('World');
    });

  }

  /**
   * Start the API Server.
   */i
  start() {
    if (this.port !== undefined && this.port !== null) {
      this.app.listen(this.port, () => {
        console.log(`Api Server is running on ${this.host}:${this.port}/`)
      });
    } else {
      throw Error('The port of the API Server is not defined.')
    }
  }
}

