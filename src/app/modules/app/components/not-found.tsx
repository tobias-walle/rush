import * as React from 'react';

export interface NotFoundProps {
}

export interface NotFoundState {
}

export class NotFound extends React.Component<NotFoundProps, NotFoundState> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>404 - Site not found</h1>
      </div>
    );
  }
}
