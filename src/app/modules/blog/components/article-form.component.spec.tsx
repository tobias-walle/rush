import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ArticleFormComponent, ArticleFormValues } from './article-form.component';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

describe('ArticleFormComponent', () => {
  it('should render', () => {
    expect(shallow(<ArticleFormComponent/>).exists()).toBeTruthy();
  });

  it('should run the submit callback', () => {
    let store = mockStore();
    let onSubmit = jasmine.createSpy('onSubmit');
    let wrapper = mount(
      <Provider store={store}>
        <ArticleFormComponent onSubmit={onSubmit}/>
      </Provider>
    );

    wrapper.simulate('submit');
    expect(onSubmit).toHaveBeenCalled();
  });
});