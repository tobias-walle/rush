import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
const styles = require('./app.component.scss');

export interface AppProps {
}

@WithStyles(styles)
export class AppComponent extends React.Component<AppProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        AppComponent works!
      </div>
    );
  }
}
