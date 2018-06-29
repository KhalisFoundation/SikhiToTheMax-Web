import React from 'react';
import PropTypes from 'prop-types';
import { LARIVAAR_ASSIST_COLOR } from '../../constants';
import LarivaarWord from './Word';

export default class Larivaar extends React.PureComponent {
  static defaultProps = {
    larivaarAssist: false,
    enable: true,
  };

  static propTypes = {
    larivaarAssist: PropTypes.bool,
    enable: PropTypes.bool,
    unicode: PropTypes.bool,
    children: PropTypes.string.isRequired,
  };

  render() {
    const { larivaarAssist, enable, children, unicode } = this.props;
    const larivaarAssistColor = larivaarAssist ? LARIVAAR_ASSIST_COLOR : '';

    return enable === false
      ? children
      : children
          .split(' ')
          .map(
            (word, index) =>
              ['॥', ']'].some(v => word.includes(v)) ? (
                `${word} `
              ) : (
                <LarivaarWord
                  key={index}
                  word={word}
                  unicode={unicode}
                  larivaarAssistColor={larivaarAssistColor}
                  index={index}
                />
              )
          );
  }
}
