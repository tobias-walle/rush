import { connect } from 'react-redux';
import { AddTodoAction, addTodo } from "../actions/add-todo";
import { AddTodoFormProps, AddTodoForm } from "../components/add-todo-form";

function mapDispatchToProps(dispatch: (action: AddTodoAction) => any): AddTodoFormProps {
    return {
        onSubmit: (text: string) => {
            dispatch(addTodo(text));
        }
    }
}

export const AddTodoContainer = connect(null, mapDispatchToProps)(AddTodoForm);
