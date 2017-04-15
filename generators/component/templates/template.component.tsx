import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
const styles = require('./<%=name%>.component.scss');

export interface <%=upperCamelCaseName%>ComponentProps {
}

@WithStyles(styles)
export class <%=upperCamelCaseName%>Component extends React.Component<<%=upperCamelCaseName%>ComponentProps, {}> {
  public render(): JSX.Element {
    return (
      <div><%=upperCamelCaseName%>Component works!</div>
    );
  }
}
