import { GlobalState } from '../../../root';
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
  return {};
}

export const GaugeTileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GaugeTileComponent);
