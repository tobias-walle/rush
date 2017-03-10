import * as React from 'react';

export interface TemperatureTileProps {
  temperature?: number;
}

export class TemperatureTileComponent extends React.Component<TemperatureTileProps, {}> {
  unit = 'C';

  format(temperature, unit = this.unit) {
    return `${temperature}°C`;
  }

  render() {
    const {temperature} = this.props as TemperatureTileProps;
    const styles = require('./temperature-tile.component.scss');
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
