import React from 'react';
import PropTypes from 'prop-types';

// This component uses children as a function pattern
export default class Fetch extends React.PureComponent {
  state = {
    loading: true,
    res: null,
    data: null,
    error: null,
  };

  static defaultProps = {
    transform: r => r.json(),
    options: {},
    timeout: 10000,
  };

  static propTypes = {
    transform: PropTypes.func,
    url: PropTypes.string,
    children: PropTypes.func.isRequired,
    options: PropTypes.object,
    timeout: PropTypes.number,
  };

  componentDidMount() {
    const { url, options, transform, timeout } = this.props;

    this.fetchData(url, options, transform, timeout);
  }

  componentDidUpdate(prevProps) {
    const { url, options, transform } = this.props;

    if (
      prevProps.url !== url ||
      prevProps.options !== options ||
      prevProps.transform !== transform
    ) {
      this.fetchData(url, options, transform);
    }
  }

  fetchData = (url, options, transform, timeout) => {
    this.setState({ loading: true });

    const timeoutPromise = new Promise(function(resolve, reject) {
      setTimeout(reject, timeout, 'Fetch request timed out!');
    });

    // If timeoutPromise completes before fetch the top level catch is executed
    return Promise.race([timeoutPromise, fetch(url, options)])
      .then(res =>
        transform(res)
          .then(data =>
            this.setState({
              loading: false,
              res,
              data,
              error: null,
            })
          )
          .catch(error =>
            this.setState({
              loading: false,
              res,
              data: null,
              error,
            })
          )
      )
      .catch(error =>
        this.setState({
          loading: false,
          data: null,
          error,
        })
      );
  };

  render() {
    return this.props.children(this.state);
  }
}
