import { GlobalState } from '../../root';
import { ArticleDetailProps, ArticleDetailComponent } from '../components/article-detail.component';
import { connect } from 'react-redux';
import { loadArticle } from '../redux/article.redux';

function mapStateToProps(state: GlobalState, ownProps): ArticleDetailProps {
  return {
    article: state.blog.articlesState.selectedArticle,
    downloading: state.blog.articlesState.getArticleDownloading,
    downloadError: state.blog.articlesState.getArticleError,
  };
}

function mapDispatchToProps(dispatch, ownProps): ArticleDetailProps {
  const articleId = ownProps.params.id;

  return {
    fetchArticle: () => dispatch(loadArticle(articleId)),
  };
}

export const ArticleDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetailComponent);
