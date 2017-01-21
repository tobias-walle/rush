import * as React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux';

import { TodoAppComponent } from './modules/todo/todo.component';
import { todoReducer } from './modules/todo/todo.reducer';

import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f;
let store: any = devtools(createStore)(todoReducer);

import './styles/main.scss';

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={TodoAppComponent}/>
        </Router>
    </Provider>

    , document.getElementById('container')
);
