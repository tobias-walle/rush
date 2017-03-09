import { GlobalState } from '../../root';
import { TileProps, TileComponent } from '../components/tile.component';
import { connect } from 'react-redux';
import { Tile } from '../models/tile';

export interface TileContainerProps {
  tile?: Tile;
  componentProps?: any;
}

function mapStateToProps(state: GlobalState, ownProps: TileContainerProps): TileProps {
  let { tile, componentProps } = ownProps;
  return {
    breakpoint: state.browser.breakpoint,
    tile,
    componentProps
  };
}

export const TileContainer = connect(
  mapStateToProps
)(TileComponent);

