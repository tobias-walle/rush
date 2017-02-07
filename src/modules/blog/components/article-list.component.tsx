import * as React from 'react';
import { Article } from "../models/article";
import { ArticleListItemComponent } from "./article-list-item.component";


export interface ArticleListProps {
  articles: Article[]
}

export class ArticleListComponent extends React.Component<ArticleListProps, any> {
  public render(): JSX.Element {
    let articles = this.props.articles;
    return (
      <div>
        {
          articles.map((article) => (
            <ArticleListItemComponent key={article.id} article={article}/>
          ))
        }
      </div>
    )
  }
}