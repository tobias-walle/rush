import * as React from 'react';
import { Article } from '../models/article';

export interface ArticleDetailProps {
  article?: Article;
  downloading?: boolean;
  downloadError?: string;
  fetchArticle?(): void;
}

export class ArticleDetailComponent extends React.Component<ArticleDetailProps, any> {

  componentDidMount() {
    this.props.fetchArticle();
  }

  render(): JSX.Element {
    const {article, downloading, downloadError} = this.props;

    let content: JSX.Element;
    if (article) {
      content = (
        <div>
          <h1>{article.subject}</h1>
          <p>{article.body}</p>
        </div>
      );
    } else {
      if (downloading) {
        content = <p>Loading...</p>;
      } else if (downloadError) {
        content = <p>{downloadError}</p>;
      } else {
        content = <div/>;
      }
    }

    return content;
  }
}
