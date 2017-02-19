import * as React from 'react';
import { shallow, mount } from "enzyme";
import { ArticleDetailComponent } from "./article-detail.component";
import { Article } from "../models/article";

describe('ArticleDetailComponent', () => {
  it('should render', () => {
    expect(shallow(<ArticleDetailComponent/>).exists()).toBeTruthy();
  });

  it('should display article', () => {
    let article = new Article('Test Subject', 'Test Body');
    let wrapper = shallow(<ArticleDetailComponent article={article}/>);

    expect(wrapper.html().includes(article.subject)).toBeTruthy('Subject not rendered');
    expect(wrapper.html().includes(article.body)).toBeTruthy('Body not rendered');
  });

  it('should fetch article on mount', () => {
    let fetchArticle = jasmine.createSpy('fetchArticle');
    mount(<ArticleDetailComponent fetchArticle={fetchArticle}/>);

    expect(fetchArticle).toHaveBeenCalled();
  });
});