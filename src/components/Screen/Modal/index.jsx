import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Slide, withStyles } from '@material-ui/core';

import { ios } from '../../../utils/platforms';

import Transition from '../Transition';

const TransitionComponent = ios
  ? (props) => <Slide direction="left" {...props} />
  : Transition;

const styles = {
  modal: {
    zIndex: 'auto',
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    outline: 'none',
  },
};

const ScreenModal = ({ appear, children, classes, open, ...rest }) => (
  <Modal
    classes={{
      root: classes.root,
    }}
    disableEscapeKeyDown
    disablePortal
    hideBackdrop
    open={open}
    {...rest}
  >
    <TransitionComponent appear={appear} in={open}>
      <div className={classes.root}>{children}</div>
    </TransitionComponent>
  </Modal>
);

ScreenModal.propTypes = {
  appear: PropTypes.bool,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};

ScreenModal.defaultProps = {
  appear: undefined,
  open: false,
};

export default withStyles(styles)(ScreenModal);