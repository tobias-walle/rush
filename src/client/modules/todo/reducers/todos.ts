import { AddTodoAction, ADD_TODO } from "../actions/add-todo";
import { TodoAction, todo } from "./todo";
import { ToggleTodoAction, TOGGLE_TODO } from "../actions/toggle-todo";

export type TodosAction =
    AddTodoAction | ToggleTodoAction;


export function todos(state: any = [], action: TodoAction): any {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(undefined, action),
            ];
        case TOGGLE_TODO:
            return state.map((t: any) => {
                return todo(t, action)
            });
        default:
            return state;
    }
}