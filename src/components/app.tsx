import * as React from 'react';
import { AddTodo } from "../container/add-todo";
import { VisibleTodoList } from "../container/visible-todo-list";
import { Footer } from "./footer";

export interface AppProps {

}

export class App extends React.Component<AppProps, any> {
    constructor(props: AppProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div>
                <AddTodo/>
                <VisibleTodoList/>
                <Footer/>
            </div>
        )
    }
}