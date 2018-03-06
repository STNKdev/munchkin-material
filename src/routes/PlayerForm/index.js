import { connect } from 'react-redux';
import matchPath from 'react-router-dom/matchPath';
import { createSelector, createStructuredSelector } from 'reselect';

import ScreenLoader from '../../components/ScreenLoader';

const loader = () => import(/* webpackChunkName: "player-form" */ './Screen');

const match = createSelector(
  (state) => state.router.location.pathname,
  (pathname) =>
    matchPath(pathname, { path: '/new' }) ||
    matchPath(pathname, { path: '/edit/:id' }),
);

const mapStateToProps = createStructuredSelector({
  loader: () => loader,
  match,
});

export default connect(mapStateToProps)(ScreenLoader);