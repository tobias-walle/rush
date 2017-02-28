import * as React from 'react';

import { Route } from 'react-router';
import { BlogComponent } from './blog.component';
import { IndexRoute } from 'react-router';
import { ArticleListContainer } from './container/article-list.container';
import { ArticleDetailContainer } from './container/article-detail.container';
import { ArticleFormContainer } from './container/article-form.container';

export const BlogRoutes = () => (
  <div>
    <Route path='blog' component={BlogComponent}>
      <IndexRoute component={() => (
        <div>
          <h1>Articles</h1>
          <ArticleFormContainer/>
          <ArticleListContainer/>
        </div>
      )}/>
      <Route path='article/:id' component={ArticleDetailContainer}/>
    </Route>
  </div>
);
