import { TileMapping } from '../models/tile-mapping';
import { TextComponent } from '../components/text.component';
import { Tile } from '../models/tile';

export const DEFAULT_TILE_BUNDLE_MAPPING: TileMapping = {
  '1': new Tile(
    TextComponent,
    {},
    [2],
  ),
  '2': new Tile(TextComponent),
};