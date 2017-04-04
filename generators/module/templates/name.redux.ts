import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

export interface <%=upperCamelCaseName%>State {
}

export const <%=camelCaseName%>blogReducer = combineReducers(
);

export const <%=camelCaseName%>blogEpic = combineEpics(
);
