import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ArrowIcon from '../Icons/Arrow';
import SpaceBar from '../Icons/Spacebar';
import { SEARCH_TYPES } from '@/constants'
import { getKeyboardKeyValue, getMatraAkhar } from './utils';
import { defaultMatraValue, matras, withMatra, withoutMatra } from './constants';

export class EnhancedGurmukhiKeyboard extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    searchType: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    onKeyClick: PropTypes.func.isRequired,
    onClose: PropTypes.func,
  };

  state = {
    page: 1,
  };

  handleBackspace = () =>
    this.props.onKeyClick(
      this.props.value.substring(0, this.props.value.length - 1)
    );

  handleSpace = () =>
    this.props.onKeyClick(
      this.props.value + " "
    );

  handleClick = ({
    target: {
      dataset: { value },
    },
  }) => {
    const currentQuery = this.props.value;
    const lastChar = currentQuery[currentQuery.length - 1];
    let newValue;
    if (!matras.includes(lastChar) &&
      value.includes(lastChar) &&
      value !== lastChar) {
      newValue = `${currentQuery.substring(0, currentQuery.length - 1)}${value}`;
    } else {
      newValue = `${currentQuery}${value}`;
    }
    this.props.onKeyClick(newValue);
  };

  // keyboard keys to be disabled based on certain search types
  getHiddenKeys = () => {
    switch (this.props.searchType) {
      case SEARCH_TYPES.FIRST_LETTERS:
      case SEARCH_TYPES.FIRST_LETTERS_ANYWHERE:
        return {
          'space': true
        }
    }

    return {}
  }

  render() {
    const { searchType } = this.props;
    const spaceKey = (
      <button
        key="space-key"
        title="Space"
        data-action="space"
        onClick={this.handleSpace}
      >
        <SpaceBar />
      </button>
    );

    const defaultMatraKeys = Object.keys(defaultMatraValue);
    const isWithMatras = searchType === SEARCH_TYPES.GURMUKHI_WORD;
    const keys = isWithMatras ? withMatra : withoutMatra;
    const keyboardGrid = [keys];
    const hiddenKeys = this.getHiddenKeys();

    const meta = (
      <React.Fragment key="meta-key">
        <button
          data-action="bksp"
          title="Backspace"
          key="backspace-key"
          onClick={this.handleBackspace}
        >
          <ArrowIcon />
        </button>
        <Link to="/help#Web-how-to-type-gurmukhi-with-keyboard">
          <button type="button" key="help-key">?</button>
        </Link>
      </React.Fragment>
    );


    return (
      <div
        className={`gurmukhi-keyboard gurbani-font ${this.props.active ? 'active' : ''}`}
        onClick={this.click}
      >
        {
          keyboardGrid.map(
            (rows, index) => {
              return (
                <div
                  className="page"
                  key={index}
                  id={`gurmukhi-keyboard-page-${index + 1}`}
                >
                  {rows.map((chars, rowIndex) => (
                    <div key={`${index}-${rowIndex}`} className="keyboard-row">
                      <div className="keyboard-row-set">
                        {
                          chars.map((keyboardKey, i) => {

                            if (hiddenKeys[keyboardKey]) {
                              return null;
                            }
                            if (keyboardKey === 'meta') {
                              return meta;
                            }
                            if (keyboardKey === 'space') {
                              return spaceKey;
                            }

                            const isCurrentKeyDefaultMatraKey = defaultMatraKeys.includes(keyboardKey);

                            return (
                              <button
                                key={i}
                                data-value={getKeyboardKeyValue(keyboardKey, this.props.value)}
                                className={isCurrentKeyDefaultMatraKey ? 'matra-button' : ''}
                                onClick={this.handleClick}>
                                {isCurrentKeyDefaultMatraKey ?
                                  getMatraAkhar(keyboardKey, this.props.value) : keyboardKey}
                              </button>
                            )
                          })
                        }
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          )
        }
      </div>
    );
  }
}
