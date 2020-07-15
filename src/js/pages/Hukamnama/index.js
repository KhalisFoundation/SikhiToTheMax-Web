/* globals API_URL */
import React from 'react';
import { buildApiUrl } from '@sttm/banidb';

import PageLoader from '../PageLoader';
import PropTypes from 'prop-types';
import Layout from './Layout';
import { Spinner } from '@/components/Spinner';

export default class Hukamnama extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
    }),
    date: PropTypes.string,
    match: PropTypes.object.isRequired,
  };
  render() {
    const url = buildApiUrl({ hukam: this.props.date, API_URL });

    return (
      <PageLoader url={url}>
        {({ loading, data }) => (loading ? <Spinner /> : <Layout data={data} />)}
      </PageLoader>
    );
  }
}
