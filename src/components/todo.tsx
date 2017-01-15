import { Todo as TodoModel } from "../models/todo";
import * as React from 'react';
import * as classNames from 'classnames';

const styles = require('./todo.scss');

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

        let conditionalClasses = {};
        conditionalClasses[styles.todoCompleted] = todo.completed;

        let className = classNames(styles.todo, conditionalClasses);
        return <p className={className} onClick={onClick}>{todo.text}</p>;
    }
}