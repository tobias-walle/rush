import * as React from 'react';
import { LogoComponent } from './components/logo.component';
import { TileComponent } from './components/tile.component';
import { WithStyles } from 'isomorphic-style-loader-utils';
const styles = require('./dashboard.component.scss');

@WithStyles(styles)
export class DashboardComponent extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <LogoComponent/>
        <TileComponent/>
        <TileComponent/>
        <TileComponent/>
        <TileComponent/>
        <TileComponent/>
      </div>
    );
  }
}
