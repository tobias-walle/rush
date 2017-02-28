import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ArticleListComponent } from './article-list.component';
import { Article } from '../models/article';

describe('ArticleListComponent', () => {
  it('should render', () => {
    expect(shallow(<ArticleListComponent/>).exists()).toBeTruthy();
  });

  it('should display articles', () => {
    let articles = [
      new Article('Subject 1', 'Body 1'),
      new Article('Subject 2', 'Body 2'),
    ];

    let wrapper = shallow(<ArticleListComponent articles={articles}/>);

    let html = wrapper.html();
    for (let article of articles) {
      expect(html.includes(article.subject)).toBeTruthy('Article subject is not in html');
      expect(html.includes(article.body)).toBeTruthy('Article body is not in html');
    }
  });

  it('should fetch articles if there are not already downloaded.', () => {
    let fetchArticles = jasmine.createSpy('fetchArticles');
    let articlesDownloaded = false;

    mount(
      <ArticleListComponent
        articlesDownloaded={articlesDownloaded}
        fetchArticles={fetchArticles}
      />
    );

    expect(fetchArticles).toHaveBeenCalled();
  });

  it('should trigger the delete callback', () => {
    let articles = [
      new Article('Subject 1', 'Body 1'),
      new Article('Subject 2', 'Body 2'),
    ];

    let deleteArticle = jasmine.createSpy('deleteArticle');

    let wrapper = mount(
      <ArticleListComponent
        articles={articles}
        deleteArticle={deleteArticle}
      />
    );

    wrapper.find('.button-delete').first().simulate('click');

    expect(deleteArticle).toHaveBeenCalledWith(articles[0]);
  });
});