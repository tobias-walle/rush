import { LinkProps, Link } from "../components/link";
import { SetVisibilityFilterAction, setVisibilityFilter } from "../actions/filter";
import { connect } from "react-redux";

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

export const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);
