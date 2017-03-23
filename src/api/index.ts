import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as http from 'http';
const enableWs = require('express-ws');

export class ApiServer {
  private app: any;
  private proxy: any;
  private server: http.Server;

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
      logging?: true,
    } = {},
  ) {
    this.app = express();
    enableWs(this.app);

    this.setupWebSocket();
    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * Setup the middleware
   */
  private setupMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
  }

  /**
   * Setup the api routes.
   */
  private setupRoutes() {
    this.app.all('/*', (req, res) => {
      this.proxy.web(req, res, {
        target: 'http://blynk-cloud.com/',
      });
    });
  }

  private setupWebSocket() {
    this.app.ws('', (ws, req) => {
      console.log('WebSocket Client connected');
      ws.on('message', (data) => {
        console.log('Got data', data);
      });
      ws.on('close', () => {
        console.log('WebSocket Client disconnected');
      });
      ws.on('error', (err) => {
        console.log('WebSocket: ', err);
      });
    });
  }

  /**
   * Start the API Server.
   */
  start() {
    if (this.port !== undefined && this.port !== null) {
      this.server = this.app.listen(this.port, () => {
        console.log(`Api Server is running on ${this.host}:${this.port}/`);
      });
    } else {
      throw Error('The port of the API Server is not defined.');
    }
  }

  /**
   * Stop the API Server
   */
  stop() {
    console.log('Stop API server');
    if (this.server) {
      this.server.close();
    }
  }
}
