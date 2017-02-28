import { ArticleListProps, ArticleListComponent } from '../components/article-list.component';
import { connect } from 'react-redux';
import { GlobalState } from '../../root';
import { deleteArticle, loadAllArticles } from '../redux/article.redux';

function mapStateToProps(state: GlobalState): ArticleListProps {
  return {
    articles: state.blog.articlesState.articles,
    articlesDownloaded: state.blog.articlesState.articlesDownloadSuccess
  };
}

function mapDispatchToProps(dispatch): ArticleListProps {
  return {
    fetchArticles: () => {
      dispatch(loadAllArticles());
    },
    deleteArticle: (article) => {
      dispatch(deleteArticle(article));
    }
  };
}

export const ArticleListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleListComponent);
