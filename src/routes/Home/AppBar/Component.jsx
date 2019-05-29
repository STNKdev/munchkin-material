import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { Check, Close, Delete, FlagCheckered, Pencil } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import AppBar from '../../../components/TopAppBar';
import DiceButton from '../../../components/dice/Button';
import Title from '../../../components/Title';
import TopIconButton from '../../../components/TopIconButton';

import * as modes from '../modes';
import modeType from '../modeType';

import MenuButton from './MenuButton';
import ResetButton from './ResetButton';

const messages = defineMessages({
  edit: {
    id: 'player.list.edit',
    defaultMessage: 'Edit',
  },
});

const HomeAppBar = ({
  empty,
  intl,
  mode,
  onMultiSelectDeactivate,
  onPlayersDelete,
  onToggleEditClick,
  onTurnFinish,
  selectedPlayerIds,
  singleMode,
}) => {
  const editMode = mode === modes.EDIT;
  const multiMode = mode === modes.MULTI;
  const buttonColor = multiMode ? 'default' : 'inherit';

  const editTitle = intl.formatMessage(messages.edit);

  let title = (
    <FormattedMessage defaultMessage="Munchkins" id="player.list.title" />
  );

  if (multiMode) {
    title = selectedPlayerIds.length;
  }

  if (singleMode) {
    title = (
      <FormattedMessage defaultMessage="Munchkin" id="home.single.title" />
    );
  }

  return (
    <AppBar color={multiMode ? 'default' : 'primary'}>
      {multiMode ? (
        <TopIconButton edge="start" onClick={onMultiSelectDeactivate}>
          <Close />
        </TopIconButton>
      ) : (
        <MenuButton color="inherit" edge="start" />
      )}
      <Title>{title}</Title>

      {(singleMode || (!mode && !empty)) && <ResetButton edge="end" />}

      {(!mode || singleMode) && <DiceButton color={buttonColor} edge="end" />}

      {!empty && !multiMode && !singleMode && (
        <Tooltip title={editTitle}>
          <TopIconButton
            aria-label={editTitle}
            color={buttonColor}
            edge="end"
            onClick={() => onToggleEditClick(mode)}
          >
            {editMode ? <Check /> : <Pencil />}
          </TopIconButton>
        </Tooltip>
      )}

      {multiMode && (
        <TopIconButton
          edge="end"
          onClick={() => onPlayersDelete(selectedPlayerIds)}
        >
          <Delete />
        </TopIconButton>
      )}

      {singleMode && (
        <TopIconButton color="inherit" edge="end" onClick={onTurnFinish}>
          <FlagCheckered />
        </TopIconButton>
      )}
    </AppBar>
  );
};

HomeAppBar.propTypes = {
  empty: PropTypes.bool,
  intl: intlShape.isRequired,
  mode: modeType,
  onMultiSelectDeactivate: PropTypes.func,
  onPlayersDelete: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  onTurnFinish: PropTypes.func,
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.string),
  singleMode: PropTypes.bool,
};

HomeAppBar.defaultProps = {
  empty: false,
  mode: null,
  onMultiSelectDeactivate: noop,
  onPlayersDelete: noop,
  onToggleEditClick: noop,
  onTurnFinish: noop,
  selectedPlayerIds: [],
  singleMode: false,
};

export default injectIntl(HomeAppBar);
