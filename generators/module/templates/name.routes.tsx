import * as React from 'react';
import { Route } from 'react-router';
import { <%=upperCamelCaseName%>Component } from './components/<%=name=>/<%=name=>.component';

export const <%=upperCamelCaseName%>Routes = () => (
  <div>
    <Route path='<%=name%>' component={<%=upperCamelCaseName%>Component}/>
  </div>
);
