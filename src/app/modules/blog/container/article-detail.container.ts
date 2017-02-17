import { GlobalState } from "../../root";
import { ArticleDetailProps, ArticleDetailComponent } from "../components/article-detail.component";
import { connect } from "react-redux";
import { getArticle } from "../blog.redux";

function mapStateToProps(state: GlobalState, ownProps): ArticleDetailProps {
  return {
    article: state.blogState.selectedArticle,
    downloading: state.blogState.getArticleDownloading,
    downloadError: state.blogState.getArticleError,
  }
}

function mapDispatchToProps(dispatch, ownProps): ArticleDetailProps {
  let articleId = ownProps.params.id;

  return {
    fetchArticle: () => dispatch(getArticle(articleId)),
  }
}

export const ArticleDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetailComponent);