import { Article } from '../models/article';
import { Action } from 'redux';
import { ApiService, apiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

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

// Actions
export const LOAD = 'app/blog/LOAD';
export const LOAD_SUCCESS = 'app/blog/LOAD_SUCCESS';
export const LOAD_FAIL = 'app/blog/LOAD_FAIL';
export const LOAD_ALL = 'app/blog/LOAD_ALL';
export const LOAD_ALL_SUCCESS = 'app/blog/LOAD_ALL_SUCCESS';
export const LOAD_ALL_FAIL = 'app/blog/LOAD_ALL_FAIL';
export const ADD = 'app/blog/ADD';
export const ADD_SUCCESS = 'app/blog/ADD_SUCCESS';
export const ADD_FAIL = 'app/blog/ADD_FAIL';
export const DELETE = 'app/blog/DELETE';
export const DELETE_SUCCESS = 'app/blog/DELETE_SUCCESS';
export const DELETE_FAIL = 'app/blog/DELETE_FAIL';

// Action Payload types
export interface LoadAction extends Action {
  articleId: string;
}

export interface LoadSuccessAction extends Action {
  article: Article;
}

export interface LoadFailAction extends Action {
  error: string;
}


export interface LoadAllAction extends Action {
}

export interface LoadAllSuccessAction extends Action {
  articles: Article[];
}

export interface LoadAllFailAction extends Action {
  error: string;
}


export interface AddAction extends Action {
  article: Article;
}

export interface AddSuccessAction extends Action {
  article: Article;
}

export interface AddFailAction extends Action {
  error: string;
}


export interface DeleteAction extends Action {
  article: Article;
}

export interface DeleteSuccessAction extends Action {
  article: Article;
}

export interface DeleteFailAction extends Action {
  error: string;
}

// Reducer
export function articleReducer(state: ArticleState = initialState, action: any = {}): ArticleState {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        selectedArticle: null,
        getArticleSuccess: false,
        getArticleError: null
      };
    case LOAD_SUCCESS:
      action = <LoadSuccessAction> action;
      return {
        ...state,
        selectedArticle: action.article,
        getArticleSuccess: true,
        getArticleError: null
      };
    case LOAD_FAIL:
      action = <LoadFailAction> action;
      return {
        ...state,
        selectedArticle: null,
        getArticleSuccess: false,
        getArticleError: action.error
      };

    case LOAD_ALL:
      action = <LoadAllAction> action;
      return {
        ...state,
        articlesDownloading: true
      };
    case LOAD_ALL_SUCCESS:
      action = <LoadAllSuccessAction> action;
      return {
        ...state,
        articlesDownloading: false,
        articlesDownloadSuccess: true,
        articlesDownloadError: null,
        articles: action.articles,
      };
    case LOAD_ALL_FAIL:
      action = <LoadAllFailAction> action;
      return {
        ...state,
        articlesDownloading: false,
        articlesDownloadSuccess: false,
        articlesDownloadError: action.error,
        articles: [],
      };

    case ADD:
      return {
        ...state
      };
    case ADD_SUCCESS:
      action = <AddSuccessAction> action;
      return {
        ...state,
        articles: [...state.articles, action.article],
        articleAddError: null,
      };
    case ADD_FAIL:
      action = <AddFailAction> action;
      return {
        ...state,
        articleAddError: action.error,
      };


    case DELETE:
      return {
        ...state
      };
    case DELETE_SUCCESS:
      action = <DeleteSuccessAction> action;
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.id !== action.article.id
        ),
      };
    case DELETE_FAIL:
      action = <DeleteFailAction> action;
      return {
        ...state,
        articleDeleteError: action.error,
      };
    default:
      return state;
  }
}

// Action Creators
export function loadArticle(articleId: string): LoadAction {
  return {
    type: LOAD,
    articleId,
  };
}

export function loadArticleSucceded(article: Article): LoadSuccessAction {
  return {
    type: LOAD_SUCCESS,
    article
  };
}

export function loadArticleFailed(error: string): LoadFailAction {
  return {
    type: LOAD_FAIL,
    error
  };
}


export function loadAllArticles(): LoadAllAction {
  return {
    type: LOAD_ALL,
  };
}

export function loadAllArticlesSucceded(articles: Article[]): LoadAllSuccessAction {
  return {
    type: LOAD_ALL_SUCCESS,
    articles
  };
}

export function loadAllArticlesFailed(error: string): LoadAllFailAction {
  return {
    type: LOAD_ALL_FAIL,
    error
  };
}


export function addArticle(article: Article): AddAction {
  return {
    type: ADD,
    article
  };
}

export function addArticleSucceded(article: Article): AddSuccessAction {
  return {
    type: ADD_SUCCESS,
    article
  };
}

export function addArticleFailed(error: string): AddFailAction {
  return {
    type: ADD_FAIL,
    error
  };
}


export function deleteArticle(article: Article): DeleteAction {
  return {
    type: DELETE,
    article
  };
}

export function deleteArticleSucceded(article: Article): DeleteSuccessAction {
  return {
    type: DELETE_SUCCESS,
    article
  };
}

export function deleteArticleFailed(error: string): DeleteFailAction {
  return {
    type: DELETE_FAIL,
    error
  };
}

// Epics
export const loadArticleEpic = (action$, store, api: ApiService = apiService) =>
  action$.ofType(LOAD)
    .mergeMap(action =>
      api.get(`blog/articles/${action.articleId}`)
        .map(response => {
          if (response.status === 200) {
            return loadArticleSucceded(response.response);
          } else {
            return loadArticleFailed(response.responseText);
          }
        })
        .catch(error => {
          return Observable.of(loadArticleFailed(error.toString()));
        })
    );

export const addArticleEpic = (action$, store, api: ApiService = apiService) =>
  action$.ofType(ADD)
    .mergeMap(action =>
      api.put('blog/articles', action.article)
        .map(response => addArticleSucceded(action.article))
        .catch(err => Observable.of(
          addArticleFailed(err.responseText())
        ))
    );

export const loadArticlesEpic = (action$, store, api: ApiService = apiService) =>
  action$.ofType(LOAD_ALL)
    .mergeMap(action =>
      api.get(`blog/articles`)
        .map(response => loadAllArticlesSucceded(response.response))
        .catch(err => Observable.of(
          loadAllArticlesFailed(err.responseText)
        ))
    );

export const deleteArticleEpic = (action$, store, api: ApiService = apiService) =>
  action$.ofType(DELETE)
    .mergeMap((action) =>
      api.delete(`blog/articles/${action.article.id}`)
        .map((response) => deleteArticleSucceded(action.article))
        .catch((error) => Observable.of(deleteArticleFailed(error.responseText)))
    );

export const articleEpic = combineEpics(
  loadArticleEpic,
  loadArticlesEpic,
  addArticleEpic,
  deleteArticleEpic
);

