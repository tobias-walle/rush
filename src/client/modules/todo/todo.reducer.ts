import { combineReducers } from 'redux';
import { todos } from "./reducers/todos";
import { visibilityFilter } from "./reducers/visibility-filter";
import { todo } from "./reducers/todo";

export const todoReducer = combineReducers({
    todo,
    todos,
    visibilityFilter
});