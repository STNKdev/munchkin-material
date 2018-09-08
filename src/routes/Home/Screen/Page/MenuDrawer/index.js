import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router';
import { isEmpty, isEqual } from 'lodash';

import { getQuery, stringifyQuery } from '../../../../../utils/location';
import { ios } from '../../../../../utils/platforms';

import Component from './Component';

const mapStateToProps = (state) => {
  const search = getQuery(state);

  return {
    enable: !ios && (isEmpty(search) || isEqual(search, { menu: '' })),
    open: search.menu !== undefined,
  };
};

const mapDispatchToProps = {
  onClose: goBack,
  onOpen: () => push({ search: stringifyQuery({ menu: null }) }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
