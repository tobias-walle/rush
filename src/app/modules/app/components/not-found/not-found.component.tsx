import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class NotFoundComponent extends React.Component<RouteComponentProps<any>, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>404 - Site not found</h1>
      </div>
    );
  }
}
