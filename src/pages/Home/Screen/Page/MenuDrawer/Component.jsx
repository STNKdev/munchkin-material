import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import Hammer from 'hammerjs';
import { noop } from 'lodash';

const styles = (theme) => ({
  menu: {
    width: 'calc(100vw - 56px)',

    [theme.breakpoints.up('sm')]: {
      width: 280,
    },
  },
});

class Component extends PureComponent {
  constructor(props) {
    super(props);

    this.container = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.container);

    this.hammer = new Hammer(this.container);

    this.hammer.on('swipeleft', this.props.onClose);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);

    this.hammer.off('swipeleft', this.props.onClose);
  }

  render() {
    const { classes, ...props } = this.props;

    return (
      <Drawer container={this.container} {...props}>
        <div className={classes.menu} />
      </Drawer>
    );
  }
}

Component.propTypes = {
  onClose: PropTypes.func,
};

Component.defaultProps = {
  onClose: noop,
};

export default withStyles(styles)(Component);
