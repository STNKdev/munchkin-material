import { ListItemIcon, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { push, replace } from 'connected-react-router';
import { Palette } from 'mdi-material-ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { names as themeNames } from '../../../../styles/themes';
import { stringifyQuery } from '../../../../utils/location';

import themeMessages from '../../../theme/messages';
import openSelector from '../../openSelector';

import ListItem from '../Item';
import ListItemText from '../ItemText';

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
  { name: 'ThemeItem' },
);

const ThemeItem = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();
  const theme = useTheme();

  const open = useSelector(openSelector);

  const onClick = () => {
    const location = { search: stringifyQuery({ theme: null }) };

    if (open) {
      dispatch(replace(location));
    } else {
      dispatch(push(location));
    }
  };

  return (
    <ListItem
      button
      className={clsx(className, classes.root)}
      onClick={onClick}
      {...rest}
    >
      <ListItemIcon>
        <Palette style={{ color: theme.palette.primary.main }} />
      </ListItemIcon>
      <ListItemText
        primary={intl.formatMessage(themeMessages.label)}
        secondary={themeNames[theme.id]}
      />
    </ListItem>
  );
};

export default ThemeItem;
