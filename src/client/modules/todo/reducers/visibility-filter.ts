import { SetVisibilityFilterAction, SET_VISIBILITY_FILTER } from "../actions/filter";

type VisibilityFilterAction = SetVisibilityFilterAction;

export function  visibilityFilter(state: any = 'SHOW_ALL', action: VisibilityFilterAction) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}
