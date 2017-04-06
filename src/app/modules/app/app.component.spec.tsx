import * as React from 'react';
import { shallow } from 'enzyme';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should render', () => {
    expect(shallow(<AppComponent/>).exists()).toBeTruthy();
  });
});
