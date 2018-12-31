import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createSelector, createStructuredSelector } from 'reselect';
import { flow, get, isEqual } from 'lodash/fp';

import { updatePlayer } from 'munchkin-core';

import { applyUndo, removeUndo, UNDO_RESET_PLAYERS } from '../../../ducks/undo';
import Component from './Component';

const getUndoType = get(['undo', 'type']);

const message = createSelector(
  getUndoType,
  (type) => {
    switch (type) {
      case UNDO_RESET_PLAYERS:
        return (
          <FormattedMessage
            id="undo.resetPlayers"
            defaultMessage="Players have been reset"
          />
        );

      default:
        return null;
    }
  },
);

const open = flow(
  getUndoType,
  isEqual(UNDO_RESET_PLAYERS),
);

const mapStateToProps = createStructuredSelector({
  message,
  open,
});

const mapDispatchToProps = {
  onClose: (event, reason) => (dispatch, getState) => {
    if (reason === 'undo') {
      const players = get(['undo', 'players'], getState());

      dispatch(applyUndo());

      players.forEach((player) => dispatch(updatePlayer(player)));
    } else {
      dispatch(removeUndo());
    }
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
