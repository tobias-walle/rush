import { combineEpics } from 'redux-observable';
import {<%- ducks.length > 0 ? ' createDuck,' : ''%> createReducer } from 'redux-typed-ducks';

export interface <%= stateClass %> {
}

const initialState: <%= stateClass %> = {};

// Ducks
<% if(ducks.length > 0) { %>
<%- ducks.join('\n') %>
<% } -%>
export const <%= reducer %> = createReducer(
  [<%- actionCreators.join(', ') %>], initialState
);

// Epics
export const <%= epic %> = combineEpics(
);
