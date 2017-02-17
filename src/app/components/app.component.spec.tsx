import * as React from 'react';
import { AppComponent } from './app.component';
import { createMemoryHistory } from 'react-router';
import { Store } from "react-redux";
import configureStore from 'redux-mock-store';
const ReactTestUtils = require('react-addons-test-utils');
const mockStore = configureStore();


describe('Component: App', () => {
  it('should render AppComponent', () => {
    const renderer = ReactTestUtils.createRenderer();
    const history = createMemoryHistory(['/']);
    const store: Store<any> = mockStore() as any;

    renderer.render(
      <AppComponent
        store={store}
        history={history}/>);

    let result = renderer.getRenderOutput();

    expect(ReactTestUtils.isElement(result)).toBeTruthy();
  });
});
