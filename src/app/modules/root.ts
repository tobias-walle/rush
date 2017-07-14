import { GlobalState } from './root';
import { combineReducers } from 'redux';

import { routerReducer, RouterState } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { AppComponent } from './app/app.component';

// Combine all modules to the global state interface
export interface GlobalState {
  router: RouterState;
}

// Combine the reducers
export const reducer = combineReducers({
  router: routerReducer as any,
} as {[key in keyof GlobalState]: any});

// Combine the epics (redux-observables)
export const epic = combineEpics(
);

// The entry component
export const EntryComponent = AppComponent;
