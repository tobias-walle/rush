import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import { WebServer } from './server/webpack-dev-server';
import { match } from 'react-router';
import { routes } from './routes';
import { MatchState } from 'react-router/lib/match';
import { Location } from 'history';
import { renderToString } from "react-dom/server";
import { HtmlComponent } from "./components/html-component";
import { createStore } from "redux";
import { todoReducer } from "./modules/todo/todo.reducer";
import { Provider } from "react-redux";
import { Router, createMemoryHistory } from "react-router";
import { WithStylesContext } from "isomorphic-style-loader-utils";
import { RENDER_CSS_ON_CLIENT } from "./utils/config";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Fix dirname
let rootDir = path.resolve();

let httpProxy = require('http-proxy');

let proxy = httpProxy.createProxyServer();
let app: express.Application = express();

let isProduction: boolean = process.env.NODE_ENV === 'production';
let host = (process.env.HOST || 'localhost');
let port = isProduction && process.env.PORT !== undefined ? process.env.PORT : 3000;
let publicPath = path.resolve(rootDir + '/dist/client');


if (!isProduction) {
    // Create and start the webpack dev server.
    let webpackPort = port + 1;
    let webpackHost = host;

    let webpackDevServer = new WebServer(webpackHost, webpackPort);
    webpackDevServer.start();

    // Send all remaining request to the dev server
    app.all('/dist/*', (req, res) => {
        proxy.web(req, res, {
            target: `http://${webpackHost}:${webpackPort}/`
        })
    });
}

// Provide static files under dist
app.use('/dist', express.static(publicPath));

// Send AppComponent if route is matching
app.use((req, res) => {
    match({routes, location: req.originalUrl}, (error: any, nextLocation: Location, nextState: MatchState) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (nextLocation) {
            res.redirect(302, nextLocation.pathname + nextLocation.search);
        } else if (nextState) {
            let initialState = {};

            let store = createStore(todoReducer, initialState);
            let history = createMemoryHistory();

            // Prepare app
            let AppComponent = () => (
                <Provider store={store}>
                    <Router history={history} routes={routes}/>
                </Provider>
            );

            let css: string[] = [];
            if (!RENDER_CSS_ON_CLIENT) {
                // Load main styles as string
                let mainStyles = require('./styles/main.scss');

                // Wrap app with style context
                let OldAppComponent = withStyles(mainStyles)(AppComponent);
                AppComponent = () => (
                    <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
                        <OldAppComponent/>
                    </WithStylesContext>
                )
            }

            res.status(200).send(renderToString(
                <HtmlComponent store={store} component={<AppComponent/>} styles={css}/>
            ));
        } else {
            res.status(404).send('Not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}/`);
});

