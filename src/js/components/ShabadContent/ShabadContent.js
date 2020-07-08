import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalHotKeys } from 'react-hotkeys';

import {
  showToast,
  copyToClipboard,
  clickEvent,
  ACTIONS,
  isShowParagraphModeRoute,
  isShowRelatedShabadsRoute,
  errorEvent
} from '@/util';
import Controls, { supportedMedia } from '@/components/Controls';
import FootNav from '@/components/FootNav';
import Meta from '@/components/Meta';
import ProgressBar from '@/components/ProgressBar';
import Baani from '@/components/Baani';
import { TEXTS, SHABAD_CONTENT_CLASSNAME } from '@/constants';
import RelatedShabads from '@/components/RelatedShabads';
import { getShabadId, getSourceId, getAng } from '@/util/api/shabad';
import { ViewerShortcuts, ViewerShortcutHanders } from '../../Shortcuts';

/**
 *
 *
 * @class Shabad
 * @augments {React.PureComponent<ShabadProps, ShabadState>}
 */
class Shabad extends React.PureComponent {
  /**
   * @typedef {object} ShabadState
   * @property {number} progress of vertical scroll
   *
   * @memberof Shabad
   */
  state = {
    progress: 0,
  };

  static defaultProps = {
    random: false,
    nav: {},
    hideControls: false,
    hideMeta: false,
    controlProps: {},
  };

  /**
   * @typedef {object} ShabadProps
   * @property {array} gurbani
   * @property {number} highlight LineNo of highlighted shabad line
   * @property {ShabadContentTypes} type of shabad
   * @property {{ previous: string, next: string }} nav
   * @property {object} info
   * @property {boolean} [hideMeta=false]
   * @property {boolean} [hideControls=false]
   * @property {{}} controlProps override props passed to <Controls />.
   *
   * TODO: Refactor code to support render props to allow different configurations.
   *
   * @memberof Shabad
   */
  static propTypes = {
    gurbani: PropTypes.array.isRequired,
    highlight: PropTypes.number,
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama', 'sync']).isRequired,
    info: PropTypes.object.isRequired,
    nav: PropTypes.shape({
      previous: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      next: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    hideMeta: PropTypes.bool,
    hideControls: PropTypes.bool,
    controlProps: PropTypes.object,

    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    random: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    transliterationFontSize: PropTypes.number.isRequired,
    translationFontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    showFullScreen: PropTypes.bool,
    paragraphMode: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }
  render() {
    const {
      props: {
        gurbani,
        location,
        nav,
        info,
        type,
        random,
        splitView,
        translationLanguages,
        transliterationLanguages,
        larivaarAssist,
        larivaar,
        highlight,
        unicode,
        fontSize,
        lineHeight,
        translationFontSize,
        transliterationFontSize,
        fontFamily,
        centerAlignGurbani,
        showFullScreen,
        paragraphMode
      },
      handleEmbed,
      handleCopyAll,
    } = this;

    if (random) {
      return <Redirect to={`/shabad?id=${getShabadId(info)}`} />;
    }

    const isParagraphMode = paragraphMode && isShowParagraphModeRoute(location.pathname);
    const isShowRelatedShabads = isShowRelatedShabadsRoute(location.pathname);

    return (
      <GlobalHotKeys keyMap={ViewerShortcuts} handlers={ViewerShortcutHanders} root >
        <React.Fragment >
          {this.props.hideControls === false && (
            <Controls
              media={
                ['shabad', 'hukamnama', 'ang'].includes(type)
                  ? supportedMedia
                  : supportedMedia.filter(
                    m => ['embed', 'copyAll', 'copy'].includes(m) === false
                  )
              }
              onCopyAllClick={handleCopyAll}
              onEmbedClick={handleEmbed}
              {...this.props.controlProps}
            />
          )}
          {this.props.hideMeta === false && (
            <Meta
              isUnicode={unicode}
              info={info}
              nav={nav}
              type={type}
              translationLanguages={translationLanguages}
              transliterationLanguages={transliterationLanguages}
            />
          )}
          <div id="shabad" className="shabad display">
            <div className="shabad-container">
              <Baani
                type={type}
                gurbani={gurbani}
                splitView={splitView}
                unicode={unicode}
                highlight={highlight}
                larivaar={larivaar}
                fontSize={fontSize}
                translationFontSize={translationFontSize}
                transliterationFontSize={transliterationFontSize}
                lineHeight={lineHeight}
                fontFamily={fontFamily}
                larivaarAssist={larivaarAssist}
                translationLanguages={translationLanguages}
                transliterationLanguages={transliterationLanguages}
                centerAlignGurbani={centerAlignGurbani}
                showFullScreen={showFullScreen}
                isParagraphMode={isParagraphMode}
              />

              {this.props.hideMeta === false && (
                <FootNav info={info} type={type} nav={nav} />
              )}

              {isShowRelatedShabads && <RelatedShabads forShabadID={getShabadId(this.props.info)} />}
            </div>
          </div>
          <ProgressBar percent={this.state.progress} />
        </React.Fragment>
      </GlobalHotKeys>
    );
  }

  scrollListener = () => {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const maxY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = parseFloat((y / maxY).toPrecision(2));
      this.setState({ progress });
    });
  };

  componentDidMount() {
    addEventListener('scroll', this.scrollListener, { passive: true });
    this.scrollListener();
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.scrollListener);
  }

  handleCopyAll = () =>
    Promise.resolve(
      document.querySelector(`.${SHABAD_CONTENT_CLASSNAME}`).textContent
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.GURBAANI_COPIED))
      .then(() => clickEvent({ action: ACTIONS.SHARE, label: 'copy-all' }))
      .catch(({ message: label = '' } = {}) =>
        errorEvent({ action: 'copy-all-failure', label })
      );

  handleEmbed = () => {
    const { info, type } = this.props;

    clickEvent({ action: ACTIONS.SHARE, label: 'embed' });

    const attrs = [
      `data-sttm-height="500"`,
      `data-sttm-width="500"`,
      type === 'ang'
        ? `data-sttm-ang="${getAng(info.source)}" data-sttm-source="${
        getSourceId(info)
        }"`
        : `data-sttm-id="${getShabadId(info)}"`,
    ].join(' ');

    Promise.resolve(
      `<div ${attrs}><a href="https://sttm.co/${
      type === 'ang'
        ? 'ang?ang=' + getAng(info.source) + '&source=' + getSourceId(info)
        : 'shabad?id=' + getShabadId(info)
      }">SikhiToTheMax</a></div><script async src="${
      window.location.origin
      }/embed.js"></script>`
    )
      .then(copyToClipboard)
      .then(() => showToast(TEXTS.EMBED_COPIED))
      .catch(() => showToast(TEXTS.EMBED_FAILURE));
  };
}

const stateToProps = state => state;
export default connect(stateToProps)(withRouter(Shabad));
