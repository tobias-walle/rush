import * as React from 'react';
import { Article } from '../models/article';
import { ArticleListItemComponent } from './article-list-item.component';

export interface ArticleListProps {
  articles?: Article[];
  articlesDownloaded?: boolean;
  fetchArticles?(): void;
  deleteArticle?(article: Article): void;
}

export class ArticleListComponent extends React.Component<ArticleListProps, any> {

  componentDidMount() {
    if (!this.props.articlesDownloaded && this.props.fetchArticles) {
      this.props.fetchArticles();
    }
  }

  public render(): JSX.Element {
    const { deleteArticle} = this.props;
    // Is undefined, set array to an empty array
    const articles = this.props.articles || [];
    return (
      <div>
        {
          articles.map((article) => (
            <ArticleListItemComponent
              key={article.id}
              article={article}
              onDeleteClicked={(articleToDelete) => deleteArticle(articleToDelete)}
            />
          ))
        }
      </div>
    );
  }
}
