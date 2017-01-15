import * as React from 'react';
import { FilterLink } from "../container/filter-link";

export class Footer extends React.Component<void, any> {
    render(): JSX.Element {
        return (
            <p>
                <FilterLink filter="SHOW_ALL">
                    All
                </FilterLink>
                <FilterLink filter="SHOW_ACTIVE">
                    Active
                </FilterLink>
                <FilterLink filter="SHOW_COMPLETED">
                    Completed
                </FilterLink>
            </p>
        )
    }
}