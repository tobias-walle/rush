import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Switch, Route } from 'react-router';
const styles = require('./app.component.scss');

@WithStyles(styles)
export class AppComponent extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Switch>
          <Route exact={true} path='/'>
            <p>AppComponent works!</p>
          </Route>
          <Route component={NotFoundComponent}/>
        </Switch>
      </div>
    );
  }
}
