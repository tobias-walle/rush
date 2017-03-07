import {
  articleReducer, addArticle, ArticleState, addArticleSucceded, addArticleFailed,
  addArticleEpic, loadArticle, loadArticleSucceded, loadArticleFailed, loadArticleEpic, deleteArticle,
  deleteArticleSucceded, deleteArticleFailed, deleteArticleEpic, loadAllArticles, loadAllArticlesSucceded,
  loadAllArticlesFailed, loadArticlesEpic,
} from './article.redux';
import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { Article } from '../models/article';

describe('ArticleRedux', () => {

  describe('ADD...', () => {
    it('should handle ADD', () => {
      // Should not change the state
      expect(articleReducer({}, addArticle({
        id: 'test',
        subject: 'subject',
        body: 'body',
      }))).toEqual({});
    });

    it('should handle ADD_SUCCESS', () => {
      const article = {
        id: 'test',
        subject: 'subject',
        body: 'body',
      };
      const initialState: ArticleState = {
        articles: [],
      };
      const expectedState: ArticleState = {
        articles: [
          article,
        ],
        articleAddError: null,
      };
      expect(articleReducer(initialState, addArticleSucceded(article)))
        .toEqual(expectedState);
    });

    it('should handle ADD_FAILED', () => {
      const error = 'An error';
      const initialState: ArticleState = {};
      const expectedState: ArticleState = {
        articleAddError: error,
      };
      expect(articleReducer(initialState, addArticleFailed(error)))
        .toEqual(expectedState);
    });

    it('should trigger epic on add - success', (done) => {
      const article = {
        id: 'id',
        subject: 'subject',
        body: 'body',
      };
      const apiMock: any = {
        put: () => Observable.of({
          status: 201,
          response: article,
        }),
      };
      const expectedAction = addArticleSucceded(article);
      addArticleEpic(ActionsObservable.of(addArticle(article)), {}, apiMock)
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        });
    });

    it('should trigger epic on add - fail', (done) => {
      const article = {
        id: 'id',
        subject: 'subject',
        body: 'body',
      };
      const error = 'error';
      const apiMock: any = {
        put: () => Observable.throw({
          status: 400,
          responseText: error,
        }),
      };
      const expectedAction = addArticleFailed(error);
      addArticleEpic(ActionsObservable.of(addArticle(article)), {}, apiMock)
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('LOAD...', () => {
    it('should handle LOAD', () => {
      const expectedState: ArticleState = {
        selectedArticle: null,
        getArticleSuccess: false,
        getArticleError: null,
      };
      expect(articleReducer({}, loadArticle('id'))).toEqual(
        expectedState,
      );
    });

    it('should handle LOAD_SUCCESS', () => {
      const article = {
        id: 'test',
        subject: 'subject',
        body: 'body',
      };
      const expectedState: ArticleState = {
        selectedArticle: article,
        getArticleSuccess: true,
        getArticleError: null,
      };
      expect(articleReducer({}, loadArticleSucceded(article)))
        .toEqual(expectedState);
    });

    it('should handle LOAD_FAILED', () => {
      const error = 'An error';
      const expectedState: ArticleState = {
        selectedArticle: null,
        getArticleSuccess: false,
        getArticleError: error,
      };
      expect(articleReducer({}, loadArticleFailed(error)))
        .toEqual(expectedState);
    });

    it('should trigger epic on load - success', (done) => {
      const article = {
        id: 'id',
        subject: 'subject',
        body: 'body',
      };
      const apiMock: any = {
        get: () => Observable.of({
          status: 200,
          response: article,
        }),
      };
      const expectedAction = loadArticleSucceded(article);
      loadArticleEpic(
        ActionsObservable.of(loadArticle(article.id)), {}, apiMock,
      )
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        });
    });

    it('should trigger epic on load - fail', (done) => {
      const article = {
        id: 'id',
        subject: 'subject',
        body: 'body',
      };
      const error = 'error';
      const apiMock: any = {
        get: () => Observable.throw({
          status: 400,
          responseText: error,
        }),
      };
      const expectedAction = loadArticleFailed(error);
      loadArticleEpic(
        ActionsObservable.of(loadArticle(article.id)), {}, apiMock,
      )
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('LOAD_ALL...', () => {
    it('should handle LOAD_ALL', () => {
      const initialState = {};
      const expectedState = {
        articlesDownloading: true,
      };
      const actualState = articleReducer(initialState, loadAllArticles());
      expect(actualState).toEqual(expectedState);
    });

    it('should handle LOAD_ALL_SUCCESS', () => {
      const articles: Article[] = [
        {
          id: '1',
          subject: 'subject',
          body: 'body',
        },
        {
          id: '2',
          subject: 'subject',
          body: 'body',
        },
      ];
      const initialState = {};
      const expectedState = {
        articlesDownloading: false,
        articlesDownloadSuccess: true,
        articlesDownloadError: null,
        articles,
      };
      const actualState = articleReducer(initialState, loadAllArticlesSucceded(articles));
      expect(actualState).toEqual(expectedState);
    });

    it('should handle LOAD_ALL_FAIL', () => {
      const error = 'error';
      const initialState = {};
      const expectedState = {
        articlesDownloading: false,
        articlesDownloadSuccess: false,
        articlesDownloadError: error,
        articles: [],
      };
      const actualState = articleReducer(initialState, loadAllArticlesFailed(error));
      expect(actualState).toEqual(expectedState);
    });

    it('should trigger epic on load all - success', (done) => {
      const articles = [
        {
          id: '1',
          subject: 'subject',
          body: 'body',
        },
        {
          id: '2',
          subject: 'subject',
          body: 'body',
        },
      ];
      const apiMock: any = {
        get: () => Observable.of({
          status: 200,
          response: articles,
        }),
      };
      const expectedAction = loadAllArticlesSucceded(articles);
      loadArticlesEpic(
        ActionsObservable.of(loadAllArticles()), {}, apiMock,
      )
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        });
    });
  });

  it('should trigger epic on load all - fail', (done) => {
    const error = 'error';
    const apiMock: any = {
      get: () => Observable.throw({
        status: 400,
        responseText: error,
      }),
    };
    const expectedAction = loadAllArticlesFailed(error);
    loadArticlesEpic(
      ActionsObservable.of(loadAllArticles()), {}, apiMock,
    )
      .subscribe((actualAction) => {
        expect(actualAction).toEqual(expectedAction);
        done();
      });
  });
});

describe('DELETE...', () => {
  it('should handle DELETE', () => {
    const article = {
      id: 'test',
      subject: ' subject',
      body: 'body',
    };
    const initialState = {};
    const expectedState = {};
    const actualState = articleReducer(initialState, deleteArticle(article));
    expect(actualState).toEqual(expectedState);
  });

  it('should handle DELETE_SUCCESS', () => {
    const article = {
      id: 'test',
      subject: ' subject',
      body: 'body',
    };
    const initialState = {
      articles: [
        article,
      ],
    };
    const expectedState = {
      articles: [],
    };
    const actualState = articleReducer(initialState, deleteArticleSucceded(article));
    expect(actualState).toEqual(expectedState);
  });

  it('should handle DELETE_FAIL', () => {
    const error = 'error';
    const initialState = {
      articleDeleteError: null,
    };
    const expectedState = {
      articleDeleteError: error,
    };
    const actualState = articleReducer(initialState, deleteArticleFailed(error));
    expect(actualState).toEqual(expectedState);
  });

  it('should trigger epic on delete - success', (done) => {
    const article = {
      id: 'id',
      subject: 'subject',
      body: 'body',
    };
    const apiMock: any = {
      delete: () => Observable.of({
        status: 200,
        response: article,
      }),
    };
    const expectedAction = deleteArticleSucceded(article);
    deleteArticleEpic(
      ActionsObservable.of(deleteArticle(article)), {}, apiMock,
    )
      .subscribe((actualAction) => {
        expect(actualAction).toEqual(expectedAction);
        done();
      });
  });

  it('should trigger epic on delete - fail', (done) => {
    const article = {
      id: 'id',
      subject: 'subject',
      body: 'body',
    };
    const error = 'error';
    const apiMock: any = {
      delete: () => Observable.throw({
        status: 400,
        responseText: error,
      }),
    };
    const expectedAction = deleteArticleFailed(error);
    deleteArticleEpic(
      ActionsObservable.of(deleteArticle(article)), {}, apiMock,
    )
      .subscribe((actualAction) => {
        expect(actualAction).toEqual(expectedAction);
        done();
      });
  });
});
