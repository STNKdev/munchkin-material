import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { IconButton, Tooltip } from '@material-ui/core';
import { DiceMultiple } from 'mdi-material-ui';

const messages = defineMessages({
  dice: {
    id: 'dice',
    defaultMessage: 'Dice',
  },
});

const DiceIconButton = ({ intl, ...props }) => (
  <Tooltip title={intl.formatMessage(messages.dice)}>
    <IconButton {...props}>
      <DiceMultiple />
    </IconButton>
  </Tooltip>
);

export default injectIntl(DiceIconButton);
