import * as React from 'react';
import { LogoComponent } from './components/logo.component';
import { TileMapping } from './models/tile-mapping';
import { DEFAULT_TILE_BUNDLE_MAPPING } from './constants/default-tile-mapping';
import { TileContainer } from './containers/tile.container';
import { TileSelection } from './models/tile-selection';

export class DashboardComponentProps {
  tileMapping?: TileMapping;
  visibleTileBundles?: TileSelection[];
}

export class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
  render() {
    let {tileMapping, visibleTileBundles} = this.props as DashboardComponentProps;
    tileMapping = tileMapping || DEFAULT_TILE_BUNDLE_MAPPING;
    visibleTileBundles = visibleTileBundles || [];
    return (
      <div>
        <LogoComponent/>
        <div className='grid-container'>
          {
            visibleTileBundles
              .map(selection => {
                  const tile = tileMapping[selection.tileKey];
                  if (!tile) {
                    console.warn(`"${selection.tileKey}" does not exists in tile mapping.`);
                    return null;
                  }
                  const props = {
                      ...tile.componentProps,
                      ...selection.props,
                    };
                  return (
                      <TileContainer
                        key={selection.key}
                        tile={tile}
                        componentProps={props}
                      />
                    );
                },
              )
          }
        </div>
      </div>
    );
  }
}
