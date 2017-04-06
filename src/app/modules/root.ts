import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { AppComponent } from './app/app.component';

// Combine all modules to the global state interface
export interface GlobalState {
  routing: any;
}

// Combine the reducers
export const reducer = combineReducers({
  routing: routerReducer,
});

// Combine the epics (redux-observables)
export const epic = combineEpics(
);

// The entry component
export const EntryComponent = AppComponent;