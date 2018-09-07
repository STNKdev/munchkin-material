import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import NavigationCheck from '@material-ui/icons/Check';
import { noop } from 'lodash';

import AppBar from '../../../../../components/AppBar';
import BackButton from '../../../../../components/BackButton';
import Title from '../../../../../components/Title';

const styles = {
  leftButton: {
    marginRight: 8,
  },

  title: {
    marginLeft: 12,
  },
};

class PlayerFormScreenAppBarComponent extends PureComponent {
  render() {
    const { classes, onCancel, onSubmit, title } = this.props;

    return (
      <AppBar>
        <BackButton className={classes.leftButton} onClick={onCancel} />

        <Title className={classes.title}>{title}</Title>

        <IconButton color="inherit" onClick={onSubmit}>
          <NavigationCheck />
        </IconButton>
      </AppBar>
    );
  }
}

PlayerFormScreenAppBarComponent.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.node,
};

PlayerFormScreenAppBarComponent.defaultProps = {
  onCancel: noop,
  onSubmit: noop,
  title: null,
};

export default withStyles(styles)(PlayerFormScreenAppBarComponent);
