import * as React from 'react';
import { shallow } from 'enzyme';
import { <%=upperCamelCaseName%>Component } from './<%=name%>.component';

describe('<%=upperCamelCaseName%>Component', () => {
  it('should render', () => {
    expect(shallow(<<%=upperCamelCaseName%>Component/>).exists()).toBeTruthy();
  });
});
