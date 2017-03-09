import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
import { BreakpointDefaultSizeMapping } from '../constants/breakpoint-default-size-mapping';
import { Tile } from '../models/tile';
const styles = require('./tile.component.scss');

export function getTileSize(breakpoint: string, tile: Tile, breakpointMapping = BreakpointDefaultSizeMapping): number {
  if (tile.scales.length <= 0) {
    return null;
  }
  let defaultSize = BreakpointDefaultSizeMapping[breakpoint];
  let scales = tile.scales;
  scales.sort();
  scales.reverse();
  for (let scale of scales) {
    let size = Math.floor(defaultSize * scale);
    if (size <= 12) {
      return size;
    }
  }
  return null;
}


export interface TileProps {
  tile?: Tile;
  componentProps?: any;
  breakpoint?: string;
}

@WithStyles(styles)
export class TileComponent extends React.Component<TileProps, any> {

  render() {
    let props: TileProps = this.props;

    let breakpoint = props.breakpoint;
    let componentProps = props.componentProps;
    let tile = props.tile;
    let Component = tile.Component;

    let classes = ['tile', styles.tile];
    let size = getTileSize(breakpoint, tile);
    if (size) {
      classes.push(`tile-${size}`);
    }

    return (
      <div className={classes.join(' ')}
      >
        <Component {...componentProps}/>
      </div>
    );
  }
}