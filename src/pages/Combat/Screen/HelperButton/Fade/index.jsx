import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  enter: {
    opacity: 0,
    transform: 'scale(0.5) translateY(20px)',
  },

  enterActive: {
    opacity: 1,
    transform: 'scale(1) translateY(0)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
  },

  exit: {
    opacity: 1,
    transform: 'scale(1)',
  },

  exitActive: {
    opacity: 0,
    transform: 'scale(0.8)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeOut,
    }),
  },
});

const FabHelperButtonFade = ({ classes, theme, ...props }) => (
  <CSSTransition
    classNames={{
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.exit,
      exitActive: classes.exitActive,
    }}
    timeout={{
      enter: theme.transitions.duration.shortest,
      exit: theme.transitions.duration.shortest,
    }}
    {...props}
  />
);

export default withStyles(styles, { withTheme: true })(FabHelperButtonFade);