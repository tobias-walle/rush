import { Article } from "./models/article";
import { Module } from "redux-typed-modules";
import { ajax } from "rxjs/observable/dom/ajax";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";

export interface BlogState {
  articles: Article[],
  selectedArticle: Article,

  getArticleDownloading: boolean,
  getArticleSuccess: string,
  getArticleError: string,

  articleAddError: string,
  articleDeleteError: string,
  articlesDownloading: boolean,
  articlesDownloadSuccess: boolean,
  articlesDownloadError: string,
}

const module = new Module({
  initialState: {
    articles: []
  }
});

// Get article
const GET_ARTICLE = 'BLOG/GET_ARTICLE';
export const getArticle = module.createAction({
  type: GET_ARTICLE,

  action: (articleId: string) => {
    return {
      articleId
    }
  },

  reducer: (state, action) => {
    return {
      ...state,
      selectedArticle: null,
      getArticleSuccess: false,
      getArticleError: null,
    }
  }
});

const getArticleCompleted = module.createAction({
  type: 'BLOG/GET_ARTICLE_COMPLETED',

  action: (article: Article, error: string) => {
    return {
      article,
      error
    }
  },

  reducer: (state, action) => {
    let { article, error } = action;
    if (error) {
      console.error(error);
      article = null;
    }
    return {
      ...state,
      selectedArticle: article,
      getArticleSuccess: !error,
      getArticleError: error,
    }
  }
});

const getArticleEpic = action$ =>
  action$.ofType(GET_ARTICLE)
    .mergeMap(action =>
      ajax(`/api/blog/articles/${action.articleId}`)
        .map(response => {
          if (response.status === 200) {
            return getArticleCompleted(response.response, null);
          } else {
            return getArticleCompleted(null, response.responseText);
          }
        })
        .catch(error => Observable.of(getArticleCompleted(null, error.toString())))
    );

// Add article
const ADD_ARTICLE = 'BLOG/ADD_ARTICLE';
export const addArticle = module.createAction({
  type: ADD_ARTICLE,

  action: (article: Article) => {
    return {
      article: article
    };
  },

  reducer: (state, action) => {
    return {
      ...state,
    }
  }
});

const addArticleCompleted = module.createAction({
  type: 'BLOG/ADD_ARTICLE_COMPLETED',

  action: (article: Article, error: any) => {
    return {
      article,
      error
    }
  },

  reducer: (state, action) => {
    let articles = [...state.articles];
    if (!action.error) {
      articles.push(action.article);
    } else {
      console.error(action.error);
    }
    return {
      ...state,
      articles,
      articleAddError: action.error
    }
  }
});

const addArticleEpic = action$ =>
  action$.ofType(ADD_ARTICLE)
    .mergeMap(action =>
      ajax({
        url: '/api/blog/articles',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(action.article)
      })
        .map(response => {
          if (response.status === 201) {
            return addArticleCompleted(action.article, null);
          } else {
            return addArticleCompleted(null, response.responseText);
          }
        })
        .catch(err => Observable.of(
          addArticleCompleted(null, err.toString())
        ))
    );

// Fetch articles
const FETCH_ARTICLES = 'BLOG/FETCH_ARTICLES';
export const fetchArticles = module.createAction({
  type: FETCH_ARTICLES,

  action: () => {
    return {}
  },

  reducer: (state, action) => {
    return {
      ...state,
      articlesDownloading: true
    }
  }
});

const fetchArticlesCompleted = module.createAction({
  type: 'BLOG/FETCH_ARTICLES_COMPLETED',

  action: (articles: Article[], error: any) => {
    return {
      articles,
      error,
    }
  },

  reducer: (state, action) => {
    return {
      ...state,
      articlesDownloading: false,
      articlesDownloadSuccess: true,
      articlesDownloadError: action.error,
      articles: action.articles ? action.articles : state.articles
    }
  }
});

const fetchArticlesEpic = action$ =>
  action$.ofType(FETCH_ARTICLES)
    .mergeMap(action =>
      ajax.get('/api/blog/articles')
        .map(response => fetchArticlesCompleted(response.response, null))
        .catch(err => Observable.of(
          fetchArticlesCompleted(null, err)
        ))
    );


// Delete Article
const DELETE_ARTICLE = 'BLOG/DELETE_ARTICLE';
export const deleteArticle = module.createAction({
  type: DELETE_ARTICLE,

  action: (article: Article) => {
    return {
      article
    }
  },

  reducer: (state, action) => {
    return {
      ...state
    }
  }
});

const deleteArticleCompleted = module.createAction({
  type: 'BLOG/DELETE_ARTICLE_COMPLETED',

  action: (article: Article, error: any) => {
    return {
      article,
      error
    }
  },

  reducer: (state, action) => {
    let {article, error} = action;
    let articles = state.articles;
    if (!error) {
      if (article && article.id) {
        articles = articles.filter((other) => article.id !== other.id);
      } else {
        console.error('Cannot delete article:', article)
      }
    } else {
      console.error(error);
    }
    return {
      ...state,
      articles
    }
  }
});

const deleteArticleEpic = $action =>
    $action.ofType(DELETE_ARTICLE)
      .mergeMap((action) =>
        ajax({
          method: 'DELETE',
          url: `/api/blog/articles/${action.article.id}`
        })
          .map((response) => deleteArticleCompleted(action.article, null))
          .catch((error) => Observable.of(deleteArticleCompleted(null, error)))
      );

// Combine
export const blogState = module.createReducer();

export const blogEpics = combineEpics(
  getArticleEpic,
  addArticleEpic,
  fetchArticlesEpic,
  deleteArticleEpic,
);

