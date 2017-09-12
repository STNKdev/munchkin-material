import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import cns from 'classnames';

import { classesObject } from '../../utils/propTypes';

const styles = {
  layoutHeader: {
    flex: '0 0 auto',
    position: 'relative',
    zIndex: 1,
  },
};

const LayoutHeader = ({ classes, className, ...props }) => (
  <div
    {...props}
    className={cns(classes.layoutHeader, className)}
  />
);

LayoutHeader.propTypes = {
  classes: classesObject.isRequired,
  className: PropTypes.string,
};

LayoutHeader.defaultProps = {
  className: '',
};

export default withStyles(styles)(LayoutHeader);