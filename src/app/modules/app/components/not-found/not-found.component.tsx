import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface NotFoundComponentProps extends RouteComponentProps<any> {
}

export class NotFoundComponent extends React.Component<NotFoundComponentProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>404 - Site not found</h1>
      </div>
    );
  }
}
