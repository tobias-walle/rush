import { AddTodoAction, ADD_TODO, ToggleTodoAction, TOGGLE_TODO } from "../actions/todo";

export type TodoAction =
    AddTodoAction |
        ToggleTodoAction;

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


export type TodosAction =
    AddTodoAction |
        ToggleTodoAction;


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