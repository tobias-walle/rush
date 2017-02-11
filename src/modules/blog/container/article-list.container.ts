import { ArticleListProps, ArticleListComponent } from "../components/article-list.component";
import { connect } from "react-redux";
import { GlobalState } from "../../root";

function mapStateToProps(state: GlobalState): ArticleListProps {
  return {
    articles: state.blogState.articles
  }
}

export const ArticleListContainer = connect(
  mapStateToProps
)(ArticleListComponent);
