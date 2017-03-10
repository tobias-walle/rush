import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
const styles = require('./gauge-tile.component.scss');

export interface GaugeTileComponentProps {
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  updateValue?(): void;
}

@WithStyles(styles)
export class GaugeTileComponent extends React.Component<GaugeTileComponentProps, {}> {
  componentDidMount() {
    const props = this.props as GaugeTileComponentProps;
    if (props.updateValue) {
      props.updateValue();
    }
  }

  formatValue(value) {
    if (value == null || isNaN(value)) {
      return '-';
    } else {
      return `${Math.floor(value)}`;
    }
  }

  render() {
    const {label, value, min, max} = this.props as GaugeTileComponentProps;

    return (
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{this.formatValue(value)}</div>
      </div>
    );
  };
}
