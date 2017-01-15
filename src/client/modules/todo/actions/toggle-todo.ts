export type TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_TODO: TOGGLE_TODO = 'TOGGLE_TODO';

export type ToggleTodoAction = {
    type: TOGGLE_TODO,
    id: number
}

export function toggleTodo(id: number): ToggleTodoAction {
    return {
        type: TOGGLE_TODO,
        id
    }
}


