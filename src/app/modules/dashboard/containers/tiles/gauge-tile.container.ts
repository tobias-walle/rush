import { GlobalState } from '../../../root';
import { getPinDataIntervalDuck } from '../../dashboard.redux';
import { connect } from 'react-redux';
import { GaugeTileComponentProps, GaugeTileComponent } from '../../components/tiles/gauge-tile.component';
const dotProp = require('dot-prop-immutable');

export interface GaugeTileContainer {
  apiKey: string;
  pin: string;
  label?: string;
  unit?: string;
  interval?: number;
}

function mapStateToProps(state: GlobalState, ownProps: GaugeTileContainer): GaugeTileComponentProps {
  const {apiKey, unit, pin, label} = ownProps;
  const value = dotProp.get(state, `dashboard.connections.${apiKey}.data.${pin}.value`);
  return {
    label,
    value,
    unit,
  };
}

function mapDispatchToProps(dispatch, ownProps: GaugeTileContainer): GaugeTileComponentProps {
  const interval = ownProps.interval || 2000;
  return {
    updateValue: () => dispatch(getPinDataIntervalDuck({
      ...ownProps,
      interval,
    })),
  };
}

export const GaugeTileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GaugeTileComponent);
