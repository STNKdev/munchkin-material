import { connect } from 'react-redux';
import matchPath from 'react-router-dom/matchPath';
import { goBack, push, replace } from 'connected-react-router/lib/actions';
import { createSelector, createStructuredSelector } from 'reselect';
import { addMonster } from 'munchkin-core/lib/ducks/monsters';
import createMonster from 'munchkin-core/lib/utils/createMonster';

import Component from './Component';

const expanded = createSelector(
  (state) => state.router.location.pathname,
  (pathname) =>
    Boolean(
      matchPath(pathname, { exact: true, path: '/player/:id/combat/add' }),
    ),
);

const mapStateToProps = createStructuredSelector({
  expanded,
  helper: (state) => !state.combat.helperId && state.playerList.length > 1,
  playerId: (state) => state.combat.playerId,
});

const mapDispatchToProps = {
  onAdd: (playerId) => push(`/player/${playerId}/combat/add`),
  onBackdropClick: goBack,
  onHelperClick: (playerId) => replace(`/player/${playerId}/combat/add/helper`),
  onMonsterAdd: (back) => (dispatch) => {
    dispatch(addMonster(createMonster()));

    if (back) {
      dispatch(goBack());
    }
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
