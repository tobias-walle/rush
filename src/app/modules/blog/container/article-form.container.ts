import { ArticleFormProps, ArticleFormValues, ArticleFormComponent } from "../components/article-form.component";
import { Article } from "../models/article";
import { connect } from "react-redux";
import { addArticle } from "../redux/article.redux";

function mapDispatchToProps(dispatch): ArticleFormProps {
  return {
    onSubmit: (values: ArticleFormValues) => {
      dispatch(addArticle(new Article(values.subject, values.body)));
    }
  }
}

export const ArticleFormContainer = connect(
  null,
  mapDispatchToProps
)(ArticleFormComponent);

