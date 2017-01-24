import * as React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux';
import { todoReducer } from './modules/todo/todo.reducer';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routes } from "./routes";

// Load initial state
const initialState = window['__data'];

// Create store
let store: any;
if (process.env.NODE_ENV !== 'production') {
    // If not production, activate redux debug tools
    let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;
    store = devtools(createStore)(todoReducer, initialState);
} else {
    store = createStore(todoReducer, initialState);
}

// Render the app
render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>

    , document.getElementById('container')
);
