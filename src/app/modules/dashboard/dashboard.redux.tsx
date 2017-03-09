import { TileSelection } from './models/tile-selection';

export interface DashboardState {
  tiles: TileSelection[];
}

const initialState: DashboardState = {
  tiles: [
    new TileSelection('1', { 'text': '1' }),
    new TileSelection('2', { 'text': '2' }),
    new TileSelection('2', { 'text': '3' }),
  ],
};

export function dashboardReducer(state: DashboardState = initialState, action: any = {}): DashboardState {
  switch (action.type) {
    default:
      return state;
  }
}
