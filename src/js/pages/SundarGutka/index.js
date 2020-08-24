/* globals BANIS_API_URL */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SmartBanner from 'react-smartbanner';

import { RenderShabads } from '@/components/RenderShabads';
import { pageView } from '@/util/analytics';
import BreadCrumb from '@/components/Breadcrumb';
import { TEXTS } from '@/constants';
import { sanitizeBaani, baaniNameToIdMapper } from './utils';
class SundarGutka extends React.PureComponent {
  static propTypes = {
    transliterationLanguages: PropTypes.array.isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
    }),
    match: PropTypes.object.isRequired,
  };

  static HOME_LINKS = [{ title: TEXTS.URIS.SUNDAR_GUTKA }];

  static BAANI_LINKS = [
    { url: '/sundar-gutka', title: TEXTS.URIS.SUNDAR_GUTKA },
    { title: TEXTS.URIS.SUNDAR_GUTKA_BAANI },
  ];

  $details = React.createRef();

  state = {
    baanies: null,
    q: '',
  };

  render() {
    const {
      props: {
        location: { pathname },
        match: { isExact: isSundarGutkaHome },
        transliterationLanguages,
      },
      state: { baanies, q },
    } = this;

    const links = isSundarGutkaHome
      ? SundarGutka.HOME_LINKS
      : SundarGutka.BAANI_LINKS;

    //eg /sundar-gutka/japji-sahib, picked up japji-sahib from this
    const baaniIdOrName = pathname.split('/')[2];
    const baaniId = baanies ? baaniNameToIdMapper(baanies, baaniIdOrName) : baaniIdOrName;

    return (
      <div className="row" id="content-root">
        <SmartBanner key="sundarGutka" title={'Sundar Gutka'} />
        <BreadCrumb links={links} />
        <div id="help">
          {baanies === null ? (
            <div className="spinner" />
          ) : isSundarGutkaHome ? (
            <div className="wrapper" style={{ width: '100%', }}>
              <h2>{TEXTS.SUNDAR_GUTKA_HEADER}</h2>
              <input
                type="search"
                name="baani-query"
                className="search"
                value={q}
                autoCorrect="off"
                autoCapitalize="none"
                onChange={this.handleSearch}
                placeholder="Search"
              />
              <div className="sgCards">
                {baanies
                  .filter(SundarGutka.filter(q))
                  .map(({ ID, transliteration, gurmukhiUni }, i) => (
                    <Link
                      to={`/sundar-gutka/${sanitizeBaani(transliteration).split(' ').join('-')}`}
                      key={ID}
                    >
                      <div
                        className="sgCard"
                        style={{
                          animationDelay: i < 15 ? `${20 * i}ms` : 0,
                        }}
                      >
                        <div
                          className="sgCardGurmukhi"
                        >{gurmukhiUni}{' '}</div>

                        <div
                          className="sgCardEnglish"
                        >{transliterationLanguages.includes('english') &&
                          `${sanitizeBaani(transliteration)}`}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ) : (
                <Route
                  path={this.props.match.url + '/:baaniIdOrName'}
                  render={routeProps => <RenderShabads sundarGutkaBaaniId={baaniId} {...routeProps} />}
                />
              )}
        </div>
      </div>
    );
  }

  static filter = q => i =>
    q === '' ||
    SundarGutka.sanitize(i.transliteration)
      .toLowerCase()
      .includes(q.toLocaleLowerCase());

  static sanitize = t => t.replace(/\(n\)/gi, 'n');

  handleSearch = e => this.setState({ q: e.currentTarget.value });

  componentDidUpdate({
    match: { isExact: wasExact },
    location: { pathname: prevLocation },
  }) {
    if (wasExact === false && this.props.match.isExact) {
      pageView('/sundar-gutka');
    }
    if (prevLocation !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    if (this.props.match.isExact) {
      pageView('/sundar-gutka');
    }

    fetch(BANIS_API_URL)
      .then(r => r.json())
      .then(baanies =>
        this.setState({
          baanies,
          currentBaaniId: baanies[0].ID,
        })
      );
  }
}

export default connect(({ transliterationLanguages }) => ({
  transliterationLanguages,
}))(SundarGutka);
