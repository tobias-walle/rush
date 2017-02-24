import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
const styles = require('./tile.component.scss');

export class TileProps {
  component?: React.Component<any, any>;
  height?: number = 1;
  width?: number = 1;
}

@WithStyles(styles)
export class TileComponent extends React.Component<TileProps, any> {
  render() {
    return (
      <div className={styles.tile}></div>
    );
  }
}