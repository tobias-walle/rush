import { GlobalState } from '../root';
import { DashboardComponentProps, DashboardComponent } from './dashboard.component';
import { connect } from 'react-redux';
import { connectToApi } from './dashboard.redux';

function mapStateToProps(state: GlobalState): DashboardComponentProps {
  return {
    visibleTileBundles: state.dashboard.tiles,
  };
}

function mapDispatchToProps(dispatch): DashboardComponentProps {
  return {
    onComponentDidMount: () => {
      dispatch(connectToApi());
    }
  };
};

export const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
