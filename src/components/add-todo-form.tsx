import * as React from 'react';

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
                <form onSubmit={e => this.props.onSubmit(input.value)}>
                    <input ref={node => {input = node}}/>
                    <button type="submit"> Add Todo </button>
                </form>
            </div>
        )
    }
}

