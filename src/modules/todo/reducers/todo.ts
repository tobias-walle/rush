import { AddTodoAction, ADD_TODO } from "../actions/add-todo";
import { ToggleTodoAction, TOGGLE_TODO } from "../actions/toggle-todo";

export type TodoAction =
    AddTodoAction | ToggleTodoAction;

export function todo(state: any = [], action: TodoAction): any {
    switch (action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case TOGGLE_TODO:
            if (state.id !== action.id) {
                return state;
            }
            return Object.assign({}, state, {
                completed: !state.completed
            });
        default:
            return state;
    }
}
