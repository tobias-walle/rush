import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { combineEpics } from "redux-observable";
import { blogReducer, blogEpic, BlogState } from "./blog/blog.redux";

// Combine all modules to the global state interface
export interface GlobalState {
  form: any,
  routing: any,

  // Modules
  blog: BlogState
}

// Combine the reducers
export const reducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  blog: blogReducer,
});

// Combine the epics (redux-observables)
export const epic = combineEpics(
  blogEpic,
);

