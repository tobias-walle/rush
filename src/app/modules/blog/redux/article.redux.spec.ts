import {
  articleReducer, addArticle, ArticleState, addArticleSucceded, addArticleFailed,
  addArticleEpic, loadArticle, loadArticleSucceded, loadArticleFailed, loadArticleEpic, deleteArticle,
  deleteArticleSucceded, deleteArticleFailed, deleteArticleEpic, loadAllArticles, loadAllArticlesSucceded,
  loadAllArticlesFailed, loadArticlesEpic
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

    it('should trigger epic on add - success', (done) => {
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
        });
    });

    it('should trigger epic on add - fail', (done) => {
      let article = {
        id: 'id',
        subject: 'subject',
        body: 'body'
      };
      let error = 'error';
      let apiMock: any = {
        put: () => Observable.throw({
          status: 400,
          responseText: error
        })
      };
      let expectedAction = addArticleFailed(error);
      addArticleEpic(ActionsObservable.of(addArticle(article)), {}, apiMock)
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        });
    });
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

    it('should trigger epic on load - success', (done) => {
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
        });
    });

    it('should trigger epic on load - fail', (done) => {
      let article = {
        id: 'id',
        subject: 'subject',
        body: 'body'
      };
      let error = 'error';
      let apiMock: any = {
        get: () => Observable.throw({
          status: 400,
          responseText: error
        })
      };
      let expectedAction = loadArticleFailed(error);
      loadArticleEpic(
        ActionsObservable.of(loadArticle(article.id)), {}, apiMock
      )
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        });
    });
  });

  describe('LOAD_ALL...', () => {
    it('should handle LOAD_ALL', () => {
      let initialState = {};
      let expectedState = {
        articlesDownloading: true
      };
      let actualState = articleReducer(initialState, loadAllArticles());
      expect(actualState).toEqual(expectedState);
    });

    it('should handle LOAD_ALL_SUCCESS', () => {
      let articles: Article[] = [
        {
          id: '1',
          subject: 'subject',
          body: 'body'
        },
        {
          id: '2',
          subject: 'subject',
          body: 'body'
        },
      ];
      let initialState = {};
      let expectedState = {
        articlesDownloading: false,
        articlesDownloadSuccess: true,
        articlesDownloadError: null,
        articles,
      };
      let actualState = articleReducer(initialState, loadAllArticlesSucceded(articles));
      expect(actualState).toEqual(expectedState);
    });

    it('should handle LOAD_ALL_FAIL', () => {
      let error = 'error';
      let initialState = {};
      let expectedState = {
        articlesDownloading: false,
        articlesDownloadSuccess: false,
        articlesDownloadError: error,
        articles: [],
      };
      let actualState = articleReducer(initialState, loadAllArticlesFailed(error));
      expect(actualState).toEqual(expectedState);
    });

    it('should trigger epic on load all - success', (done) => {
      let articles = [
        {
          id: '1',
          subject: 'subject',
          body: 'body'
        },
        {
          id: '2',
          subject: 'subject',
          body: 'body'
        },
      ];
      let apiMock: any = {
        get: () => Observable.of({
          status: 200,
          response: articles
        })
      };
      let expectedAction = loadAllArticlesSucceded(articles);
      loadArticlesEpic(
        ActionsObservable.of(loadAllArticles()), {}, apiMock
      )
        .subscribe((actualAction) => {
          expect(actualAction).toEqual(expectedAction);
          done();
        });
    });
  });

  it('should trigger epic on load all - fail', (done) => {
    let articles = [
      {
        id: '1',
        subject: 'subject',
        body: 'body'
      },
      {
        id: '2',
        subject: 'subject',
        body: 'body'
      },
    ];
    let error = 'error';
    let apiMock: any = {
      get: () => Observable.throw({
        status: 400,
        responseText: error
      })
    };
    let expectedAction = loadAllArticlesFailed(error);
    loadArticlesEpic(
      ActionsObservable.of(loadAllArticles()), {}, apiMock
    )
      .subscribe((actualAction) => {
        expect(actualAction).toEqual(expectedAction);
        done();
      });
  });
});

describe('DELETE...', () => {
  it('should handle DELETE', () => {
    let article = {
      id: 'test',
      subject: ' subject',
      body: 'body',
    };
    let initialState = {};
    let expectedState = {};
    let actualState = articleReducer(initialState, deleteArticle(article));
    expect(actualState).toEqual(expectedState);
  });

  it('should handle DELETE_SUCCESS', () => {
    let article = {
      id: 'test',
      subject: ' subject',
      body: 'body',
    };
    let initialState = {
      articles: [
        article
      ]
    };
    let expectedState = {
      articles: []
    };
    let actualState = articleReducer(initialState, deleteArticleSucceded(article));
    expect(actualState).toEqual(expectedState);
  });

  it('should handle DELETE_FAIL', () => {
    let error = 'error';
    let initialState = {
      articleDeleteError: null
    };
    let expectedState = {
      articleDeleteError: error
    };
    let actualState = articleReducer(initialState, deleteArticleFailed(error));
    expect(actualState).toEqual(expectedState);
  });

  it('should trigger epic on delete - success', (done) => {
    let article = {
      id: 'id',
      subject: 'subject',
      body: 'body'
    };
    let apiMock: any = {
      delete: () => Observable.of({
        status: 200,
        response: article
      })
    };
    let expectedAction = deleteArticleSucceded(article);
    deleteArticleEpic(
      ActionsObservable.of(deleteArticle(article)), {}, apiMock
    )
      .subscribe((actualAction) => {
        expect(actualAction).toEqual(expectedAction);
        done();
      });
  });

  it('should trigger epic on delete - fail', (done) => {
    let article = {
      id: 'id',
      subject: 'subject',
      body: 'body'
    };
    let error = 'error';
    let apiMock: any = {
      delete: () => Observable.throw({
        status: 400,
        responseText: error
      })
    };
    let expectedAction = deleteArticleFailed(error);
    deleteArticleEpic(
      ActionsObservable.of(deleteArticle(article)), {}, apiMock
    )
      .subscribe((actualAction) => {
        expect(actualAction).toEqual(expectedAction);
        done();
      });
  });
});
