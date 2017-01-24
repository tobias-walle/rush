import * as React from 'react';
import { FooterContainer } from "./components/footer";
import { VisibleTodoListContainer } from "./containers/visible-todo-list";
import { AddTodoContainer } from "./containers/add-todo";

export class TodoAppComponent extends React.Component<void, any> {

    constructor(...args) {
        super(...args);
    }

    render(): JSX.Element {
        return (
            <div>
                <AddTodoContainer/>
                <VisibleTodoListContainer/>
                <FooterContainer/>
            </div>
        )
    }

}