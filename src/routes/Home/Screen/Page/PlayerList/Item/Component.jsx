import React, { createRef, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import ChevronUp from '@material-ui/icons/KeyboardArrowUp';
import ActionReorder from '@material-ui/icons/Reorder';
import cns from 'classnames';
import Hammer from 'hammerjs';
import { noop } from 'lodash';

import getSexIconClass from '../../../../../../utils/getSexIconClass';
import { playerShape } from '../../../../../../utils/propTypes';

import Avatar from './Avatar';
import ChevronDoubleUpIcon from '../../../../../../components/icons/ChevronDoubleUp';

import * as modes from '../../../../modes';
import modeShape from '../../../../modeShape';

const styles = (theme) => ({
  listItemGutters: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },

  listItemSecondaryActionRoot: {
    [theme.breakpoints.up('sm')]: {
      right: 12,
    },
  },

  text: {
    paddingRight: 0,
  },

  rightIcon: {
    marginRight: 0,
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
    marginLeft: theme.spacing.unit,
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

class HomePlayerListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.avatarRef = createRef();
    this.itemRef = createRef();
    this.textRef = createRef();

    this.handleTap = this.handleTap.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.updateHammer();
  }

  componentDidUpdate() {
    this.updateHammer();
  }

  componentWillUnmount() {
    this.removeHammer();
  }

  handleTap(event) {
    const {
      mode,
      onMultiSelectActivate,
      onPlayerEdit,
      onPlayerSelect,
      onPlayerToggle,
      player,
    } = this.props;

    if (mode === modes.EDIT) {
      onPlayerEdit(player.id);
    } else if (mode === modes.MULTI) {
      onPlayerToggle(player.id);
    } else if (this.avatarRef.current.contains(event.target)) {
      onMultiSelectActivate(player.id);
    } else {
      onPlayerSelect(player.id);
    }
  }

  handlePress(event) {
    const { mode, onMultiSelectActivate, player } = this.props;

    if (!mode && this.textRef.current.contains(event.target)) {
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }

      onMultiSelectActivate(player.id);
    }
  }

  updateHammer() {
    this.removeHammer();

    this.hammer = new Hammer(this.itemRef.current, {
      recognizers: [[Hammer.Tap, { time: 500 }], [Hammer.Press, { time: 501 }]],
    });

    this.hammer.on('tap', this.handleTap);
    this.hammer.on('press', this.handlePress);
  }

  removeHammer() {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();

      this.hammer = null;
    }
  }

  render() {
    const {
      classes,
      dragHandleProps,
      mode,
      onMultiSelectActivate,
      onPlayerEdit,
      onPlayerSelect,
      onPlayerToggle,
      player,
      selected,
      ...rest
    } = this.props;

    const SexIcon = getSexIconClass(player.sex);
    const editMode = mode === modes.EDIT;

    return (
      <RootRef rootRef={this.itemRef}>
        <ListItem
          button
          classes={{
            gutters: classes.listItemGutters,
          }}
          component={editMode ? 'div' : 'li'}
          data-screenshots="player-list-item"
          {...rest}
        >
          <RootRef rootRef={this.avatarRef}>
            <Avatar color={player.color} name={player.name} selected={selected}>
              <SexIcon />
            </Avatar>
          </RootRef>

          <RootRef rootRef={this.textRef}>
            <ListItemText
              classes={{
                root: cns({ [classes.text]: !editMode }),
                primary: classes.primary,
              }}
              primary={
                <Fragment>
                  <span className={classes.name}>{player.name}</span>

                  {!editMode && (
                    <Fragment>
                      <span className={classes.level}>
                        {player.level}
                        <ChevronUp />
                      </span>

                      <span className={classes.strength}>
                        {player.level + player.gear}
                        <ChevronDoubleUpIcon />
                      </span>
                    </Fragment>
                  )}
                </Fragment>
              }
            />
          </RootRef>

          {editMode && (
            <ListItemSecondaryAction
              classes={{
                root: classes.listItemSecondaryActionRoot,
              }}
            >
              <IconButton
                disableRipple
                focusVisibleClassName=""
                {...dragHandleProps}
              >
                <ActionReorder />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </RootRef>
    );
  }
}

HomePlayerListItem.propTypes = {
  dragHandleProps: PropTypes.object,
  mode: modeShape,
  onMultiSelectActivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onPlayerToggle: PropTypes.func,
  player: playerShape.isRequired,
  selected: PropTypes.bool,
};

HomePlayerListItem.defaultProps = {
  dragHandleProps: undefined,
  mode: null,
  onMultiSelectActivate: noop,
  onPlayerEdit: noop,
  onPlayerSelect: noop,
  onPlayerToggle: noop,
  selected: false,
};

export default withStyles(styles)(HomePlayerListItem);
