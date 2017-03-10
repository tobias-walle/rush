import { TileMapping } from '../models/tile-mapping';
import { Tile } from '../models/tile';
import { TemperatureTileContainer } from '../containers/tiles/temperature-tile.container';
import { GaugeTileContainer } from '../containers/tiles/gauge-tile.container';

export const DEFAULT_TILE_BUNDLE_MAPPING: TileMapping = {
  'temperature': new Tile(TemperatureTileContainer),
  'gauge': new Tile(GaugeTileContainer),
};