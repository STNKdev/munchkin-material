import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { goBack, push } from 'connected-react-router';
import { ReorderHorizontal } from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React, { forwardRef, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-use-gesture';

import PlayerAvatar from '../../../../components/PlayerAvatar';
import PlayerListItemText from '../../../../components/PlayerListItemText';
import { togglePlayer, unselectAllPlayers } from '../../../../ducks/app';
import { getQuery, stringifyQuery } from '../../../../utils/location';
import { EDIT, MULTI } from '../../modes';

const displayName = 'HomePlayerListItem';

const onMultiSelectActivate = (playerId) => (dispatch) => {
  dispatch(unselectAllPlayers());
  dispatch(togglePlayer(playerId));
  dispatch(
    push({
      search: stringifyQuery({
        [MULTI]: null,
      }),
    }),
  );
};

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

const HomePlayerListItem = forwardRef(
  ({ dragHandleProps, playerId, ...rest }, ref) => {
    const dispatch = useDispatch();

    const avatarRef = useRef(null);
    const reorderRef = useRef(null);
    const pressTimeoutRef = useRef(0);

    const query = useSelector(getQuery);
    const editMode = query[EDIT] !== undefined;
    const multiMode = query[MULTI] !== undefined;

    const selectedPlayerIds = useSelector(
      (state) => state.app.selectedPlayerIds,
    );
    const selected = multiMode && selectedPlayerIds.includes(playerId);

    const players = useSelector((state) => state.players);
    const player = players[playerId];

    const onClick = (event) => {
      if (
        editMode &&
        reorderRef.current &&
        reorderRef.current.contains(event.target)
      ) {
        return;
      }

      if (editMode) {
        dispatch(
          push({
            search: stringifyQuery({
              ...query,
              player: playerId,
            }),
          }),
        );
      } else if (multiMode) {
        dispatch(onPlayerToggle(playerId));
      } else if (
        avatarRef.current &&
        avatarRef.current.contains(event.target)
      ) {
        dispatch(onMultiSelectActivate(playerId));
      } else {
        dispatch(onPlayerSelect(playerId));
      }
    };

    const bind = useDrag((state) => {
      const { distance, elapsedTime, event, first, tap } = state;

      const { target } = event;

      if (first) {
        event.preventDefault();

        pressTimeoutRef.current = setTimeout(() => {
          pressTimeoutRef.current = 0;

          const avatarNode = avatarRef.current;

          if (
            !(editMode || multiMode) &&
            (!avatarNode || !avatarNode.contains(target))
          ) {
            if (navigator.vibrate) {
              navigator.vibrate(20);
            }

            dispatch(onMultiSelectActivate(playerId));
          }
        }, 500);
      }

      if (!first && distance && pressTimeoutRef.current) {
        clearTimeout(pressTimeoutRef.current);

        pressTimeoutRef.current = 0;
      }

      if (tap && elapsedTime < 500) {
        if (pressTimeoutRef.current) {
          clearTimeout(pressTimeoutRef.current);

          pressTimeoutRef.current = 0;
        }

        onClick(event);
      }
    });

    const onKeyDown = (event) => {
      if (event.key === 'Enter') {
        onClick(event);
      }
    };

    return (
      <ListItem
        ref={ref}
        button
        component={editMode ? 'div' : 'li'}
        data-screenshots="player-list-item"
        {...rest}
        {...bind()}
        onKeyDown={onKeyDown}
      >
        <ListItemAvatar>
          <PlayerAvatar
            ref={avatarRef}
            color={player.color}
            name={player.name}
            selected={multiMode && selected}
          />
        </ListItemAvatar>

        <PlayerListItemText hideStats={editMode} player={player} />

        {editMode && (
          <ListItemSecondaryAction>
            <IconButton
              ref={reorderRef}
              disableRipple
              edge="end"
              {...dragHandleProps}
            >
              <ReorderHorizontal />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  },
);

HomePlayerListItem.propTypes = {
  dragHandleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  playerId: PropTypes.string.isRequired,
};

HomePlayerListItem.defaultProps = {
  dragHandleProps: undefined,
};

HomePlayerListItem.displayName = displayName;

export default HomePlayerListItem;
