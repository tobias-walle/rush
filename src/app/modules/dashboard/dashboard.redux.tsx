import { TileSelection } from './models/tile-selection';

export interface DashboardState {
  tiles: TileSelection[];
}

const initialState: DashboardState = {
  tiles: [
    new TileSelection('1', { 'text': '1' }),
    new TileSelection('2', { 'text': '2' }),
    new TileSelection('2', { 'text': '3' }),
    new TileSelection('1', { 'text': '4' }),
    new TileSelection('2', { 'text': '5' }),
    new TileSelection('2', { 'text': '6' }),
    new TileSelection('2', { 'text': '7' }),
    new TileSelection('1', { 'text': '8' }),
    new TileSelection('1', { 'text': '9' }),
  ],
};

export function dashboardReducer(state: DashboardState = initialState, action: any = {}): DashboardState {
  switch (action.type) {
    default:
      return state;
  }
}
