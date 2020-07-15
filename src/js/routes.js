/* eslint-disable react/prop-types */

import React from 'react';
import {
  toAngURL,
  getQueryParams,
  getParameterByName,
  throwError,
} from './util';
import { Redirect } from 'react-router-dom';
import RenderPromise from './components/RenderPromise';
import Layout from './components/Layout';
import RedirectExternal from './components/RedirectExternal';
import Home from './pages/Home';
import WebControllerPage from './pages/WebController'
import {
  DEFAULT_SEARCH_RAAG,
  DEFAULT_SEARCH_WRITER,
  DEFAULT_SEARCH_SOURCE,
  DEFAULT_SEARCH_TYPE,
  SEARCH_TYPES,
  SOURCES,
  TEXTS,
} from './constants';

// TODO: Rely on `../../seo/` for titles.

export function NotFound() {
  return (
    <Layout title="Page not found - SikhiToTheMax">
      <RenderPromise
        promise={() =>
          import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
        }
      >
        {({ pending, resolved: { default: NotFoundLayout } = {}, rejected }) =>
          pending ? null : NotFoundLayout ? (
            <NotFoundLayout />
          ) : (
              throwError(
                `We are having trouble in rendering this route.`,
                rejected
              )
            )
        }
      </RenderPromise>
    </Layout>
  );
}

