import * as React from 'react';
import { reduxForm, Field, FormProps } from 'redux-form';

export interface ArticleFormValues {
  subject: string;
  body: string;
}

export interface ArticleFormProps extends FormProps<ArticleFormValues, {}, {}> {
  onSubmit?(values: ArticleFormValues): void;
}

@reduxForm({
  form: 'blog.article-form',
})
export class ArticleFormComponent extends React.Component<ArticleFormProps, any> {

  public render(): JSX.Element {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <form
        onSubmit={handleSubmit((values) => {
          this.props.onSubmit(values);
          // Clear form after submission
          this.props.reset();
        })}
      >
        <label>Subject:</label>
        <Field name='subject' className='input' component='input' type='text'/>
        <label>Body:</label>
        <Field name='body' className='textarea' component='textarea'/>
        <button className='button' type='submit' disabled={pristine || submitting}>Submit</button>
      </form>
    );
  }
}
