import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ArticleFormComponent } from './article-form.component';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

describe('ArticleFormComponent', () => {
  it('should render', () => {
    expect(shallow(<ArticleFormComponent/>).exists()).toBeTruthy();
  });

  it('should run the submit callback', () => {
    const store = mockStore();
    const onSubmit = jasmine.createSpy('onSubmit');
    const wrapper = mount(
      <Provider store={store}>
        <ArticleFormComponent onSubmit={onSubmit}/>
      </Provider>,
    );

    wrapper.simulate('submit');
    expect(onSubmit).toHaveBeenCalled();
  });
});
