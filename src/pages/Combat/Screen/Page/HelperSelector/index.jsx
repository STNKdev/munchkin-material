import React from 'react';
import { connect } from 'react-redux';
import Route from 'react-router-dom/Route';
import { goBack } from 'connected-react-router/lib/actions';
import { setCombatHelper } from 'munchkin-core/lib/actions';

import Component from './Component';

const mapStateToProps = (state) => ({
  helpers: state.playerList
    .filter((id) => id !== state.combat.playerId)
    .map((id) => state.players[id]),
});

const mapDispatchToProps = {
  onClose: goBack,
  onSelect: (id) => (dispatch) => {
    dispatch(setCombatHelper(id));
    dispatch(goBack());
  },
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(
  Component,
);

const HelperSelector = (props) => (
  <Route exact path="/player/:id/combat/add/helper">
    {({ match }) => <ConnectedComponent {...props} open={!!match} />}
  </Route>
);

export default HelperSelector;
