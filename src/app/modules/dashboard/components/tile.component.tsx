import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
import { BreakpointDefaultSizeMapping } from '../constants/breakpoint-default-size-mapping';
import { Tile } from '../models/tile';
const styles = require('./tile.component.scss');

export function getTileSize(breakpoint: string, tile: Tile, breakpointMapping = BreakpointDefaultSizeMapping): number {
  if (tile.scales.length <= 0) {
    return null;
  }
  const defaultSize = BreakpointDefaultSizeMapping[breakpoint];
  const scales = tile.scales;
  scales.sort();
  scales.reverse();
  for (const scale of scales) {
    const size = Math.floor(defaultSize * scale);
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
    const props: TileProps = this.props;

    const breakpoint = props.breakpoint;
    const componentProps = props.componentProps;
    const tile = props.tile;
    const Component = tile.Component;

    const classes = ['tile', styles.tile];
    const size = getTileSize(breakpoint, tile);
    if (size) {
      classes.push(`tile-${size}`);
    }

    return (
      <div className={classes.join(' ')}>
        <Component {...componentProps}/>
      </div>
    );
  }
}