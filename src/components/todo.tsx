import { Todo as TodoModel } from "../models/todo";
import * as React from 'react';

export interface TodoProps {
    key: number,
    todo: TodoModel,
    onClick: () => void,
}

export class Todo extends React.Component<TodoProps, any> {
    constructor(props: TodoProps) {
        super(props);
    }

    render(): JSX.Element {
        let {todo, onClick} = this.props;
        return <p onClick={onClick}>{todo.text}</p>;
    }
}