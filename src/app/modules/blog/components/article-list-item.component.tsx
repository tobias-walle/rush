import * as React from 'react';
import { Article } from '../models/article';
import { WithStyles } from 'isomorphic-style-loader-utils';
import { Link } from 'react-router';
const styles = require('./article-list-item.component.scss');

export interface ArticleListItemProps {
  article?: Article;
  onDeleteClicked?(article): void;
}

@WithStyles(styles)
export class ArticleListItemComponent extends React.Component<ArticleListItemProps, any> {
  public render(): JSX.Element {
    const {article, onDeleteClicked} = this.props;
    if (article) {
      return (
        <div className={styles['article-list-item']}>
          <Link className='no-style article-link' to={'/blog/article/' + article.id}>
            <h2>{article.subject}</h2>
            <p>{article.body}</p>
          </Link>

          <input
            type='button'
            className={`button-delete ${styles['button-delete-article']}`}
            value='x'
            onClick={() =>
               onDeleteClicked ? onDeleteClicked(article) : null}
          />
        </div>
      );
    } else {
      return (
        <div className={styles['article-list-item']}>
          No Article
        </div>
      );
    }
  }
}
