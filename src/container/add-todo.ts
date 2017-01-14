import { AddTodoAction, addTodo } from "../actions/todo";
import { connect } from 'react-redux';
import { AddTodoForm, AddTodoFormProps } from "../components/add-todo-form";

function mapDispatchToProps(dispatch: (action: AddTodoAction) => any): AddTodoFormProps {
    return {
        onSubmit: (text: string) => {
            dispatch(addTodo(text));
        }
    }
}

export const AddTodo = connect(null, mapDispatchToProps)(AddTodoForm);
