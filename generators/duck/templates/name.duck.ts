import { combineEpics } from 'redux-observable';
import { createDuck, createReducer } from 'redux-typed-ducks';

export interface <%= stateClass %> {
}

const initialState: <%= stateClass %> = {};

// Ducks
<%- ducks.join('\n') %>

export const <%= reducer %> = createReducer(
  [
    <%- actionCreators.join(', ') %>
  ], initialState
);

// Epics
export const <%= epic %> = combineEpics(
);
