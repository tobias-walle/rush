import * as React from 'react';
import { shallow } from 'enzyme';
import { NotFound } from './not-found';

describe('NotFound', () => {
  it('should render', () => {
    expect(shallow(<NotFound/>).exists()).toBeTruthy();
  });
});
