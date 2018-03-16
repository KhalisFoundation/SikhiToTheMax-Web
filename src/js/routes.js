/* eslint-disable react/prop-types */

import React from 'react';
import { getQueryParams, getParameterByName, throwError } from './util';
import { Redirect } from 'react-router-dom';
import RenderPromise from './components/RenderPromise';
import Layout from './components/Layout';
import Home from './pages/Home';
import { DEFAULT_SEARCH_SOURCE, DEFAULT_SEARCH_TYPE } from './constants';

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
    render() {
      return (
        <Layout title="SikhiToTheMax" isHome>
          <Home />
        </Layout>
      );
    },
  },
  {
    path: '/terms-of-service',
    render() {
      return (
        <Layout title="Terms Of Service">
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "TermsOfService" */ './pages/TermsOfService')
            }
          >
            {({
              pending,
              resolved: { default: TermsOfService } = {},
              rejected,
            }) =>
              pending ? null : TermsOfService ? (
                <TermsOfService />
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
    render() {
      return (
        <Layout title="About - SikhiToTheMax">
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "About" */ './pages/About')
            }
          >
            {({ pending, resolved: { default: About } = {}, rejected }) =>
              pending ? null : About ? (
                <About />
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
    render() {
      const [ang, source] = ['ang', 'source'].map(v => getParameterByName(v));

      return (
        <Layout q={ang} title="Ang/Page Viewer - SikhiToTheMax">
          <RenderPromise
            promise={() => import(/* webpackChunkName: "Ang" */ './pages/Ang')}
          >
            {({ pending, resolved: { default: Ang } = {}, rejected }) =>
              pending ? null : Ang ? (
                <Ang ang={ang} source={source} />
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
    path: '/help',
    render() {
      return (
        <Layout title="Help - SikhiToTheMax">
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Help" */ './pages/Help')
            }
          >
            {({ pending, resolved: { default: Help } = {}, rejected }) =>
              pending ? null : Help ? (
                <Help />
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
    render() {
      return (
        <Layout title="Hukamnama - SikhiToTheMax">
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Hukamnama" */ './pages/Hukamnama')
            }
          >
            {({ pending, resolved: { default: Hukamnama } = {}, rejected }) =>
              pending ? null : Hukamnama ? (
                <Hukamnama />
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
    render({ location: { search } }) {
      const params = ['type', 'source', 'q', 'offset'];

      const [
        type = DEFAULT_SEARCH_TYPE,
        source = DEFAULT_SEARCH_SOURCE,
        q = '',
        offset = 0,
      ] = params.map(v => getParameterByName(v, search));

      return (
        <Layout defaultQuery={q} title="Search Results - SikhiToTheMax">
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Search" */ './pages/Search')
            }
          >
            {({ pending, resolved: { default: Search } = {}, rejected }) =>
              pending ? null : Search ? (
                <Search
                  q={q}
                  type={parseInt(type, 10)}
                  source={source}
                  offset={parseInt(offset)}
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
    render({ location: { search } }) {
      const [random, id, q, type, highlight] = [
        'random',
        'id',
        'q',
        'type',
        'highlight',
      ].map(v => getParameterByName(v, search));

      const otherProps = {
        id,
        q,
        type,
        random: random !== undefined && random === '' ? true : false,
        highlight:
          highlight === undefined ? undefined : parseInt(highlight, 10),
      };

      return (
        <Layout defaultQuery={q} title="Shabad - SikhiToTheMax">
          <RenderPromise
            promise={() =>
              import(/* webpackChunkName: "Shabad" */ './pages/Shabad')
            }
          >
            {({ pending, resolved: { default: Shabad } = {}, rejected }) =>
              pending ? null : Shabad ? (
                <Shabad {...otherProps} />
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
    path: '/rehat.asp',
    render() {
      return <Redirect to="https://khalisfoundation.org/portfolio/maryada/" />;
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
        url = `/ang?ang=${query.PageNo}&source=${query.SourceID}`;
      } else if (query.ShabadID) {
        url = `/shabad?id=${query.ShabadID}`;
      } else if (query.random) {
        url = '/shabad?random';
      }
      <Redirect to={url} />;
    },
  },
];
