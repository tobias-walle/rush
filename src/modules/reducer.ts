import { combineReducers } from 'redux';

import { BlogState, blogState } from "./blog/blog.redux";
import { reducer as formReducer } from 'redux-form';

// Combine all modules to the global state interface
export interface GlobalState {
  form: any,
  blogState: BlogState
}

// Combine the reducers
export const reducer = combineReducers({
  form: formReducer,
  blogState,
});
