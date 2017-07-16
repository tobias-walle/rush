import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
import { NotFound } from './not-found';
import { Route, Switch } from 'react-router';

export interface AppProps {
}

export interface AppState {
}

export class App extends React.Component<AppProps, AppState> {
  public render(): JSX.Element {
    return (
      <div>
        <Switch>
          <Route exact={true} path='/' render={() => <p>App works!</p>} />
          <Route render={props => <NotFound />} />
        </Switch>
      </div>
    );
  }
}
