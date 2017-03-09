import * as React from 'react';
import { WithStyles } from 'isomorphic-style-loader-utils';
const styles = require('./text.component.scss');

export interface TextComponentProps {
  text?: string;
}

@WithStyles(styles)
export class TextComponent extends React.Component<TextComponentProps, {}> {
  render() {
    const props: TextComponentProps = this.props;
    return (
      <div className={styles.container}>
        <div>
          {props.text}
        </div>
      </div>
    );
  }
}
