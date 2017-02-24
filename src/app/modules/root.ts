import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from "redux-observable";

// Combine all modules to the global state interface
export interface GlobalState {
  form: any,
  routing: any,
}

// Combine the reducers
export const reducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
});

// Combine the epics (redux-observables)
export const epic = combineEpics(
);
