import { TileSelection } from './models/tile-selection';
import { createDuck, createReducer } from 'redux-typed-ducks';
import { DashboardConnection } from './models/dashboard-connection';
import { ApiService, apiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

export interface DashboardState {
  tiles: TileSelection[];
  connections: {[key: string]: DashboardConnection};
  webSocketConnecting?: boolean;
  webSocketConnected?: boolean;
  webSocketConnectionError?: string;
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

export const connectToApi = createDuck(
  'iot/dashboard/CONNECT_TO_API',
  (state: DashboardState) => {
    return {
      ...state,
      webSocketConnecting: true,
    };
  },
);

export const connectedToApi = createDuck(
  'iot/dashboard/CONNECTED_TO_API',
  (state: DashboardState) => {
    return {
      ...state,
      webSocketConnecting: false,
      webSocketConnected: true,
    };
  },
);

export const connectionToApiFailed = createDuck(
  'iot/dashboard/CONNECTION_TO_API_FAILED',
  (state: DashboardState, payload: {error: string}) => {
    return {
      ...state,
      webSocketConnecting: false,
      webSocketConnectionError: payload.error
    };
  },
);

export const dashboardReducer = createReducer([
  connectToApi,
  connectedToApi,
  connectionToApiFailed,
], initialState);

export const dataReceived = createDuck(
  'iot/dashboard/DATA_RECEIVED',
  (state: DashboardState) => {
    return state;
  },
);

export const $connectToApiEpic = ($action, store, api: ApiService = apiService) =>
  $action.ofType(connectToApi.actionType)
    .mergeMap(action => {
        return Observable.of(api.connect())
          .map(connectedToApi)
          .catch(e => Observable.of(connectionToApiFailed({
            error: e.toString()
        })));
      }
    );

export const $connectedToApiEpic = ($action, store, api: ApiService = apiService) =>
  $action.ofType(connectedToApi.actionType)
    .switchMap(action => api.getMessageObservable())
    .map(d => dataReceived(d));

export const dashboardEpics = combineEpics(
  $connectToApiEpic,
  $connectedToApiEpic,
);
