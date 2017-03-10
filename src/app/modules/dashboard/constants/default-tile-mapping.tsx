import { TileMapping } from '../models/tile-mapping';
import { Tile } from '../models/tile';
import { TemperatureTileComponent } from '../components/tiles/temperature-tile.component';

export const DEFAULT_TILE_BUNDLE_MAPPING: TileMapping = {
  'temperature': new Tile(TemperatureTileComponent),
};