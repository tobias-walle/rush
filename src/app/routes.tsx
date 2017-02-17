import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { BlogRoutes } from "./modules/blog/blog.routes";

export const routes: JSX.Element = (
  <Route path="/">
    <IndexRedirect to="/blog"/>
    {BlogRoutes()}
  </Route>
);
