import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';

import Component from './Component';

const mapDispatchToProps = {
  onCancel: goBack,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Component);
