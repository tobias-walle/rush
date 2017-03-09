import { Action } from 'redux';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { getBreakpoint } from './utils/breakpoints';

let browserWindow = null;
if (typeof window !== 'undefined') {
  browserWindow = window;
}

export interface BrowserState {
  windowWidth?: number;
  windowSizeListenerStarted?: boolean;
  breakpoint?: string;
}

const initialState: BrowserState = {
  windowSizeListenerStarted: false
};

// Actions
export const START_WINDOW_SIZE_LISTENER = 'iot/browser/START_WINDOW_SIZE_LISTENER';
export const WINDOW_SIZE_CHANGE = 'iot/browser/WINDOW_SIZE_CHANGE';
export const SET_WINDOW_WIDTH = 'iot/browser/SET_WINDOW_WIDTH';

// Action payload type
export interface WindowSizeChangeAction extends Action {
}

export interface SetWindowWidthAction extends Action {
  windowWidth: number;
  breakpoint: string;
}

export interface StartWindowSizeListenerAction extends Action {
  windowSizeListenerStarted: boolean;
}

// Reducer
export function browserReducer(state: BrowserState = initialState, action: any = {}): BrowserState {
  switch (action.type) {
    case WINDOW_SIZE_CHANGE:
      return state;
    case SET_WINDOW_WIDTH:
      return {
        ...state,
        windowWidth: action.windowWidth,
        breakpoint: action.breakpoint
      };
    case START_WINDOW_SIZE_LISTENER:
      return {
        ...state,
        windowSizeListenerStarted: action.windowSizeListenerStarted
      };
    default:
      return state;
  }
}


// Action Creators
export function windowSizeChange(): WindowSizeChangeAction {
  return {
    type: WINDOW_SIZE_CHANGE
  };
}

export function setWindowWidth(windowWidth: number): SetWindowWidthAction {
  let breakpoint = getBreakpoint(windowWidth);
  return {
    type: SET_WINDOW_WIDTH,
    windowWidth,
    breakpoint,
  };
}

export function startWindowSizeListener(): StartWindowSizeListenerAction {
  return {
    type: START_WINDOW_SIZE_LISTENER,
    windowSizeListenerStarted: true
  };
}


// Epics
export const windowSizeChangeEpic = (action$, store, w: Window = browserWindow) =>
  action$.ofType(WINDOW_SIZE_CHANGE)
    .mergeMap(action => w ? Observable.of(setWindowWidth(w.innerWidth)) : Observable.empty());

export const startWindowSizeListenerEpic = (action$, store, w: Window = browserWindow) =>
  action$.ofType(START_WINDOW_SIZE_LISTENER)
    .flatMap(action => w ? Observable.fromEvent(w, 'resize') : Observable.empty())
    .map(e => windowSizeChange())
  ;

export const browserEpic = combineEpics(
  windowSizeChangeEpic,
  startWindowSizeListenerEpic
);

