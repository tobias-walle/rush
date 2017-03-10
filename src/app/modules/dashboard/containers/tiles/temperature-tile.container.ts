import { GlobalState } from '../../../root';
import {
  TemperatureTileComponentProps,
  TemperatureTileComponent
} from '../../components/tiles/temperature-tile.component';
import { getPinDataIntervalDuck } from '../../dashboard.redux';
import { connect } from 'react-redux';
const dotProp = require('dot-prop-immutable');

export interface TemperatureTileContainerProps {
  apiKey: string;
  pin: string;
  interval?: number;
}

function mapStateToProps(state: GlobalState, ownProps: TemperatureTileContainerProps): TemperatureTileComponentProps {
  const {apiKey, pin} = ownProps;
  const temperature = +dotProp.get(state, `dashboard.connections.${apiKey}.data.${pin}.value.0`);
  return {
    temperature,
  };
}

function mapDispatchToProps(dispatch, ownProps: TemperatureTileContainerProps): TemperatureTileComponentProps {
  const interval = ownProps.interval || 1000;
  return {
    updateTemperature: () => dispatch(getPinDataIntervalDuck({
      ...ownProps,
      interval,
    })),
  };
}

export const TemperatureTileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemperatureTileComponent);