export default [
  {
    path: '/',
    exact: true,
    render(props) {
      return (
        <Layout title="SikhiToTheMax" isHome {...props}>
          <Home {...props} />
        </Layout>
      );
    },
  },
  {
    path: '/terms-of-service',
    render(props) {
      return (
        <Layout title="Terms Of Service" {...props}>
          <RenderPromise
            promise={() =>
              import(
                /* webpackChunkName: "TermsOfService" */ './pages/TermsOfService'
              )
            }
          >
            {({
              pending,
              resolved: { default: TermsOfService } = {},
              rejected,
            }) =>
              pending ? null : TermsOfService ? (
                <TermsOfService {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/about',
    render(props) {
      return (
        <Layout title="About - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "About" */ './pages/About')
            }
          >
            {({ pending, resolved: { default: About } = {}, rejected }) =>
              pending ? null : About ? (
                <About {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/ang',
    render(props) {
      const [ang, source, highlight] = ['ang', 'source', 'highlight'].map(v =>
        getParameterByName(v)
      );

      return (
        <Layout
          defaultQuery={ang}
          title={`Ang ${ang} of ${SOURCES[source] ||
            SOURCES.G} Ang/Page Viewer - SikhiToTheMax`}
          isAng={true}
          {...props}
        >
          <RenderPromise
            promise={() => import(/* webpackChunkName: "Ang" */ './pages/Ang')}
          >
            {({ pending, resolved: { default: Ang } = {}, rejected }) =>
              pending ? null : Ang ? (
                <Ang
                  ang={parseInt(ang, 10)}
                  source={source}
                  highlight={
                    highlight === undefined
                      ? undefined
                      : parseInt(highlight, 10)
                  }
                  {...props}
                />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/index',
    render(props) {
      return (
        <Layout title="Index - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(
                /* webpackChunkName: "GranthIndex" */ './pages/GranthIndex'
              )
            }
          >
            {({ pending, resolved: { default: Index } = {}, rejected }) =>
              pending ? null : Index ? (
                <Index {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/sundar-gutka',
    render(props) {
      return (
        <Layout title="Sundar Gutka - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(
                /* webpackChunkName: "SundarGutka" */ './pages/SundarGutka'
              )
            }
          >
            {({ pending, resolved: { default: SundarGutka } = {}, rejected }) =>
              pending ? null : SundarGutka ? (
                <SundarGutka {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/amrit-keertan/shabads/:shabadId',
    render(props) {
      return (
        <Layout title="Amrit Keertan shabads - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(
                /* webpackChunkName: "AmritKeertan" */ './pages/AmritKeertanShabads'
              )
            }
          >
            {({ pending, resolved: { AmritKeertanShabads } = {}, rejected }) =>
              pending ? null : AmritKeertanShabads ? (
                <AmritKeertanShabads {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    }
  },
  {
    path: '/help',
    render(props) {
      return (
        <Layout title="Help - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Help" */ './pages/Help')
            }
          >
            {({ pending, resolved: { default: Help } = {}, rejected }) =>
              pending ? null : Help ? (
                <Help {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/hukamnama',
    render(props) {
      const date = getParameterByName('date') || 'today';
      return (
        <Layout title="Hukamnama - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Hukamnama" */ './pages/Hukamnama')
            }
          >
            {({ pending, resolved: { default: Hukamnama } = {}, rejected }) =>
              pending ? null : Hukamnama ? (
                <Hukamnama date={date} {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/sync',
    render(props) {
      return (
        <Layout title="Sync - SikhiToTheMax" {...props}>
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Sync" */ './pages/Sync')
            }
          >
            {({ pending, resolved: { default: Sync } = {}, rejected }) =>
              pending ? null : Sync ? (
                <Sync {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/search',
    render(props) {
      const {
        location: { search },
      } = props;
      const params = ['type', 'source', 'q', 'offset', 'raag', 'writer'];

      const [
        type = DEFAULT_SEARCH_TYPE,
        source = DEFAULT_SEARCH_SOURCE,
        q = '',
        offset = 1,
        raag = DEFAULT_SEARCH_RAAG,
        writer = DEFAULT_SEARCH_WRITER,
      ] = params.map(v => getParameterByName(v, search));

      const shabadQueryParams = {
        q,
        raag: parseInt(raag),
        writer: parseInt(writer),
        source: parseInt(source),
        offset: parseInt(offset),
      }

      if (parseInt(type, 10) === SEARCH_TYPES.ANG) {
        return <Redirect to={toAngURL({ ang: q, source })} />;
      }

      return (
        <Layout
          title="Search Results - SikhiToTheMax"
          defaultQuery={q}
          {...shabadQueryParams}
          {...props}
        >
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Search" */ './pages/Search')
            }
          >
            {({ pending, resolved: { default: Search } = {}, rejected }) =>
              pending ? null : Search ? (
                <Search
                  q={q && decodeURIComponent(q)}
                  {...shabadQueryParams}
                  {...props}
                />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/shabad',
    render(props) {
      const {
        location: { search },
      } = props;

      if (location.search === '') {
        return <Redirect to="/random" />;
      }

      const [random, id, q, type, source, raag, writer, highlight] = [
        'random',
        'id',
        'q',
        'type',
        'source',
        'raag',
        'writer',
        'highlight',
      ].map(v => getParameterByName(v, search));

      const otherProps = {
        id,
        q,
        type,
        source: source !== undefined ? parseInt(source) : DEFAULT_SEARCH_SOURCE,
        raag: raag !== undefined ? parseInt(raag) : DEFAULT_SEARCH_RAAG,
        writer: writer !== undefined ? parseInt(writer) : DEFAULT_SEARCH_WRITER,
        random: random !== undefined && random === '' ? true : false,
        highlight:
          highlight === undefined ? undefined : parseInt(highlight, 10),
      };

      return (
        <Layout
          title="Shabad - SikhiToTheMax"
          defaultQuery={q}
          {...props}
          {...otherProps}
        >
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Shabad" */ './pages/Shabad')
            }
          >
            {({ pending, resolved: { default: Shabad } = {}, rejected }) =>
              pending ? null : Shabad ? (
                <Shabad {...otherProps} {...props} />
              ) : (
                  throwError(
                    `We are having trouble in rendering this route.`,
                    rejected
                  )
                )
            }
          </RenderPromise>
        </Layout>
      );
    },
  },
  {
    path: '/random',
    render() {
      return <Redirect to="/shabad?random" />;
    },
  },
  {
    path: ['/control/:namespaceString', '/control'],
    render(props) {
      const { match: { params: { namespaceString } } } = props;
      const codeRegex = new RegExp('[A-Z,a-z]{3}-[A-Z,a-z]{3}');
      return (
        <Layout title={`${TEXTS.CONTROLLER} - SikhiToTheMax`} isController={true} {...props} >
          <WebControllerPage namespaceString={codeRegex.test(namespaceString) ? namespaceString : ''} />
        </ Layout>
      )
    },
  },
  {
    path: '/search.asp',
    render() {
      return <Redirect to="/" />;
    },
  },
  {
    path: '/page.asp',
    render() {
      const query = getQueryParams();
      let url = '';

      if (query.SourceID && query.PageNo) {
        url = toAngURL({ ang: query.PageNo, source: query.SourceID });
      } else if (query.ShabadID) {
        url = `/shabad?id=${query.ShabadID}`;
      } else if (query.random) {
        url = '/shabad?random';
      }
      return <Redirect to={url} />;
    },
  },
  {
    path: '/rehat.asp',
    render() {
      return (
        <Layout>
          <RedirectExternal
            to="https://khalisfoundation.org/portfolio/maryada/"
            name="Maryada page"
          />
        </Layout>
      );
    },
  },
  {
    path: '/tabla.asp',
    render() {
      return (
        <Layout>
          <RedirectExternal to="https://tabla.pro" name="Tabla Page" />
        </Layout>
      );
    },
  },
];
