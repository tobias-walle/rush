import * as React from 'react';
import { TodoAppComponent } from "./modules/todo/todo.component";
import { Route } from 'react-router';

export const routes: JSX.Element = (
    <Route path="/" component={TodoAppComponent}/>
);
