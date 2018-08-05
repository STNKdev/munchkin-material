import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import NavigationArrowDropDown from '@material-ui/icons/ArrowDropDown';
import NavigationArrowDropUp from '@material-ui/icons/ArrowDropUp';
import cns from 'classnames';
import { noop } from 'lodash';

const styles = (theme) => ({
  counter: {
    textAlign: 'center',
  },

  title: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: 16,
  },

  button: {
    fontSize: 48,
    height: 48,
    width: 48,
  },

  icon: {
    fontSize: 'inherit',
  },

  value: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: theme.typography.display1.fontSize,
    lineHeight: theme.typography.display1.lineHeight,
  },

  '@media (orientation: portrait) and (min-width: 360px) and (min-height: 600px)': {
    title: {
      fontSize: 20,
    },

    button: {
      fontSize: 64,
      height: 64,
      width: 64,
    },
  },
});

const CombatCounter = ({
  classes,
  className,
  decrementDisabled,
  incrementDisabled,
  onDecrement,
  onIncrement,
  title,
  value,
}) => (
  <div className={cns(className, classes.counter)}>
    <div className={classes.title}>{title}</div>

    <IconButton
      className={classes.button}
      color="inherit"
      disabled={incrementDisabled}
      onClick={onIncrement}
    >
      <NavigationArrowDropUp className={classes.icon} />
    </IconButton>

    <div className={classes.value}>{value}</div>

    <IconButton
      className={classes.button}
      color="inherit"
      disabled={decrementDisabled}
      onClick={onDecrement}
    >
      <NavigationArrowDropDown className={classes.icon} />
    </IconButton>
  </div>
);

CombatCounter.propTypes = {
  decrementDisabled: PropTypes.bool,
  incrementDisabled: PropTypes.bool,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

CombatCounter.defaultProps = {
  decrementDisabled: false,
  incrementDisabled: false,
  onDecrement: noop,
  onIncrement: noop,
};

export default withStyles(styles)(CombatCounter);
