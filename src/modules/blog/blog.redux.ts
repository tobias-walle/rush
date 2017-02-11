import { Article } from "./models/article";
import { Module } from "redux-typed-modules";

export interface BlogState {
  articles: Article[]
}

const module = new Module({
  initialState: {
    articles: [
      new Article('Hello World', 'This is an important article')
    ]
  }
});

/**
 * Add an article to the state
 */
export const addArticle = module.createAction({
  type: 'BLOG/ADD_ARTICLE',

  action: (article: Article) => {
    return {
      article: article
    };
  },

  reducer: (state, action) => {
    return {
      articles: [...state.articles, action.article]
    }
  }
});

/**
 * Remove an article from the state
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
      articles: state.articles.filter((article: Article) => article.id !== action.id)
    }
  }
});

export const blogState = module.createReducer();
