import * as express from 'express';
import * as path from 'path';
import { WebServer } from './webpack-dev-server';

let httpProxy = require('http-proxy');

let proxy = httpProxy.createProxyServer();
let app: express.Application = express();

let isProduction: boolean = process.env.NODE_ENV === 'production';
let host = (process.env.HOST || 'localhost');
let port = isProduction && process.env.PORT !== undefined ? process.env.PORT : 3000;
let publicPath = path.resolve(__dirname + '/../client');

// Provide node modules
app.use('/node_modules', express.static(path.resolve(__dirname + '/../../node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

if (!isProduction) {
    // Create and start the webpack dev server.
    let webpackPort = port + 1;
    let webpackHost = host;

    let webpackDevServer = new WebServer(webpackHost, webpackPort);
    webpackDevServer.start();

    // Send all remaining request to the dev server
    app.all('/*', (req, res) => {
        proxy.web(req, res, {
            target: `http://${webpackHost}:${webpackPort}/`
        })
    });
}

// Provide static files
app.use('/', express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}/`);
});

