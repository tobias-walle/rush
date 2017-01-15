import { connect } from "react-redux";
import { LinkProps, LinkComponent } from "../components/link";
import { SetVisibilityFilterAction, setVisibilityFilter } from "../actions/filter";

function mapStateToProps(state: any, ownProps: any): LinkProps {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

function mapDispatchToProps(dispatch: (actions: SetVisibilityFilterAction) => any, ownProps: any): LinkProps {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

export const FilterLinkContainer = connect(mapStateToProps, mapDispatchToProps)(LinkComponent);
