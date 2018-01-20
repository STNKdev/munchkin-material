import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Route from 'react-router-dom/es/Route';
import withRouter from 'react-router-dom/es/withRouter';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import ScreenLoader from '../../../components/ScreenLoader';

const mapStateToProps = state => ({
  path: state.app.activePlayerId ? '/edit/:id' : '/new',
});

const loader = () => import(/* webpackChunkName: "player-form", webpackMode: "lazy" */ './Screen');

const PlayerForm = ({ path }) => (
  <Route path={path}>
    {({ match }) => (
      <ScreenLoader
        loader={loader}
        match={match}
      />
    )}
  </Route>
);

PlayerForm.propTypes = {
  path: PropTypes.string.isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps),
)(PlayerForm);
