import * as React from 'react';
import { shallow } from 'enzyme';
import { <%=upperCamelCaseName%> } from './<%=name%>.component';

describe('<%=upperCamelCaseName%>', () => {
  it('should render', () => {
    expect(shallow(<<%=upperCamelCaseName%>/>).exists()).toBeTruthy();
  });
});
