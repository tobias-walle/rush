import * as React from "react";
import { Observable } from "rxjs";
import { AppContainer } from "react-hot-loader";
import { DEVELOPMENT } from "./utils/config";
import { BackendServer, BackendServerOptions } from "./server/backend-server";

// Require the backend server again to support hot reloading
let BackendServerConstructor = require("./server/backend-server.tsx").BackendServer;

// Check if this file is executed as a hot reload
let isHotReload = false;
if (module['hot'] && module['hot']['data']) {
  isHotReload = module['hot'].data['reloading'];
}

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
let options: BackendServerOptions = {
  host: HOST,
  port: 3000,
  webpack_dev_host: WEBPACK_DEV_HOST,
  webpack_dev_port: WEBPACK_DEV_PORT,
  api_host: API_HOST,
  api_port: API_PORT,
};
if (isHotReload) {
  options = module['hot']['data']['options'];
  let webpackDevServer = module['hot']['data']['webpackDevServer'];
  // Update class
  server = new BackendServerConstructor(options);
  server.webpackDevServer = webpackDevServer;
}
if (!server) {
  server = new BackendServerConstructor(options);
  if (DEVELOPMENT) {
    server.startWebpackDevServer();
  }
}

server.startApiServer();
server.start();


// -- HOT RELOAD SETUP -- THIS IS STILL EXPERIMENTAL AND MAY HAVE SOME BUGS
if (DEVELOPMENT && module['hot']) {
  const hot = module['hot'];
  hot.accept();
  hot.dispose((data) => {
    BackendServerConstructor = require("./server/backend-server.tsx").BackendServer;
    server.stopApiServer();
    server.stop();
    data['options'] = server.options;
    data['webpackDevServer'] = server.webpackDevServer;
    data['reloading'] = true;
  });
  Observable.interval(1000)
    .filter(() => hot.status() === 'idle')
    .subscribe(() => {
      hot.check((err, outdatedModules) => {
        if (err) {
          console.error(err);
        } else {
          console.log(outdatedModules);
        }
      })
    });
}

