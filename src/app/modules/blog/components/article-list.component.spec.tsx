import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ArticleListComponent } from './article-list.component';
import { Article } from '../models/article';

describe('ArticleListComponent', () => {
  it('should render', () => {
    expect(shallow(<ArticleListComponent/>).exists()).toBeTruthy();
  });

  it('should display articles', () => {
    const articles = [
      new Article('Subject 1', 'Body 1'),
      new Article('Subject 2', 'Body 2'),
    ];

    const wrapper = shallow(<ArticleListComponent articles={articles}/>);

    const html = wrapper.html();
    for (const article of articles) {
      expect(html.includes(article.subject)).toBeTruthy('Article subject is not in html');
      expect(html.includes(article.body)).toBeTruthy('Article body is not in html');
    }
  });

  it('should fetch articles if there are not already downloaded.', () => {
    const fetchArticles = jasmine.createSpy('fetchArticles');
    const articlesDownloaded = false;

    mount(
      <ArticleListComponent
        articlesDownloaded={articlesDownloaded}
        fetchArticles={fetchArticles}
      />,
    );

    expect(fetchArticles).toHaveBeenCalled();
  });

  it('should trigger the delete callback', () => {
    const articles = [
      new Article('Subject 1', 'Body 1'),
      new Article('Subject 2', 'Body 2'),
    ];

    const deleteArticle = jasmine.createSpy('deleteArticle');

    const wrapper = mount(
      <ArticleListComponent
        articles={articles}
        deleteArticle={deleteArticle}
      />,
    );

    wrapper.find('.button-delete').first().simulate('click');

    expect(deleteArticle).toHaveBeenCalledWith(articles[0]);
  });
});
