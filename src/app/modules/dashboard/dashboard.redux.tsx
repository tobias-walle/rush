import { TileSelection } from './models/tile-selection';
import { createReducer, createDuck } from '@tobias-walle/redux-typed-ducks';
import { DashboardConnection } from './models/dashboard-connection';
import { ConnectionData } from './models/connection-data';
import { ApiService, apiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
const dotProp = require('dot-prop-immutable');

export interface DashboardState {
  tiles: TileSelection[];
  connections: {[key: string]: DashboardConnection};
}

const initialState: DashboardState = {
  tiles: [
    new TileSelection('gauge', {
      'apiKey': '01ac3ff7158743c7a95bb1ddb42d964a',
      'pin': 'V0',
      'label': 'Temperature',
      'unit': ' °C',
    }),
    new TileSelection('gauge', {
      'apiKey': '01ac3ff7158743c7a95bb1ddb42d964a',
      'pin': 'V1',
      'label': 'Humidity',
      'unit': ' %',
    }),
    new TileSelection('gauge', {
      'apiKey': '01ac3ff7158743c7a95bb1ddb42d964a',
      'pin': 'V2',
      'label': 'Brightness',
      'unit': ' lx',
    }),
    new TileSelection('gauge', {
      'apiKey': '843c9f83a3674735826a5cb4b760d41b',
      'pin': 'V0',
      'label': 'Volume',
    }),
  ],
  connections: {},
};

// Ducks
// - GET
type GetPinDataPayload = {
  apiKey: string,
  pin: string,
};

const getPinDataReducer = (state: DashboardState, payload: GetPinDataPayload) => {
  const {apiKey, pin} = payload;
  return dotProp.set(state, `connections.${apiKey}.data.${pin}.loading`, true);
};

export const getPinDataDuck = createDuck('iot/dashboard/GET_PIN_DATA', getPinDataReducer);

// -- SUCCESS
type GetPinDataSuccess = {
  apiKey: string,
  pin: string,
  value: any,
};

const getPinDataSuccessReducer = (state: DashboardState, payload: GetPinDataSuccess) => {
  const {apiKey, pin, value} = payload;
  return dotProp.set(state, `connections.${apiKey}.data.${pin}`, (c: ConnectionData) => {
    return {
      ...c,
      loading: false,
      value,
    };
  });
};

export const getPinDataSuccessDuck = createDuck('iot/dashboard/GET_PIN_DATA_SUCCESS', getPinDataSuccessReducer);

// -- Error
type GetPinDataError = {
  apiKey: string,
  pin: string,
  error: string,
};

const getPinDataErrorReducer = (state: DashboardState, payload: GetPinDataError) => {
  const {apiKey, pin, error} = payload;
  return dotProp.set(state, `connections.${apiKey}.data.${pin}`, (c: ConnectionData) => {
    return {
      ...c,
      loading: false,
      error,
    };
  });
};

export const getPinDataErrorDuck = createDuck('iot/dashboard/GET_PIN_DATA_ERROR', getPinDataErrorReducer);

// -- Get Data Interval
type GetPinDataIntervalPayload = {
  apiKey: string,
  pin: string,
  interval: number,
};

const getPinDataIntervalReducer = (state: DashboardState, payload: GetPinDataIntervalPayload) => {
  const {apiKey, pin, interval} = payload;
  return dotProp.set(state, `connections.${apiKey}.data.${pin}.interval`, interval);
};

export const getPinDataIntervalDuck = createDuck('iot/dashboard/GET_PIN_DATA_INTERVAL', getPinDataIntervalReducer);

// Reducer
export const dashboardReducer = createReducer([
  getPinDataDuck,
  getPinDataSuccessDuck,
  getPinDataErrorDuck,
  getPinDataIntervalDuck,
], initialState);

// Epics
export const getPinEpic = ($action, store, api: ApiService = apiService) =>
  $action.ofType(getPinDataDuck.actionType)
    .mergeMap(action =>
      api.get(`/${action.payload.apiKey}/get/${action.payload.pin}`)
        .map(response => getPinDataSuccessDuck({
          apiKey: action.payload.apiKey,
          pin: action.payload.pin,
          value: response.response,
        }))
        .catch(error => {
          return Observable.of(
            getPinDataErrorDuck({
              apiKey: action.payload.apiKey,
              pin: action.payload.pin,
              error: JSON.stringify(error),
            }));
        }),
    );

export const getPinIntervalEpic = ($action) =>
  $action.ofType(getPinDataIntervalDuck.actionType)
    .mergeMap(action => {
      const {apiKey, pin, interval} = action.payload;
      return Observable.interval(interval)
        .map(i => getPinDataDuck({apiKey, pin}));
    });

export const dashboardEpics = combineEpics(
  getPinEpic,
  getPinIntervalEpic,
);
