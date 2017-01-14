import { TodoListProps, TodoList } from "../components/todo-list";
import { Todo } from "../models/todo";
import { toggleTodo, ToggleTodoAction } from "../actions/todo";
import { connect } from 'react-redux';

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

export const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);

