import { connect } from 'react-redux';
import { goBack, push } from 'connected-react-router';

import { togglePlayer, unselectAllPlayers } from '../../../../../../ducks/app';
import { EDIT, MULTI } from '../../../../modes';
import { modeSelector } from '../../../../selectors';

import Component from './Component';

const mapStateToProps = (state, ownProps) => {
  const { playerId } = ownProps;
  const mode = modeSelector(state);

  return {
    mode,
    player: state.players[playerId],
    selected: mode === MULTI && state.app.selectedPlayerIds.includes(playerId),
  };
};

const onMultiSelectActivate = (playerId) => (dispatch) => {
  dispatch(unselectAllPlayers());
  dispatch(togglePlayer(playerId));
  dispatch(push(`/${MULTI}`));
};

const onPlayerEdit = (playerId) => push(`/${EDIT}/${playerId}`);

const onPlayerSelect = (playerId) => push(`/player/${playerId}`);

const onPlayerToggle = (playerId) => (dispatch, getState) => {
  dispatch(togglePlayer(playerId));

  const {
    app: { selectedPlayerIds },
  } = getState();

  if (selectedPlayerIds.length === 0) {
    dispatch(goBack());
  }
};

const mapDispatchToProps = {
  onMultiSelectActivate,
  onPlayerEdit,
  onPlayerSelect,
  onPlayerToggle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
