import { replace } from 'connected-react-router';
import { connect } from 'react-redux';

import { stringifyQuery } from '../../../utils/location';

import Component from './Component';

const mapDispatchToProps = {
  onClick: () => replace({ search: stringifyQuery({ theme: null }) }),
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
