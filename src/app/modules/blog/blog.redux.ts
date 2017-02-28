// Combine
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { articleReducer, articleEpic, ArticleState } from "./redux/article.redux";

export interface BlogState {
  articlesState: ArticleState
}

export const blogReducer = combineReducers(
  {
    articlesState: articleReducer
  }
);

export const blogEpic = combineEpics(
  articleEpic
);

