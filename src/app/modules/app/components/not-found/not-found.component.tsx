import * as React from 'react';

export interface NotFoundComponentProps {
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
