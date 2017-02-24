import * as React from 'react';
import { shallow } from "enzyme";
import { Article } from "../models/article";
import { ArticleListItemComponent } from "./article-list-item.component";

describe('ArticleListItemComponent', () => {
  it('should render', () => {
    expect(shallow(<ArticleListItemComponent/>).exists()).toBeTruthy();
  });

  it('should render Article', () => {
    let article = new Article('Subject 1', 'Body 1');

    let wrapper = shallow(<ArticleListItemComponent article={article}/>);

    let html = wrapper.html();
    expect(html.includes(article.subject)).toBeTruthy('Does not render subject');
    expect(html.includes(article.body)).toBeTruthy('Does not render body');
  });

  it('should trigger delete callback', () => {
    let article = new Article('Subject 1', 'Body 1');
    let deleteArticle = jasmine.createSpy('deleteArticle');

    let wrapper = shallow(
      <ArticleListItemComponent
        article={article}
        onDeleteClicked={deleteArticle}
      />
    );

    wrapper.find('.button-delete').first().simulate('click');
    expect(deleteArticle).toHaveBeenCalled();
  });
});