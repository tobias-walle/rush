import * as React from 'react';
import { reduxForm, Field, FormProps } from "redux-form";
import { WithStyles } from "isomorphic-style-loader-utils";
const styles = require('./article-form.component.scss');

export interface ArticleFormValues {
  subject: string,
  body: string
}

export interface ArticleFormProps extends FormProps<ArticleFormValues, {}, {}> {
  onSubmit: (values: ArticleFormValues) => void
}

@reduxForm({
  form: 'blog.article-form'
})
@WithStyles(styles)
export class ArticleFormComponent extends React.Component<ArticleFormProps, any> {

  public render(): JSX.Element {
    let { handleSubmit, pristine, submitting} = this.props;
    return (
      <form className={styles['article-form']} onSubmit={handleSubmit((values) => {
        this.props.onSubmit(values);
        // Clear form after submission
        this.props.reset();
      })}>
        <label>Subject:</label>
        <Field name="subject" component="input" type="text"/>
        <label>Body:</label>
        <Field name="body" component="textarea"/>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </form>
    )
  }
}

