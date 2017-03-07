import * as React from 'react';

export interface BlogProps {
}

export class BlogComponent extends React.Component<BlogProps, any> {
  public render(): JSX.Element {
    return (
      <div>
        {this.props['children']}
      </div>
    );
  }
}
