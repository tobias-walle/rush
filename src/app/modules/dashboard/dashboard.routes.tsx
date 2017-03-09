import * as React from 'react';
import { Route } from 'react-router';
import { DashboardContainer } from './dashboard.container';

export const DashboardRoutes = () => {
  return (
    <div>
      <Route path='dashboard' component={DashboardContainer}>
      </Route>
    </div>
  );
};