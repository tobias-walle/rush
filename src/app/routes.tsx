import * as React from 'react';
import { Route } from 'react-router';
import { BlogComponent } from "./modules/blog/blog.component";

export const routes: JSX.Element = (
    <Route path="/" component={BlogComponent}/>
);
