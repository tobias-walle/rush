import * as React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux';

import { todoApp } from "./reducers/index";
import { Provider } from "react-redux";
import { App } from "./components/app";

let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f:any)=>f;
let store: any = devtools(createStore)(todoApp);

import './styles/main.scss';

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('container')
);
