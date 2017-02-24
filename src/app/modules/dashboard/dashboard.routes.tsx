import * as React from 'react';
import { DashboardComponent } from './dashboard.component';
import { Route } from 'react-router';

export const DashboardRoutes = () => {
  return (
    <div>
      <Route path='dashboard' component={DashboardComponent}>
      </Route>
    </div>
  );
};