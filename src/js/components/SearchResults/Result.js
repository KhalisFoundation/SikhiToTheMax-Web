import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Larivaar from '../../components/Larivaar';
import { toShabadURL, getHighlightIndices } from '../../util';
import {
  SEARCH_TYPES
} from '@/constants';

import {
  getAng,
  getSource,
  getUnicodeVerse,
  getGurmukhiVerse,
  translationMap,
  transliterationMap,
  getRaag,
  getWriter,
} from '@/util/api/shabad';

export default class SearchResult extends React.PureComponent {
  static propTypes = {
    shabad: PropTypes.object.isRequired,
    q: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
  };

  render() {
    const {
      transliterationLanguages,
      translationLanguages,
      shabad,
      fontSize,
      fontFamily,
      q,
      type,
      source,
      unicode,
      larivaar,
      larivaarAssist,
    } = this.props;

    const _source = getSource(shabad);
    const shabadPageNo = getAng(shabad) === null ? '' : getAng(shabad);
    const presentationalSource = _source
      ? `${_source} - ${shabadPageNo}`
      : null;

    const isSearchTypeEnglishWord = type === SEARCH_TYPES.ENGLISH_WORD;
    const shabadEnglishTranslation = translationMap['english'](shabad)

    // Since for english-word search type we needs to highlight index
    // for english translations.
    const highlightIndex = getHighlightIndices(
      isSearchTypeEnglishWord ? shabadEnglishTranslation : shabad.verse.gurmukhi,
      q,
      type,
    );

    return (
      <React.Fragment key={shabad.id}>
        <li
          className="search-result">
          <Link
            style={{
              fontSize: `${fontSize}em`,
              fontFamily: `${fontFamily}`
            }}
            to={toShabadURL({ shabad, q, type, source })}
            className="gurbani-font gurbani-display"
          >
            {unicode ? (
              <div className={`unicode ${larivaar ? 'larivaar' : ''}`}>
                <Larivaar
                  type={type}
                  larivaarAssist={larivaarAssist}
                  enable={larivaar}
                  unicode={unicode}
                  highlightIndex={isSearchTypeEnglishWord ? [] : highlightIndex}
                  query={q}
                  visraam={shabad.visraam}
                >
                  {getUnicodeVerse(shabad)}
                </Larivaar>
              </div>
            ) : (
                <div className={`gurlipi ${larivaar ? 'larivaar' : ''}`}>
                  <Larivaar
                    type={type}
                    larivaarAssist={larivaarAssist}
                    enable={larivaar}
                    highlightIndex={isSearchTypeEnglishWord ? [] : highlightIndex}
                    query={q}
                    visraam={shabad.visraam}
                  >
                    {getGurmukhiVerse(shabad)}
                  </Larivaar>
                </div>
              )}
          </Link>

          <div className="clear" />

          {transliterationLanguages.includes('english') && (
            <p className="transliteration english">
              {transliterationMap['english'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('hindi') && (
            <p className="transliteration hindi">
              {transliterationMap['hindi'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('shahmukhi') && (
            <p className="transliteration shahmukhi">
              {transliterationMap['shahmukhi'](shabad)}
            </p>
          )}

          {transliterationLanguages.includes('IPA') && (
            <p className="transliteration IPA">
              {transliterationMap['IPA'](shabad)}
            </p>
          )}

          {translationLanguages.includes('punjabi') && (
            <blockquote className="translation punjabi gurbani-font">
              {unicode ? (
                <div className="unicode">
                  {translationMap['punjabi'](shabad).unicode}
                </div>
              ) : (
                  <div className="gurlipi">
                    {translationMap['punjabi'](shabad).gurmukhi}
                  </div>
                )}
            </blockquote>
          )}

          {translationLanguages.includes('english') && (
            <blockquote className="translation english">
              {isSearchTypeEnglishWord ?
                <Larivaar
                  larivaarAssist={false}
                  enable={false}
                  unicode={false}
                  highlightIndex={highlightIndex}
                  query={q}
                  type={type}
                >
                  {shabadEnglishTranslation}
                </Larivaar>

                : shabadEnglishTranslation
              }
            </blockquote>
          )}

          {translationLanguages.includes('spanish') && (
            <blockquote className="translation spanish">
              {translationMap['spanish'](shabad)}
            </blockquote>
          )}

          <div className="meta flex wrap">
            {presentationalSource && <a href="#">{presentationalSource}</a>}

            <a href="#">{getWriter(shabad)['english']}</a>

            {getRaag(shabad)['english'] === 'No Raag' ||
              getRaag(shabad)['english'] === null ? (
                ''
              ) : (
                <a href="#">{getRaag(shabad)['english']}</a>
              )}
          </div>
        </li>
      </React.Fragment>
    );
  }
}
