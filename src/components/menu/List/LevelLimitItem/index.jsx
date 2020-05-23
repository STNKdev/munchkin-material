import { ListItemIcon, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { SwapVertical } from 'mdi-material-ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  MAX_EPIC_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
} from '../../../../utils/levelLimit';
import { stringifyQuery } from '../../../../utils/location';
import levelLimitMessages from '../../../levelLimit/messages';
import useMenuOpen from '../../useMenuOpen';
import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'LevelLimitItem';

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
  { name: displayName },
);

const LevelLimitItem = ({ className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();

  const epic = useSelector((state) => state.app.epic);
  const levelLimit = useSelector((state) => state.app.levelLimit);
  const open = useMenuOpen();

  const onClick = () => {
    const location = { search: stringifyQuery({ levelLimit: null }) };

    if (open) {
      history.replace(location);
    } else {
      history.push(location);
    }
  };

  let secondary = intl.formatMessage(levelLimitMessages.none);

  if (levelLimit) {
    if (epic) {
      secondary = intl.formatMessage(levelLimitMessages.epic, {
        maxLevel: MAX_EPIC_LEVEL,
        minLevel: MIN_LEVEL,
      });
    } else {
      secondary = intl.formatMessage(levelLimitMessages.munchkin, {
        minLevel: MIN_LEVEL,
        maxLevel: MAX_LEVEL,
      });
    }
  }

  return (
    <ListItem
      button
      className={clsx(className, classes.root)}
      onClick={onClick}
      {...rest}
    >
      <ListItemIcon>
        <SwapVertical />
      </ListItemIcon>
      <ListItemText
        primary={intl.formatMessage(levelLimitMessages.label)}
        primaryTypographyProps={{ noWrap: true }}
        secondary={secondary}
        secondaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
  );
};

LevelLimitItem.displayName = displayName;

export default LevelLimitItem;
