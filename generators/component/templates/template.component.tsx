import * as React from 'react';

export interface <%=upperCamelCaseName%>ComponentProps {
}

export interface <%=upperCamelCaseName%>ComponentState {
}

export class <%=upperCamelCaseName%>Component extends React.Component<<%=upperCamelCaseName%>ComponentProps, <%=upperCamelCaseName%>ComponentState> {
  public render(): JSX.Element {
    return (
      <div><%=upperCamelCaseName%>Component works!</div>
    );
  }
}
