import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
const styles = require('./logo.component.scss');

@WithStyles(styles)
export class LogoComponent extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.logo}>
        <span className={styles['logo-main']}>IoT</span>
        <sup className={styles['logo-sub']}>Dashboard</sup>
      </div>
    );
  }
}
