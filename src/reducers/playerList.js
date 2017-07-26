import { ADD_PLAYER, REMOVE_PLAYER } from 'munchkin-core/lib/constants/actionTypes';

import { MOVE_PLAYER } from '../constants/actionTypes';

const initialState = [];

const playerList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER: {
      return [
        ...state,
        action.player.id,
      ];
    }

    case MOVE_PLAYER: {
      const { oldPosition, newPosition } = action;
      const movedPlayer = state[oldPosition];
      const playersWithoutMoved = [
        ...state.slice(0, oldPosition),
        ...state.slice(oldPosition + 1),
      ];

      return [
        ...playersWithoutMoved.slice(0, newPosition),
        movedPlayer,
        ...playersWithoutMoved.slice(newPosition),
      ];
    }

    case REMOVE_PLAYER: {
      const index = state.indexOf(action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }

    default:
      return state;
  }
};

export default playerList;
