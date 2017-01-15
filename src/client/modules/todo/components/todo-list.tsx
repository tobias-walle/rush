import * as React from 'react';
import { TodoComponent as TodoComponent } from "./todo";
import { Todo } from "../models/todo";

export interface TodoListProps {
    todos?: Todo[],
    onTodoClick?: (todoId: number) => void,
}

export class TodoListComponent extends React.Component<TodoListProps, any> {

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
