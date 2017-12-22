import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableHandle } from 'react-sortable-hoc';
import Tappable from 'react-tappable/lib/Tappable';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ActionReorder from 'material-ui-icons/Reorder';

import { noop } from '../../../../../../constants';
import getGenderIconClass from '../../../../../../helpers/getGenderIconClass';
import { ios } from '../../../../../../helpers/platforms';
import { classesObject, playerInstance } from '../../../../../../utils/propTypes';

import modes from '../../../../modes';

import PlayerListItemAvatar from './Avatar';

const Container = props => <Tappable component="div" pressDelay={500} {...props} />;
const ItemHandle = SortableHandle(ActionReorder);

const styles = theme => ({
  listItemGutters: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 24,
    },
  },

  listItemSecondaryActionRoot: {
    [theme.breakpoints.up('sm')]: {
      right: 12,
    },
  },

  text: {
    overflow: 'hidden',
  },
});

class HomeScreenPagePlayerListItemComponent extends PureComponent {
  componentWillMount() {
    this.handleClick = this.handleClick.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    const { mode, onPress, player } = this.props;

    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    onPress(player.id, mode);

    if (ios || e.type === 'mousedown') {
      this.preventClick = true;
    }
  }

  handleClick() {
    const {
      mode, onCheck, onClick, player,
    } = this.props;

    if (mode === modes.MULTI) {
      if (this.preventClick) {
        delete this.preventClick;
      } else {
        onCheck(player.id, mode);
      }
    } else {
      onClick(player.id, mode);
    }
  }

  render() {
    const {
      classes, color, player, selected, mode,
    } = this.props;
    const GenderIcon = getGenderIconClass(player.gender);

    return (
      <ListItem
        button
        classes={{
          gutters: classes.listItemGutters,
        }}
        component={Container}
        onClick={this.handleClick}
        onPress={!mode ? this.handlePress : undefined}
      >
        <PlayerListItemAvatar
          color={color}
          name={player.name}
          selected={selected}
        />

        <ListItemText
          className={classes.text}
          primary={<Typography component="div" noWrap>{player.name}</Typography>}
          secondary={
            <span>
              <FormattedMessage
                id="player.list.item.secondaryTextLevel"
                defaultMessage="Level {level}"
                values={{
                  level: <b>{player.level}</b>,
                }}
              />
              <br />
              <FormattedMessage
                id="player.list.item.secondaryTextStrength"
                defaultMessage="Strength {strength}"
                values={{
                  strength: <b>{player.level + player.gear}</b>,
                }}
              />
            </span>
          }
        />

        <ListItemSecondaryAction
          classes={{
            root: classes.listItemSecondaryActionRoot,
          }}
        >
          <IconButton component="span" disableRipple>
            {mode === modes.EDIT ? (
              <ItemHandle />
            ) : (
              <GenderIcon onClick={this.handleClick} />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

HomeScreenPagePlayerListItemComponent.propTypes = {
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  color: PropTypes.string,
  mode: PropTypes.oneOf(Object.values(modes)),
  onCheck: PropTypes.func,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  player: playerInstance.isRequired, // eslint-disable-line react/no-typos
  selected: PropTypes.bool,
};

HomeScreenPagePlayerListItemComponent.defaultProps = {
  color: '',
  mode: null,
  onCheck: noop,
  onClick: noop,
  onPress: noop,
  selected: false,
};

export default withStyles(styles)(HomeScreenPagePlayerListItemComponent);
