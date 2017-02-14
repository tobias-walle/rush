import { ArticleFormProps, ArticleFormValues, ArticleFormComponent } from "../components/article-form.component";
import { addArticle } from "../blog.redux";
import { Article } from "../models/article";
import { connect } from "react-redux";

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

