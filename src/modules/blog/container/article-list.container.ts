import { ArticleListProps, ArticleListComponent } from "../components/article-list.component";
import { connect } from "react-redux";
import { GlobalState } from "../../root";
import { fetchArticles } from "../blog.redux";

function mapStateToProps(state: GlobalState): ArticleListProps {
  return {
    articles: state.blogState.articles
  }
}

function mapDispatchToProps(dispatch): ArticleListProps {
  return {
    fetchArticles: () => {
      dispatch(fetchArticles())
    }
  }
}

export const ArticleListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleListComponent);
