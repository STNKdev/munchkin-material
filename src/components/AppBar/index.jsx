import React from 'react';
import PropTypes from 'prop-types';
import { AppBar as MuiAppBar, Toolbar, withStyles } from '@material-ui/core';
import cns from 'classnames';

const styles = (theme) => ({
  appBar: {
    paddingLeft: 4,
    paddingRight: 4,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.sharp,
    }),

    [theme.breakpoints.up('sm')]: {
      paddingLeft: 12,
      paddingRight: 12,

      '@supports(padding: max(0px))': {
        paddingLeft: 'max(12px, env(safe-area-inset-left) - 12px)',
        paddingRight: 'max(12px, env(safe-area-inset-right) - 12px)',
      },
    },
  },
});

const AppBar = ({ children, classes, className, ...props }) => (
  <MuiAppBar
    className={cns(className, classes.appBar)}
    color="primary"
    position="static"
    {...props}
  >
    <Toolbar disableGutters>{children}</Toolbar>
  </MuiAppBar>
);

AppBar.propTypes = {
  children: PropTypes.node,
};

AppBar.defaultProps = {
  children: null,
};

export default withStyles(styles)(AppBar);
