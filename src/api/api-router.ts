import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

export class ApiRouter {
  private router: express.Router = express.Router();

  constructor() {
    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * Main route function which will be called by the application.
   * @param request
   * @param response
   * @param next
   */
  route(request: express.Request, response: express.Response, next: express.NextFunction) {
    this.router(request, response, next);
  }

  /**
   * Setup the middleware
   */
  setupMiddleware() {
    this.router.use(bodyParser.json());
    this.router.use(morgan('dev'));
  }

  /**
   * Setup the api routes.
   */
  setupRoutes() {
    // Setup Routes here
    this.router.post('/', (req, res) => {
      res.send('Hello World');
    });
  }

}