import React, { PureComponent } from 'react';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import transitions, { duration, easing } from 'material-ui/styles/transitions';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import ActionDelete from 'material-ui-icons/Delete';
import EditorModeEdit from 'material-ui-icons/ModeEdit';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';

import Empty from './Empty';
import Item from './Item';
import Layout, { LayoutContent, LayoutHeader } from '../../Layout';
import Title from '../../Title';
import { noop } from '../../../constants';
import { ios } from '../../../helpers/platforms';
import { classesObject, playerInstance } from '../../../utils/propTypes';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

const messages = defineMessages({
  edit: {
    id: 'player.list.edit',
    defaultMessage: 'Edit',
  },
});

const styles = theme => ({
  appBar: {
    transition: transitions.create(['background-color'], {
      duration: duration.short,
      easing: easing.sharp,
    }),
  },

  leftButton: {
    marginLeft: -12,
  },

  rightButton: {
    marginRight: -12,
  },

  empty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  sortableHelper: {
    backgroundColor: '#FFFFFF !important',
    boxShadow: theme.shadows[3],
    zIndex: 2,
  },
});

class PlayerList extends PureComponent {
  componentWillMount() {
    this.handleItemCheck = this.handleItemCheck.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handlePlayersDelete = this.handlePlayersDelete.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  handleItemCheck(player) {
    const { onPlayerSelect } = this.props;

    onPlayerSelect(player);
  }

  handleItemClick(player) {
    const {
      editMode, onPlayerEdit, onPlayerSelect,
    } = this.props;

    if (editMode) {
      onPlayerEdit(player);
    } else {
      onPlayerSelect(player);
    }
  }

  handleItemPress(player) {
    const { editMode, onMultiSelectActivate } = this.props;

    if (!editMode) {
      onMultiSelectActivate(player.id);
    }
  }

  handlePlayersDelete() {
    const { onDeletePlayers, selectedPlayerIds } = this.props;

    onDeletePlayers(selectedPlayerIds);
  }

  handleSortEnd({ oldIndex, newIndex }) {
    this.props.onPlayerMove(oldIndex, newIndex);
  }

  render() {
    const {
      classes,
      className,
      editMode,
      intl,
      multiMode,
      onMultiSelectDeactivate,
      onToggleEditClick,
      playerColors,
      players,
      selectedPlayerIds,
    } = this.props;

    let iconElementLeft = null;
    let iconElementRight = null;
    let title = <FormattedMessage id="player.list.title" defaultMessage="Munchkins" />;
    let titleStyle = {};

    if (players.length) {
      if (multiMode) {
        iconElementLeft = (
          <IconButton className={classes.leftButton} color="default" onClick={onMultiSelectDeactivate}>
            <NavigationClose />
          </IconButton>
        );

        iconElementRight = (
          <IconButton
            className={classes.rightButton}
            color="default"
            onClick={this.handlePlayersDelete}
          >
            <ActionDelete />
          </IconButton>
        );

        if (!ios) {
          titleStyle = {
            ...titleStyle,
            marginLeft: 20,
          };
        }
      } else {
        if (ios) {
          titleStyle = {
            ...titleStyle,
            marginLeft: 48,
          };
        }

        if (editMode) {
          iconElementRight = (
            <IconButton className={classes.rightButton} color="contrast" onClick={onToggleEditClick}>
              <NavigationCheck />
            </IconButton>
          );
        } else {
          const editTitle = intl.formatMessage(messages.edit);

          iconElementRight = (
            <Tooltip title={editTitle}>
              <IconButton
                aria-label={editTitle}
                className={classes.rightButton}
                color="contrast"
                onClick={onToggleEditClick}
              >
                <EditorModeEdit />
              </IconButton>
            </Tooltip>
          );
        }
      }
    }

    if (multiMode) {
      title = selectedPlayerIds.length;
    }

    return (
      <Layout className={className}>
        <LayoutHeader>
          <AppBar className={classes.appBar} color={multiMode ? 'default' : 'primary'} position="static">
            <Toolbar>
              {iconElementLeft}
              <Title
                color={multiMode ? 'default' : 'inherit'}
                style={titleStyle}
              >
                {title}
              </Title>
              {iconElementRight}
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent className={!players.length ? classes.empty : ''}>
          {players.length ? (
            <SortableList
              component="div"
              helperClass={classes.sortableHelper}
              lockAxis="y"
              lockOffset={0}
              lockToContainerEdges
              onSortEnd={this.handleSortEnd}
              useDragHandle
            >
              {players.map((player, index) => (
                <SortableListItem
                  color={playerColors[player.id]}
                  editMode={editMode}
                  index={index}
                  key={player.id}
                  multiMode={multiMode}
                  onCheck={this.handleItemCheck}
                  onClick={this.handleItemClick}
                  onPress={this.handleItemPress}
                  player={player}
                  selected={selectedPlayerIds.includes(player.id)}
                />
              ))}
            </SortableList>
          ) : (
            <Empty />
          )}
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerList.propTypes = {
  className: PropTypes.string,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  editMode: PropTypes.bool,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  multiMode: PropTypes.bool,
  onDeletePlayers: PropTypes.func,
  onMultiSelectActivate: PropTypes.func,
  onMultiSelectDeactivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerMove: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  playerColors: PropTypes.objectOf(PropTypes.string),
  players: PropTypes.arrayOf(playerInstance),
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.number),
};

PlayerList.defaultProps = {
  className: '',
  editMode: false,
  multiMode: false,
  onDeletePlayers: noop,
  onMultiSelectActivate: noop,
  onMultiSelectDeactivate: noop,
  onPlayerEdit: noop,
  onPlayerMove: noop,
  onPlayerSelect: noop,
  onToggleEditClick: noop,
  playerColors: {},
  players: [],
  selectedPlayerIds: [],
};

export default injectIntl(withStyles(styles)(PlayerList));
