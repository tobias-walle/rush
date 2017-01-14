let nextTodoId: number = 0;

export type ADD_TODO = 'ADD_TODO'
export const ADD_TODO: ADD_TODO = 'ADD_TODO';

export type AddTodoAction = {
    type: ADD_TODO,
    id: number,
    text: string,
    completed: boolean
}

export function addTodo(text: string): AddTodoAction {
    return {
        type: ADD_TODO,
        id: nextTodoId++,
        text,
        completed: false
    }
}


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


