import * as React from 'react';
import { Store } from 'react-redux';
import { shallow } from 'enzyme';
import { HtmlComponent } from './html.component';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();


describe('HtmlComponent', () => {
  let store: Store<any>;

  beforeEach(() => {
    store = mockStore() as any;
  });

  it('should render', () => {
    expect(shallow(<HtmlComponent store={store}/>).exists()).toBeTruthy();
  });

  it('should render component input', () => {
    let inputComponentText = 'This is a test string';
    let wrapper = shallow(<HtmlComponent store={store} component={<p>{inputComponentText}</p>}/>);

    expect(wrapper.html().indexOf(inputComponentText)).toBeGreaterThan(-1, 'Input Component is not in element.');
  });

  it('should render styles input', () => {
    let inputStyles = ['.test { color: red };'];
    let wrapper = shallow(<HtmlComponent store={store} styles={inputStyles}/>);

    expect(wrapper.html().indexOf(inputStyles[0])).toBeGreaterThan(-1, 'Styles not in element');
  });
});