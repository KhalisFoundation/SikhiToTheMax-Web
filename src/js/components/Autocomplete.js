import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from 'react-router-dom';

import CrossIcon from '@/components/Icons/Times';
import Larivaar from '@/components/Larivaar';
import { toSearchURL } from '@/util';
class Autocomplete extends Component {
  static propTypes = {
    isShowFullResults: PropTypes.bool,
    onItemClick: PropTypes.func,
    getSuggestions: PropTypes.func.isRequired,
    searchOptions: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: -1,
      filteredSuggestions: [],
      showSuggestions: false,
      suggestionTimeout: 0,
    };
  }

  resetSearchResults = () => {
    this.setState((prevState) =>
      ({
        ...prevState,
        activeSuggestion: -1,
        filteredSuggestions: [],
        showSuggestions: false,
      })
    );
  }

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    const isEnterKey = e.keyCode == 13;
    const isArrowDownKey = e.keyCode == 38;
    const isArrowUpKey = e.keyCode == 40;
    const isActiveSuggestion = activeSuggestion !== -1;

    if (isEnterKey) {
      if (isActiveSuggestion) e.preventDefault();

      this.resetSearchResults();
      this.props.history.push(filteredSuggestions[activeSuggestion].url);
      this.props.onItemClick && this.props.onItemClick();

    } else if (e.keyCode === 38) {
      window.location = filteredSuggestions[activeSuggestion].url;

      this.setState({
        activeSuggestion: -1,
        filteredSuggestions: [],
        showSuggestions: false,
      });

    }
    else if (isArrowDownKey) {
      e.preventDefault();
      if (isActiveSuggestion) {
        this.setState({ activeSuggestion: activeSuggestion - 1 });
        const newScroll = document.querySelector('.suggestion-active').offsetHeight;
        document.getElementById('suggestions').scrollBy(0, -newScroll);
      }
    }
    else if (isArrowUpKey) {
      e.preventDefault();
      const totalSuggestions = filteredSuggestions.length;

      if (activeSuggestion + 1 < totalSuggestions) {
        this.setState({ activeSuggestion: activeSuggestion + 1 }, () => {
          const newScroll = document.querySelector('.suggestion-active').offsetHeight;
          activeSuggestion + 1 !== 0 && document.getElementById('suggestions').scrollBy(0, newScroll);
        });
      }
    }
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    clearTimeout(this.state.suggestionTimeout);
  }

  componentDidUpdate(prevProps) {
    const prevInput = prevProps.value;
    const { searchOptions } = this.props;
    const { searchOptions: prevSearchOptions } = prevProps;
    if (this.props.value !== prevInput ||
      searchOptions.raag !== prevSearchOptions.raag ||
      searchOptions.source !== prevSearchOptions.source ||
      searchOptions.writer !== prevSearchOptions.writer ||
      searchOptions.type !== prevSearchOptions.type
    ) {
      const { getSuggestions, searchOptions } = this.props;
      const userInput = this.props.value;
      const isSearchTypeAng = searchOptions.type === 5;
      const isQueryValid = userInput.length >= 2 && !isSearchTypeAng;
      clearTimeout(this.state.suggestionTimeout);

      if (isQueryValid) {
        const suggestionTimeout = setTimeout(() => {

          getSuggestions(userInput, searchOptions)
            .then(suggestions => {

              // if any suggestion exists, only then add this as final result item
              if (isShowFullResults && suggestions.length > 0) {
                suggestions.push({
                  name: 'Show full results',
                  url: toSearchURL({
                    ...searchOptions,
                    query: userInput,
                  })
                });
              }

              this.setState({
                activeSuggestion: -1,
                filteredSuggestions: suggestions,
                showSuggestions: true,
              });
            });

        }, 400);
        this.setState({ suggestionTimeout });
      } else {
        this.setState({
          activeSuggestion: -1,
          showSuggestions: false,
        });
      }
    }

    if (this.state.showSuggestions) {
      document.addEventListener('keydown', this.onKeyDown);
    } else {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }

  render() {
    const {
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
      },
      props: {
        isShowFullResults = false,
        value,
        searchOptions,
      }
    } = this;

    console.log(this.props, 'AUTOCOMPLETE...')

    let suggestionsListComponent;

    if (showSuggestions && value) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul
            id="suggestions"
            className="search-result"
            onKeyDown={this.onKeyDown} >
            <button
              className="clear-autocomplete"
              onClick={setQueryAs('')}
            >
              <CrossIcon />
            </button>
            {filteredSuggestions.map((suggestion, index) => {
              let className = searchOptions.type !== 3 ? "gurbani-font " : " ";
              const isLastIdx = index === (filteredSuggestions.length - 1);
              const isShowFullResultsListItem = isShowFullResults && isLastIdx;

              if (isShowFullResultsListItem) {
                className = "show-all-results "
              }

              if (index === activeSuggestion) {
                className += "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion.url}
                  onMouseOver={() => {
                    this.setState({ activeSuggestion: index });
                  }}
                >
                  {isShowFullResultsListItem ?
                    <Link
                      to={suggestion.url}
                    >
                      {suggestion.name}
                    </Link>
                    :
                    <a href={suggestion.url}>
                      <Larivaar
                        larivaarAssist={false}
                        enable={false}
                        unicode={false}
                        highlightIndex={suggestion.highlightIndex}
                        query={suggestion.query}
                        type={searchOptions.type}
                      >
                        {searchOptions.type === 3 ? suggestion.translation : suggestion.pankti}
                      </Larivaar>
                      {searchOptions.type === 3 && (<p className="gurbani-font">{suggestion.pankti}</p>)}
                    </a>}
                </li >
              );
            })}
          </ul >
        );
      } else {
        suggestionsListComponent = (
          <ul className="search-result" id="suggestions">
            <li><a>No matched results.</a></li>
          </ul>
        )
      }
    }

    return (
      <Fragment>
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default withRouter(Autocomplete);
