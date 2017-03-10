import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
const styles = require('./temperature-tile.component.scss');

export interface TemperatureTileComponentProps {
  temperature?: number;
  updateTemperature?(): void;
}

@WithStyles(styles)
export class TemperatureTileComponent extends React.Component<TemperatureTileComponentProps, {}> {
  unit = 'C';

  format(temperature, unit = this.unit) {
    return `${temperature.toFixed(1)}°C`;
  }

  componentDidMount() {
    const props = this.props as TemperatureTileComponentProps;
    if (props.updateTemperature) {
      props.updateTemperature();
    }
  }

  render() {
    const {temperature} = this.props as TemperatureTileComponentProps;
    const label = 'Bad Homburg';
    let message: string;

    if (temperature == null) {
      message = this.format('-');
    } else {
      message = this.format(temperature);
    }
    return (
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div className={styles.temperature}>{message}</div>
      </div>
    );
  };
}
