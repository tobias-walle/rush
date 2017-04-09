import * as React from 'react';
import { shallow } from 'enzyme';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  it('should render', () => {
    expect(shallow(<NotFoundComponent location={null} match={null} history={null}/>).exists()).toBeTruthy();
  });
});
