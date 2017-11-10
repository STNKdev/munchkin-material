import { change } from 'redux-form';
import { goBack, push } from 'react-router-redux';
import actions from 'munchkin-core/es/actions';
import Player from 'munchkin-core/es/classes/Player';

import { PLAYER_FORM } from '../constants';
import * as types from '../constants/actionTypes';

export const disableDiceButtonTooltipTriggerFocus = () => ({
  type: types.DISABLE_DICE_BUTTON_TOOLTIP_TRIGGER_FOCUS,
});

export const enableDiceButtonTooltipTriggerFocus = () => ({
  type: types.ENABLE_DICE_BUTTON_TOOLTIP_TRIGGER_FOCUS,
});

export const goToCombat = playerId => (dispatch, getState) => {
  const { app: { fullVersion } } = getState();

  if (fullVersion) {
    if (playerId !== getState().combat.playerId) {
      dispatch(actions.startCombat(playerId));
    }

    dispatch(push(`/player/${playerId}/combat`));
  }
};

export const importContact = () => (dispatch) => {
  navigator.contacts.pickContact(({ displayName, photos }) => {
    const form = PLAYER_FORM;

    dispatch(change(form, 'name', displayName));

    if (photos) {
      dispatch(change(form, 'avatar', photos[0].value));
    }
  });
};

export const movePlayer = (oldPosition, newPosition) => ({
  type: types.MOVE_PLAYER,
  oldPosition,
  newPosition,
});

export const removeHelper = () => (dispatch) => {
  dispatch(actions.setCombatHelper(null));
  dispatch(actions.setCombatHelperBonus(0));
};

export const resetDice = () => ({
  type: types.RESET_DICE,
});

export const setActivePlayer = id => ({
  type: types.SET_ACTIVE_PLAYER,
  id,
});

export const setFullVersion = (fullVersion = true) => ({
  type: types.SET_FULL_VERSION,
  fullVersion,
});

export const setLocale = locale => ({
  type: types.SET_LOCALE,
  locale,
});

export const setMultiMode = multiMode => ({
  type: types.SET_MULTI_MODE,
  multiMode,
});

export const setPlayerColor = ({ color, id }) => ({
  type: types.SET_PLAYER_COLOR,
  color,
  id,
});

export const submitPlayer = values => (dispatch) => {
  const { color, id, name = '' } = values;

  if (name.trim()) {
    const player = new Player(values);

    if (id) {
      dispatch(actions.updatePlayer(player));
    } else {
      dispatch(actions.addPlayer(player));
    }

    dispatch(setPlayerColor({
      id: player.id,
      color,
    }));

    dispatch(setActivePlayer(player.id));
  }

  dispatch(goBack());
};

export const throwDice = () => ({
  type: types.THROW_DICE,
  dice: Math.floor(Math.random() * 6) + 1,
});

export const toggleEditMode = force => ({
  type: types.TOGGLE_EDIT_MODE,
  editMode: force,
});

export const togglePlayer = id => ({
  type: types.TOGGLE_PLAYER,
  id,
});

export default {
  ...actions,
  goToCombat,
  movePlayer,
  resetDice,
  removeHelper,
  setActivePlayer,
  setFullVersion,
  setLocale,
  setMultiMode,
  throwDice,
  toggleEditMode,
  togglePlayer,
};
