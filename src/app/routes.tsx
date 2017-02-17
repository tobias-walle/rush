import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { BlogRoutes } from "./modules/blog/blog.routes";
import { NotFoundComponent } from "./components/not-found.component";

export const routes: JSX.Element = (
  <Route path="/">
    <IndexRedirect to="/blog"/>
    {BlogRoutes()}
    <Route path="*" component={NotFoundComponent}/>
  </Route>
);
