import * as React from 'react';
import { NotFound } from './not-found';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';
import { loadGlobalStyles } from '../global-styles';
loadGlobalStyles();

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
