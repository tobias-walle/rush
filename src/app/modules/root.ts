import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

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
