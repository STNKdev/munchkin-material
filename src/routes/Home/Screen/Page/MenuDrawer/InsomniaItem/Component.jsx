import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/core/styles';
import cns from 'classnames';
import { noop } from 'lodash';

const styles = {
  root: {
    paddingBottom: 0,
    paddingTop: 0,
  },
};

class InsomniaItem extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { keepAwake, onChange } = this.props;

    onChange(!keepAwake);
  }

  render() {
    const { classes, className, keepAwake, keepAwakeSupport } = this.props;

    return keepAwakeSupport ? (
      <ListItem
        button
        className={cns(classes.root, className)}
        onClick={this.handleClick}
      >
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <FormattedMessage id="menu.keepAwake" defaultMessage="Keep awake" />
          }
        />
        <Switch
          checked={keepAwake}
          color="primary"
          disableRipple
          tabIndex={-1}
        />
      </ListItem>
    ) : null;
  }
}

InsomniaItem.propTypes = {
  keepAwake: PropTypes.bool,
  keepAwakeSupport: PropTypes.bool,
  onChange: PropTypes.func,
};

InsomniaItem.defaultProps = {
  keepAwake: false,
  keepAwakeSupport: false,
  onChange: noop,
};

export default withStyles(styles)(InsomniaItem);
