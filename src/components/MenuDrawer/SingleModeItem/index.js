import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash/fp';

import { setSingleMode } from '../../../ducks/app';

import Component from './Component';

const mapStateToProps = createStructuredSelector({
  singleMode: get(['app', 'singleMode']),
});

const mapDispatchToProps = {
  onChange: (singleMode) => async (dispatch) => {
    if (singleMode) {
      try {
        await dispatch(setSingleMode(singleMode));
        dispatch(goBack());
      } catch (error) {}
    } else {
      dispatch(setSingleMode(singleMode));
      dispatch(goBack());
    }
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
