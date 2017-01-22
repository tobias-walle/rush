export type SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const SET_VISIBILITY_FILTER: SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export type SetVisibilityFilterAction = {
    type: SET_VISIBILITY_FILTER,
    filter: string
}

export function setVisibilityFilter(filter: string): SetVisibilityFilterAction {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    }
}
