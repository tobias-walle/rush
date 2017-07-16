import * as React from 'react';
import { Store } from 'react-redux';
import { shallow } from 'enzyme';
import { Html } from './html';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

describe('Html', () => {
  let store: Store<any>;

  beforeEach(() => {
    store = mockStore() as any;
  });

  it('should render', () => {
    expect(shallow(<Html store={store}/>).exists()).toBeTruthy();
  });

  it('should render component input', () => {
    const inputText = 'This is a test string';
    const wrapper = shallow(<Html store={store} component={<p>{inputText}</p>}/>);

    expect(wrapper.html().indexOf(inputText)).toBeGreaterThan(-1, 'Input Component is not in element.');
  });

  it('should render styles input', () => {
    const inputStyles = ['.test { color: red };'];
    const wrapper = shallow(<Html store={store} styles={inputStyles}/>);

    expect(wrapper.html().indexOf(inputStyles[0])).toBeGreaterThan(-1, 'Styles not in element');
  });
});
