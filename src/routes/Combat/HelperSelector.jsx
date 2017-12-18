import React from 'react';
import connect from 'react-redux/es/connect/connect';
import Route from 'react-router-dom/es/Route';
import { go, goBack } from 'connected-react-router/lib/actions';
import { setCombatHelper } from 'munchkin-core/es/actions';

import HelperSelector from '../../components/Combat/HelperSelector';

const mapStateToProps = state => ({
  helpers: state.playerList
    .filter(id => id !== state.combat.playerId)
    .map(id => state.players[id]),
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(goBack()),
  onSelect: (id) => {
    dispatch(setCombatHelper(id));
    dispatch(go(-2));
  },
});

const CombatHelperSelector = props => (
  <Route exact path="/player/:id/combat/add/helper">
    {({ match }) => (
      <HelperSelector {...props} open={!!match} />
    )}
  </Route>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  { pure: false },
)(CombatHelperSelector);
