import { TileSelection } from './models/tile-selection';

export interface DashboardState {
  tiles: TileSelection[];
}

const initialState: DashboardState = {
  tiles: [
    new TileSelection('temperature', { 'temperature': 10 }),
  ],
};

export function dashboardReducer(state: DashboardState = initialState, action: any = {}): DashboardState {
  switch (action.type) {
    default:
      return state;
  }
}
