import * as React from 'react';
const styles = require('./add-todo-form.scss');

export interface AddTodoFormProps {
    onSubmit?: (inputValue: string) => void;
}

export class AddTodoForm extends React.Component<AddTodoFormProps, any> {
    constructor(props: AddTodoFormProps) {
        super(props);
    }

    public render() {
        let input: HTMLInputElement;

        return (
            <div>
                <form
                    className={styles.form}
                    onSubmit={e => this.props.onSubmit(input.value)}>
                    <input
                        className={`${styles.input} input-text font-large`}
                        ref={node => {input = node}}/>
                    <button className='button font-large' type='submit'> Add Todo </button>
                </form>
            </div>
        )
    }
}

