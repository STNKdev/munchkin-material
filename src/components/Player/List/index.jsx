import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { List } from 'material-ui/List';
import { grey600 } from 'material-ui/styles/colors';
import ActionDelete from 'material-ui-icons/Delete';
import EditorModeEdit from 'material-ui-icons/ModeEdit';
import NavigationCheck from 'material-ui-icons/Check';
import NavigationClose from 'material-ui-icons/Close';

import cn from './style.css';

import Item from './Item';
import AppBar from '../../material-ui/AppBar';
import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import { noop } from '../../../constants';
import { ios } from '../../../helpers/platforms';
import { playerInstance } from '../../../utils/propTypes';

const SortableList = SortableContainer(List);
const SortableListItem = SortableElement(Item);

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
      editMode,
      multiMode,
      onMultiSelectDeactivate,
      onToggleEditClick,
      players,
      selectedPlayerIds,
    } = this.props;

    let showMenuIconButton = false;
    let iconElementLeft = null;
    let iconElementRight = null;
    let title = <FormattedMessage id="player.list.title" defaultMessage="Munchkins" />;

    if (players.length) {
      if (multiMode) {
        showMenuIconButton = true;

        iconElementLeft = (
          <IconButton onClick={onMultiSelectDeactivate}>
            <NavigationClose />
          </IconButton>
        );

        iconElementRight = (
          <IconButton onClick={this.handlePlayersDelete}>
            <ActionDelete />
          </IconButton>
        );
      } else {
        iconElementRight = (
          <IconButton onClick={onToggleEditClick}>
            {editMode ? <NavigationCheck /> : <EditorModeEdit />}
          </IconButton>
        );
      }
    }

    const appBarStyle = {};

    if (multiMode) {
      appBarStyle.backgroundColor = grey600;
      title = selectedPlayerIds.length;
    }

    return (
      <Layout>
        <LayoutHeader>
          <AppBar
            iconElementLeft={iconElementLeft}
            iconElementRight={iconElementRight}
            showMenuIconButton={showMenuIconButton}
            style={appBarStyle}
            title={title}
            titleStyle={{
              paddingLeft: ios && players.length ? 24 : undefined,
            }}
          />
        </LayoutHeader>
        <LayoutContent>
          <SortableList
            helperClass={cn.sortableHelper}
            lockAxis="y"
            lockOffset={0}
            lockToContainerEdges
            onSortEnd={this.handleSortEnd}
            pressDelay={1} // to disable hover state in item component
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

export default PlayerList;
