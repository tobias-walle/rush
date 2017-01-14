import { combineReducers } from 'redux';
import { todos } from './todo';
import { visibilityFilter } from './visibility-filter';

export const todoApp = combineReducers({
    todos,
    visibilityFilter
});