import * as React from 'react';
import { ArticleListContainer } from "./container/article-list.container";
import { ArticleFormContainer } from "./container/article-form-container";


export interface BlogProps {
}

export class BlogComponent extends React.Component<BlogProps, any> {
  public render(): JSX.Element {
    return (
      <div>
        <ArticleFormContainer/>
        <h1>Articles</h1>
        <ArticleListContainer/>
      </div>
    )
  }
}