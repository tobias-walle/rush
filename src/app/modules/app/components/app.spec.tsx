import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from './app';

describe('App', () => {
  it('should render', () => {
    expect(shallow(<App/>).exists()).toBeTruthy();
  });
});
