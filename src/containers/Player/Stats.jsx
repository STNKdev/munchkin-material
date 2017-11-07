import { connectAdvanced } from 'react-redux';
import { createSelector } from 'reselect';
import { GENDER } from 'munchkin-core';
import {
  decrementPlayerGear,
  decrementPlayerLevel,
  incrementPlayerGear,
  incrementPlayerLevel,
  setPlayerGender,
} from 'munchkin-core/es/actions';

import Stats from '../../components/Player/Stats';
import { playerInstance } from '../../utils/propTypes';

const selector = createSelector(
  ownProps => ownProps.player,
  (ownProps, dispatch) => dispatch,
  (player, dispatch) => ({
    onGearDecrement: () => dispatch(decrementPlayerGear(player)),
    onGearIncrement: () => dispatch(incrementPlayerGear(player)),
    onGenderToggle: () => {
      const { gender } = player;

      if (gender === GENDER.MALE) {
        dispatch(setPlayerGender(player, GENDER.FEMALE));
      } else if (gender === GENDER.FEMALE) {
        dispatch(setPlayerGender(player, GENDER.MALE));
      }
    },
    onLevelDecrement: () => dispatch(decrementPlayerLevel(player)),
    onLevelIncrement: () => dispatch(incrementPlayerLevel(player)),
  }),
);

const selectorFactory = dispatch => (state, ownProps) => ({
  ...ownProps,
  ...selector(ownProps, dispatch),
});

const PlayerStats = connectAdvanced(selectorFactory)(Stats);

PlayerStats.propTypes = {
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
};

export default PlayerStats;
