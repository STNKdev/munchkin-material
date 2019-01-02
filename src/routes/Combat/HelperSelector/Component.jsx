import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { ChevronDoubleUp } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import getSexIconClass from '../../../utils/getSexIconClass';

const styles = (theme) => ({
  dialogPaper: {
    margin: theme.spacing.unit * 2,
  },

  content: {
    padding: 0,
  },

  textRoot: {
    overflow: 'hidden',
    paddingRight: 0,
  },

  primary: {
    alignItems: 'center',
    display: 'flex',
  },

  name: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  level: {
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 20,
    justifyContent: 'flex-end',
    marginLeft: theme.spacing.unit * 2,
    width: 44,
  },

  strength: {
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 20,
    justifyContent: 'flex-end',
    marginLeft: 4,
    width: 48,
  },
});

const HelperSelector = ({ classes, helpers, onSelect, ...props }) => (
  <Dialog
    classes={{
      paper: classes.dialogPaper,
    }}
    {...props}
  >
    <DialogTitle>
      <FormattedMessage
        defaultMessage="Choose helper"
        id="combat.helperSelector.title"
      />
    </DialogTitle>
    <DialogContent className={classes.content}>
      <List>
        {helpers.map((helper) => {
          const SexIcon = getSexIconClass(helper.sex);

          return (
            <ListItem
              key={helper.id.toString()}
              button
              onClick={() => onSelect(helper.id)}
            >
              <Avatar style={{ backgroundColor: helper.color }}>
                <SexIcon />
              </Avatar>
              <ListItemText
                classes={{
                  root: classes.textRoot,
                  primary: classes.primary,
                }}
                primary={
                  <>
                    <span className={classes.name}>{helper.name}</span>

                    <span className={classes.level}>
                      {helper.level}
                      <KeyboardArrowUp />
                    </span>

                    <span className={classes.strength}>
                      {helper.level + helper.gear}
                      <ChevronDoubleUp />
                    </span>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </DialogContent>
  </Dialog>
);

HelperSelector.propTypes = {
  helpers: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

HelperSelector.defaultProps = {
  helpers: [],
  onSelect: noop,
};

export default withStyles(styles)(HelperSelector);
