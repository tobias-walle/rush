import * as React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux';
import { todoReducer } from './modules/todo/todo.reducer';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routes } from "./routes";
import { WithStylesContext } from "isomorphic-style-loader-utils";
import { DEVELOPMENT, RENDER_CSS_ON_CLIENT } from "./utils/config";

// Load initial state
const initialState = window['__data'];

// Create store
let store: any;
if (DEVELOPMENT) {
    // If not production, activate redux debug tools
    let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;
    store = devtools(createStore)(todoReducer, initialState);
} else {
    store = createStore(todoReducer, initialState);
}

// Main styles
if (RENDER_CSS_ON_CLIENT) {
    require('./styles/main.scss')._insertCss();
}

// Render the app
let AppComponent = () => (
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
);

if (RENDER_CSS_ON_CLIENT) {
    // Add Component style context
    let OldAppComponent = AppComponent;
    AppComponent = () => (
        <WithStylesContext onInsertCss={ styles => styles._insertCss()}>
            <OldAppComponent/>
        </WithStylesContext>
    );
}

render(<AppComponent/>, document.getElementById('container'));
