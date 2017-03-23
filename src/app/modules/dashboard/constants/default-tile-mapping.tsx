import { TileMapping } from '../models/tile-mapping';
import { Tile } from '../models/tile';
import { GaugeTileContainer } from '../containers/tiles/gauge-tile.container';

export const DEFAULT_TILE_BUNDLE_MAPPING: TileMapping = {
  'gauge': new Tile(GaugeTileContainer),
};