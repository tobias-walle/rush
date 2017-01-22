import * as React from 'react';
import { FilterLinkContainer } from "../containers/filter-link";

export class FooterContainer extends React.Component<void, any> {
    render(): JSX.Element {
        return (
            <p>
                <FilterLinkContainer filter="SHOW_ALL">
                    All
                </FilterLinkContainer>
                <FilterLinkContainer filter="SHOW_ACTIVE">
                    Active
                </FilterLinkContainer>
                <FilterLinkContainer filter="SHOW_COMPLETED">
                    Completed
                </FilterLinkContainer>
            </p>
        )
    }
}