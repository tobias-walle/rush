import * as React from 'react';
import { Article } from "../models/article";
import { ArticleListItemComponent } from "./article-list-item.component";


export interface ArticleListProps {
  articles?: Article[],
  fetchArticles?: () => void,
  deleteArticle?: (article: Article) => void,
}

export class ArticleListComponent extends React.Component<ArticleListProps, any> {

  componentDidMount() {
    this.props.fetchArticles();
  }

  public render(): JSX.Element {
    let { articles, deleteArticle } = this.props;
    return (
      <div>
        {
          articles.map((article) => (
            <ArticleListItemComponent
              key={article.id}
              article={article}
              onDeleteClicked={(article) => deleteArticle(article)}
            />
          ))
        }
      </div>
    )
  }
}