import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ActionDelete from 'material-ui-icons/Delete';
import EditorModeEdit from 'material-ui-icons/ModeEdit';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';

import cn from './style.css';

import Item from './Item';
import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import { noop } from '../../../constants';
import { ios } from '../../../helpers/platforms';
import { classesObject, playerInstance } from '../../../utils/propTypes';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

const styles = {
  flex: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
};

class PlayerList extends Component {
  componentWillMount() {
    this.handleItemCheck = this.handleItemCheck.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
    this.handleItemTap = this.handleItemTap.bind(this);
    this.handlePlayersDelete = this.handlePlayersDelete.bind(this);
    this.handleSortEnd = this.handleSortEnd.bind(this);
  }

  handleItemCheck(player) {
    const { multiMode, onPlayerSelect, selectedPlayerIds } = this.props;

    onPlayerSelect(player, multiMode, selectedPlayerIds);
  }

  handleItemTap(player) {
    const { editMode, multiMode, onPlayerEdit, onPlayerSelect, selectedPlayerIds } = this.props;

    if (editMode) {
      onPlayerEdit(player);
    } else {
      onPlayerSelect(player, multiMode, selectedPlayerIds);
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
      editMode,
      multiMode,
      onMultiSelectDeactivate,
      onToggleEditClick,
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
          <IconButton color="default" onClick={onMultiSelectDeactivate}>
            <NavigationClose />
          </IconButton>
        );

        iconElementRight = (
          <IconButton color="default" onClick={this.handlePlayersDelete}>
            <ActionDelete />
          </IconButton>
        );
      } else {
        if (ios) {
          titleStyle = {
            marginLeft: 64,
          };
        }

        iconElementRight = (
          <IconButton color="contrast" onClick={onToggleEditClick}>
            {editMode ? <NavigationCheck /> : <EditorModeEdit />}
          </IconButton>
        );
      }
    }

    if (multiMode) {
      title = selectedPlayerIds.length;
    }

    return (
      <Layout>
        <LayoutHeader>
          <AppBar color={multiMode ? 'default' : 'primary'} position="static">
            <Toolbar disableGutters>
              {iconElementLeft}
              <Typography
                className={classes.flex}
                color={multiMode ? 'secondary' : 'inherit'}
                noWrap
                style={titleStyle}
                type="title"
              >
                {title}
              </Typography>
              {iconElementRight}
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent>
          <SortableList
            helperClass={cn.sortableHelper}
            lockAxis="y"
            lockOffset={0}
            lockToContainerEdges
            onSortEnd={this.handleSortEnd}
            useDragHandle
          >
            {players.map((player, index) => (
              <SortableListItem
                index={index}
                key={player.id}
                onCheck={this.handleItemCheck}
                onPress={this.handleItemPress}
                onClick={this.handleItemTap}
                player={player}
                selected={selectedPlayerIds.includes(player.id)}
                showCheckbox={multiMode}
                showDragHandle={editMode}
              />
            ))}
          </SortableList>
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerList.propTypes = {
  classes: classesObject.isRequired,
  editMode: PropTypes.bool,
  multiMode: PropTypes.bool,
  onDeletePlayers: PropTypes.func,
  onMultiSelectActivate: PropTypes.func,
  onMultiSelectDeactivate: PropTypes.func,
  onPlayerEdit: PropTypes.func,
  onPlayerMove: PropTypes.func,
  onPlayerSelect: PropTypes.func,
  onToggleEditClick: PropTypes.func,
  players: PropTypes.arrayOf(playerInstance),
  selectedPlayerIds: PropTypes.arrayOf(PropTypes.number),
};

PlayerList.defaultProps = {
  editMode: false,
  multiMode: false,
  onDeletePlayers: noop,
  onMultiSelectActivate: noop,
  onMultiSelectDeactivate: noop,
  onPlayerEdit: noop,
  onPlayerMove: noop,
  onPlayerSelect: noop,
  onToggleEditClick: noop,
  players: [],
  selectedPlayerIds: [],
};

export default withStyles(styles)(PlayerList);
