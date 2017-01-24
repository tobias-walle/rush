import * as React from 'react';
import { WithStyles } from "isomorphic-style-loader-utils";
const styles = require('./add-todo-form.scss');

export interface AddTodoFormProps {
    onSubmit?: (inputValue: string) => void;
}

@WithStyles(styles)
export class AddTodoForm extends React.Component<AddTodoFormProps, any> {
    constructor(props: AddTodoFormProps, context) {
        super(props);
        console.log('Got', context);
    }

    public render() {
        let input: HTMLInputElement;

        return (
            <div>
                <form
                    className={styles.form}
                    onSubmit={e => {
                        this.props.onSubmit(input.value);
                        input.value = '';
                        e.preventDefault();
                    }}>
                    <input
                        className={`${styles.input} input-text font-large`}
                        ref={node => {input = node}}/>
                    <button className='button font-large' type='submit'> Add Todo</button>
                </form>
            </div>
        )
    }
}

