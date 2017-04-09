import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
import { RouteComponentProps } from 'react-router';
const styles = require('./not-found.component.scss');

@WithStyles(styles)
export class NotFoundComponent extends React.Component<RouteComponentProps<any>, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>404 - Site not found</h1>
      </div>
    );
  }
}
