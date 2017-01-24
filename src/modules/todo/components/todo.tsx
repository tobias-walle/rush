import * as React from 'react';
import * as classNames from 'classnames';
import { Todo } from "../models/todo";
import { WithStyles } from "isomorphic-style-loader-utils";

const styles = require('./todo.scss');

export interface TodoProps {
    key: number,
    todo: Todo,
    onClick: () => void,
}

@WithStyles(styles)
export class TodoComponent extends React.Component<TodoProps, any> {
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