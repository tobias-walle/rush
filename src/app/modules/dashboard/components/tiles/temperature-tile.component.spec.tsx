import * as React from 'react';
import { shallow } from 'enzyme';
import { TemperatureTileComponent } from './temperature-tile.component';

describe('TemperatureTileComponent', () => {
  it('should render', () => {
    expect(shallow(<TemperatureTileComponent/>).exists()).toBeTruthy();
  });
});
