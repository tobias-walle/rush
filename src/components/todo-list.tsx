import { Todo } from "../models/todo";
import * as React from 'react';
import { Todo as TodoComponent } from "./todo";

export interface TodoListProps {
    todos?: Todo[],
    onTodoClick?: (todoId: number) => void,
}

export class TodoList extends React.Component<TodoListProps, any> {

    constructor(props: TodoListProps) {
        super(props);
    }

    public render(): JSX.Element {
        let { todos, onTodoClick } = this.props;
        if (todos.length === 0) {
            return <div></div>
        }

        return (
            <div>
                {todos.map(todo =>
                    <TodoComponent key={todo.id} todo={todo} onClick={() => onTodoClick(todo.id)} />
                )}
            </div>
        )
    }
}
