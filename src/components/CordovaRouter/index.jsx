import PropTypes from 'prop-types';
import { useLayoutEffect, useReducer } from 'react';
import { Router } from 'react-router-dom';

const displayName = 'CordovaRouter';

import history from './history';

const CordovaRouter = ({ children }) => {
  let [state, dispatch] = useReducer((_, action) => action, {
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(dispatch), []);

  return (
    <Router action={state.action} location={state.location} navigator={history}>
      {children}
    </Router>
  );
};

CordovaRouter.propTypes = {
  children: PropTypes.node,
};

CordovaRouter.displayName = displayName;

export default CordovaRouter;
