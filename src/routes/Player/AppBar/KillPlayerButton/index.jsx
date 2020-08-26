import { Tooltip } from '@material-ui/core';
import { Skull } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import TopIconButton from '../../../../components/TopIconButton';
import { killPlayer } from '../../../../ducks/players';
import { setUndo, UNDO_KILL_PLAYER } from '../../../../ducks/undo';

const displayName = 'KillPlayerButton';

const messages = defineMessages({
  kill: {
    id: 'kill',
    defaultMessage: 'Kill',
  },
});

const onKill = (playerId) => (dispatch, getState) => {
  const player = getState().players[playerId];

  dispatch(killPlayer(playerId));
  dispatch(
    setUndo({
      type: UNDO_KILL_PLAYER,
      player,
    }),
  );
};

const KillPlayerButton = ({ playerId, ...props }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const players = useSelector((state) => state.players);
  const disabled = players[playerId].gear === 0;

  const button = (
    <TopIconButton
      disabled={disabled}
      onClick={() => dispatch(onKill(playerId))}
      {...props}
    >
      <Skull />
    </TopIconButton>
  );

  if (disabled) {
    return button;
  }

  return <Tooltip title={intl.formatMessage(messages.kill)}>{button}</Tooltip>;
};

KillPlayerButton.propTypes = {
  playerId: PropTypes.string.isRequired,
};

KillPlayerButton.displayName = displayName;

export default KillPlayerButton;
