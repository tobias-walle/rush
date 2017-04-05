import * as React from 'react';
import { Store } from 'redux';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

export interface ServerWrapperComponentProps {
  store: Store<any>;
  url: string;
  context: any;
  children?: any;
}

export const ServerWrapperComponent = (props: ServerWrapperComponentProps) => {
  const {store, url} = props;
  const context = props.context || {};

  return (
    <Provider store={store}>
      <StaticRouter
        location={url}
        context={context}
      >
        {props.children}
      </StaticRouter>
    </Provider>
  );
};