import React from 'react';
import { connect } from 'react-redux';
import { Route, matchPath } from 'react-router-dom';
import { goBack, push } from 'react-router-redux';
import { addMonster } from 'munchkin-core/es/actions';
import Monster from 'munchkin-core/es/classes/Monster';

import HelperButton from '../../components/Fab/HelperButton';
import Transition from '../../components/Fab/Transition';

const mapStateToProps = state => ({
  helper: !state.combat.helperId && state.playerList.length > 1,
  playerId: state.combat.playerId,
});

const mapDispatchToProps = dispatch => ({
  onAdd: playerId => dispatch(push(`/player/${playerId}/combat/add`)),
  onBackdropClick: () => dispatch(goBack()),
  onMonsterAdd: (back) => {
    dispatch(addMonster(new Monster()));

    if (back) {
      dispatch(goBack());
    }
  },
});

const CombatHelperButton = props => (
  <Route path="/player/:id/combat">
    {({ location, match }) => (
      <Transition in={Boolean(match)}>
        <HelperButton
          expanded={Boolean(matchPath(location.pathname, { path: '/player/:id/combat/add' }))}
          {...props}
        />
      </Transition>
    )}
  </Route>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { pure: false },
)(CombatHelperButton);
