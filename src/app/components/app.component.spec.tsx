import * as React from 'react';
import { AppComponent } from './app.component';
import { createMemoryHistory } from 'react-router';
import { Store } from 'react-redux';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('AppComponent', () => {
  it('should render', () => {
    const history = createMemoryHistory(['/'] as any);
    const store: Store<any> = mockStore() as any;

    expect(shallow(
      <AppComponent
        store={store}
        history={history}/>)
      .exists()
    ).toBeTruthy();
  });
});
