import { connect } from 'react-redux';
import { TodoListProps, TodoListComponent } from "../components/todo-list";
import { ToggleTodoAction, toggleTodo } from "../actions/toggle-todo";
import { Todo } from "../models/todo";

function getVisibleTodos(todos: Todo[], filter: string) {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }
}

function mapStateToProps(state: any): TodoListProps {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

function mapDispatchToProps(dispatch: (action: ToggleTodoAction) => any): TodoListProps {
    return {
        onTodoClick: (id: number) => {
            dispatch(toggleTodo(id));
        }
    }
}

export const VisibleTodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoListComponent);

