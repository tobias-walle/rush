import {
  articleReducer, addArticle, ArticleState, addArticleSucceded, addArticleFailed,
  addArticleEpic, loadArticle, loadArticleSucceded, loadArticleFailed, loadArticleEpic
} from "./article.redux";
import { Observable } from "rxjs";
import { ActionsObservable } from "redux-observable";


describe('ArticleRedux', () => {

  describe('ADD...', () => {
    it('should handle ADD', () => {
      // Should not change the state
      expect(articleReducer({}, addArticle({
        id: 'test',
        subject: 'subject',
        body: 'body'
      }))).toEqual({});
    });

    it('should handle ADD_SUCCESS', () => {
      let article = {
        id: 'test',
        subject: 'subject',
        body: 'body'
      };
      let initialState: ArticleState = {
        articles: [],
      };
      let expectedState: ArticleState = {
        articles: [
          article
        ],
        articleAddError: null,
      };
      expect(articleReducer(initialState, addArticleSucceded(article)))
        .toEqual(expectedState);
    });

    it('should handle ADD_FAILED', () => {
      let error = 'An error';
      let initialState: ArticleState = {};
      let expectedState: ArticleState = {
        articleAddError: error,
      };
      expect(articleReducer(initialState, addArticleFailed(error)))
        .toEqual(expectedState);
    });

    it('should trigger epic on success', (done) => {
      let article = {
        id: 'id',
        subject: 'subject',
        body: 'body'
      };
      let apiMock: any = {
        put: () => Observable.of({
          status: 201,
          response: article
        })
      };
      let expectedAction = addArticleSucceded(article);
      addArticleEpic(ActionsObservable.of(addArticle(article)), {}, apiMock)
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        })
    })
  });


  describe('LOAD...', () => {
    it('should handle LOAD', () => {
      let expectedState: ArticleState = {
        selectedArticle: null,
        getArticleSuccess: false,
        getArticleError: null
      };
      expect(articleReducer({}, loadArticle('id'))).toEqual(
        expectedState
      );
    });

    it('should handle LOAD_SUCCESS', () => {
      let article = {
        id: 'test',
        subject: 'subject',
        body: 'body'
      };
      let expectedState: ArticleState = {
        selectedArticle: article,
        getArticleSuccess: true,
        getArticleError: null,
      };
      expect(articleReducer({}, loadArticleSucceded(article)))
        .toEqual(expectedState);
    });

    it('should handle LOAD_FAILED', () => {
      let error = 'An error';
      let expectedState: ArticleState = {
        selectedArticle: null,
        getArticleSuccess: false,
        getArticleError: error
      };
      expect(articleReducer({}, loadArticleFailed(error)))
        .toEqual(expectedState);
    });

    it('should trigger epic on load', (done) => {
      let article = {
        id: 'id',
        subject: 'subject',
        body: 'body'
      };
      let apiMock: any = {
        get: () => Observable.of({
          status: 200,
          response: article
        })
      };
      let expectedAction = loadArticleSucceded(article);
      loadArticleEpic(
        ActionsObservable.of(loadArticle(article.id)), {}, apiMock
      )
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        })
    })
  });
});