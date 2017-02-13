import { Article } from "./models/article";
import { Module } from "redux-typed-modules";
import { ajax } from "rxjs/observable/dom/ajax";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs";

export interface BlogState {
  articles: Article[],
  articleAddError: any
  articleDeleteError: any
  articlesDownloading: boolean
  articlesDownloadSuccess: boolean
  articlesDownloadError: any
}

const module = new Module({
  initialState: {
    articles: []
  }
});

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

export const addArticleCompleted = module.createAction({
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

/**
 * Remove an article
 */
export const removeArticle = module.createAction({
  type: 'BLOG/REMOVE_ARTICLE',

  action: (id: string) => {
    return {
      id
    }
  },

  reducer: (state, action) => {
    return {
      ...state,
      articles: state.articles.filter((article: Article) => article.id !== action.id)
    }
  }
});

/**
 * Fetch articles from api
 */
export const fetchArticles = module.createAction({
  type: 'BLOG/FETCH_ARTICLES',

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

export const fetchArticlesCompleted = module.createAction({
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
  action$.ofType('BLOG/FETCH_ARTICLES')
    .mergeMap(action =>
      ajax.get('/api/blog/articles')
        .map(response => fetchArticlesCompleted(response.response, null))
        .catch(err => Observable.of(
          fetchArticlesCompleted(null, err)
        ))
    );


const DELETE_ARTICLE = 'BLOG/DELETE_ARTICLE';
/**
 * Delete article
 */
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

export const deleteArticleCompleted = module.createAction({
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

export const blogState = module.createReducer();

export const blogEpics = combineEpics(
  addArticleEpic,
  fetchArticlesEpic,
  deleteArticleEpic,
);

