import { TileMapping } from '../models/tile-mapping';
import { Tile } from '../models/tile';
import { TemperatureTileContainer } from '../containers/tiles/temperature-tile.container';

export const DEFAULT_TILE_BUNDLE_MAPPING: TileMapping = {
  'temperature': new Tile(TemperatureTileContainer),
};