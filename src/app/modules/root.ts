import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { browserEpic, BrowserState, browserReducer } from './browser/browser.redux';
import { DashboardState, dashboardReducer } from './dashboard/dashboard.redux';

// Combine all modules to the global state interface
export interface GlobalState {
  form: any;
  routing: any;
  browser: BrowserState;
  dashboard: DashboardState;
}

// Combine the reducers
export const reducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  browser: browserReducer,
  dashboard: dashboardReducer,
});

// Combine the epics (redux-observables)
export const epic = combineEpics(
  browserEpic,
);
