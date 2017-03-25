import { Article } from '../models/article';
import { ApiService, apiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { createDuck, createReducer } from 'redux-typed-ducks';

export interface ArticleState {
  articles?: Article[];
  selectedArticle?: Article;
  getArticleDownloading?: boolean;
  getArticleSuccess?: boolean;
  getArticleError?: string;
  articleAddError?: string;
  articleDeleteError?: string;
  articlesDownloading?: boolean;
  articlesDownloadSuccess?: boolean;
  articlesDownloadError?: string;
}

const initialState: ArticleState = {
  articles: [],
};

export const loadArticle = createDuck(
  'app/blog/LOAD',
  (
    state: ArticleState,
    payload: {
      articleId: string
    }
  ) => {
    return {
      ...state,
      selectedArticle: null,
      getArticleSuccess: false,
      getArticleError: null,
    };
  }
);

export const loadArticleSucceded = createDuck(
  'app/blog/LOAD_SUCCESS',
  (
    state: ArticleState,
    payload: {
      article: Article,
    }
  ) => {
    return {
      ...state,
      selectedArticle: payload.article,
      getArticleSuccess: true,
      getArticleError: null,
    };
  }
);

export const loadArticleFailed = createDuck(
  'app/blog/LOAD_FAIL',
  (
    state: ArticleState,
    payload: {
      error: string,
    }
  ) => {
    return {
      ...state,
      selectedArticle: null,
      getArticleSuccess: false,
      getArticleError: payload.error,
    };
  }
);

export const loadAllArticles = createDuck(
  'app/blog/LOAD_ALL',
  (
    state: ArticleState,
    payload: {}
  ) => {
    return {
      ...state,
      articlesDownloading: true,
    };
  }
);

export const loadAllArticlesSucceded = createDuck(
  'app/blog/LOAD_ALL_SUCCESS',
  (
    state: ArticleState,
    payload: {
      articles: Article[];
    }
  ) => {
    return {
      ...state,
      articlesDownloading: false,
      articlesDownloadSuccess: true,
      articlesDownloadError: null,
      articles: payload.articles,
    };
  }
);

export const loadAllArticlesFailed = createDuck(
  'app/blog/LOAD_ALL_FAIL',
  (
    state: ArticleState,
    payload: {
      error: string
    }
  ) => {
    return {
      ...state,
      articlesDownloading: false,
      articlesDownloadSuccess: false,
      articlesDownloadError: payload.error,
      articles: [],
    };
  }
);

export const addArticle = createDuck(
  'app/blog/ADD',
  (
    state: ArticleState,
    payload: {
      article: Article;
    }
  ) => {
    return {
      ...state,
    };
  }
);

export const addArticleSucceded = createDuck(
  'app/blog/ADD_SUCCESS',
  (
    state: ArticleState,
    payload: {
      article: Article;
    }
  ) => {
    return {
      ...state,
      articles: [...state.articles, payload.article],
      articleAddError: null,
    };
  }
);

export const addArticleFailed = createDuck(
  'app/blog/ADD_FAIL',
  (
    state: ArticleState,
    payload: {
      error: string
    }
  ) => {
    return {
      ...state,
      articleAddError: payload.error,
    };
  }
);

export const deleteArticle = createDuck(
  'app/blog/DELETE',
  (
    state: ArticleState,
    payload: {
      article: Article
    }
  ) => {
    return {
      ...state,
    };
  }
);

export const deleteArticleSucceded = createDuck(
  'app/blog/DELETE_SUCCESS',
  (
    state: ArticleState,
    payload: {
      article: Article
    }
  ) => {
    return {
      ...state,
      articles: state.articles.filter(
        (article) => article.id !== payload.article.id,
      ),
    };
  }
);

export const deleteArticleFailed = createDuck(
  'app/blog/DELETE_FAIL',
  (
    state: ArticleState,
    payload: {
      error: string
    }
  ) => {
    return {
      ...state,
      articleDeleteError: payload.error,
    };
  }
);

export const articleReducer = createReducer(
  [
    loadArticle,
    loadArticleSucceded,
    loadArticleFailed,
    loadAllArticles,
    loadAllArticlesSucceded,
    loadAllArticlesFailed,
    addArticle,
    addArticleSucceded,
    addArticleFailed,
    deleteArticle,
    deleteArticleSucceded,
    deleteArticleFailed
  ], initialState
);

// Epics
export const $loadArticleEpic = (action$, store, api: ApiService = apiService) =>
  action$.ofType(loadArticle.actionType)
    .mergeMap(action =>
      api.get(`blog/articles/${action.payload.articleId}`)
        .map(response => loadArticleSucceded({article: response.response}))
        .catch(error => {
          return Observable.of(loadArticleFailed({error: error.responseText}));
        }),
    );

export const $addArticleEpic = (action$, store, api: ApiService = apiService) =>
  action$.ofType(addArticle.actionType)
    .mergeMap(action =>
      api.put('blog/articles', action.payload.article)
        .map(response => addArticleSucceded({article: action.payload.article}))
        .catch(err => Observable.of(
          addArticleFailed({error: err.responseText}),
        )),
    );

export const $loadArticlesEpic = (action$, store, api: ApiService = apiService) =>
  action$.ofType(loadAllArticles.actionType)
    .mergeMap(action =>
      api.get(`blog/articles`)
        .map(response => loadAllArticlesSucceded({articles: response.response}))
        .catch(err => Observable.of(
          loadAllArticlesFailed({error: err.responseText}),
        )),
    );

export const $deleteArticleEpic = (action$, store, api: ApiService = apiService) =>
  action$.ofType(deleteArticle.actionType)
    .mergeMap((action) =>
      api.delete(`blog/articles/${action.payload.article.id}`)
        .map((response) => deleteArticleSucceded({article: action.payload.article}))
        .catch((error) => Observable.of(deleteArticleFailed({error: error.responseText}))),
    );

export const $articleEpic = combineEpics(
  $loadArticleEpic,
  $loadArticlesEpic,
  $addArticleEpic,
  $deleteArticleEpic,
);
