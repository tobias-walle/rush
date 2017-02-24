import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { NotFoundComponent } from './components/not-found.component';
import { DashboardRoutes } from './modules/dashboard/dashboard.routes';

export const routes: JSX.Element = (
  <Route path='/'>
    <IndexRedirect to='/dashboard'/>
    {DashboardRoutes()}
    <Route path='*' component={NotFoundComponent}/>
  </Route>
);
