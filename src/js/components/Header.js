import React from 'react';
import PropTypes from 'prop-types';
import { SOURCES, TYPES } from 'shabados';
import { Link } from 'react-router-dom';
import GurmukhiKeyboard from './GurmukhiKeyboard';
import SearchForm from './SearchForm';
import { toSearchURL } from '../util';

const types = [...TYPES, 'Ang'];

export default class Header extends React.PureComponent {
  static defaultProps = { isHome: false };

  static propTypes = {
    defaultQuery: PropTypes.string,
    isHome: PropTypes.bool,
    history: PropTypes.shape({ push: PropTypes.func }),
  };

  toggleMenu = () => document.body.classList.toggle('menu-open');
  closeMenu = () => document.body.classList.remove('menu-open');

  onFormSubmit = ({ handleSubmit, ...data }) => e => {
    e.preventDefault();
    handleSubmit();
    this.handleFormSubmit(data);
  };

  handleFormSubmit = data => this.props.history.push(toSearchURL(data));

  render() {
    const {
      props: { defaultQuery, isHome },
      toggleMenu,
      closeMenu,
      onFormSubmit,
      handleFormSubmit,
    } = this;

    return (
      <div className={`top-bar no-select ${isHome ? 'top-bar-naked' : ''}`}>
        <div className="row">
          {!isHome && (
            <div className="top-bar-title">
              <Link to="/" />
            </div>
          )}
          <SearchForm
            defaultQuery={defaultQuery}
            submitOnChangeOf={['type', 'source']}
            onSubmit={handleFormSubmit}
          >
            {({
              pattern,
              defaultQuery,
              title,
              className,
              displayGurmukhiKeyboard,
              isAnimatingPlaceholder,
              query,
              type,
              source,
              action,
              name,
              placeholder,
              setGurmukhiKeyboardVisibilityAs,
              setQueryAs,
              handleSearchChange,
              handleSearchSourceChange,
              handleSearchTypeChange,
              handleSubmit,
            }) => (
              <React.Fragment>
                <div id="responsive-menu">
                  <div className="top-bar-left">
                    {!isHome && (
                      <form
                        action={action}
                        id="top-bar-search-form"
                        onSubmit={onFormSubmit({
                          handleSubmit,
                          type,
                          source,
                          query,
                        })}
                        className="search-form"
                      >
                        <ul className="menu">
                          <li>
                            <input
                              name="type"
                              className="hidden"
                              defaultValue={type}
                              id="search-type-value"
                              hidden
                            />
                          </li>
                          <li>
                            <input
                              name="source"
                              defaultValue={source}
                              className="hidden"
                              id="search-source-value"
                              hidden
                            />
                          </li>
                          <li>
                            <div id="search-container">
                              <input
                                defaultValue={defaultQuery}
                                type="search"
                                name={name}
                                id="search"
                                autoComplete="off"
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck="false"
                                required
                                value={query}
                                onChange={handleSearchChange}
                                className={className}
                                placeholder={placeholder}
                                title={title}
                                pattern={pattern}
                              />

                              <button
                                type="button"
                                className="clear-search-toggle"
                                onClick={setQueryAs('')}
                              >
                                <i className="fa fa-times" />
                              </button>

                              <button
                                className={`gurmukhi-keyboard-toggle ${
                                  displayGurmukhiKeyboard ? 'active' : ''
                                }`}
                                type="button"
                                onClick={setGurmukhiKeyboardVisibilityAs(
                                  !displayGurmukhiKeyboard
                                )}
                              >
                                <i className="fa fa-keyboard-o" />
                              </button>

                              <button type="submit">
                                <i className="fa fa-search" />
                              </button>

                              <GurmukhiKeyboard
                                value={query}
                                active={displayGurmukhiKeyboard}
                                onKeyClick={newValue => setQueryAs(newValue)()}
                                onClose={setGurmukhiKeyboardVisibilityAs(false)}
                              />
                            </div>
                          </li>
                        </ul>
                      </form>
                    )}
                  </div>
                  <div className="top-bar-right">
                    <a
                      href="#"
                      className="button"
                      id="open-mobile-menu"
                      onClick={toggleMenu}
                    >
                      <i className="fa fa-bars" />
                    </a>
                    <ul className="menu header-menu">
                      <li>
                        <Link to="/hukamnama" onClick={toggleMenu}>
                          Hukamnama
                        </Link>
                      </li>
                      <li>
                        <Link to="/shabad?random" onClick={toggleMenu}>
                          Random Shabad
                        </Link>
                      </li>
                      <li className="close">
                        <a href="#" onClick={closeMenu}>
                          Close
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {!isHome && (
                  <div id="search-options">
                    <select
                      name="type"
                      id="search-type"
                      value={type}
                      disabled={isAnimatingPlaceholder}
                      onChange={handleSearchTypeChange}
                    >
                      {types.map((children, value) => (
                        <option key={value} value={value}>
                          {children}
                        </option>
                      ))}
                    </select>
                    <select
                      name="source"
                      value={source}
                      onChange={handleSearchSourceChange}
                    >
                      {Object.entries(SOURCES).map(([value, children]) => (
                        <option key={value} value={value}>
                          {children}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </React.Fragment>
            )}
          </SearchForm>
        </div>
      </div>
    );
  }
}
