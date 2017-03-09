import { GlobalState } from '../root';
import { DashboardComponentProps, DashboardComponent } from './dashboard.component';
import { connect } from 'react-redux';

function mapStateToProps(state: GlobalState): DashboardComponentProps {
  return {
    visibleTileBundles: state.dashboard.tiles,
  };
}

export const DashboardContainer = connect(
  mapStateToProps
)(DashboardComponent);

