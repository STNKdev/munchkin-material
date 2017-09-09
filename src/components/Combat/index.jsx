import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';

import DiceMultipleIcon from '../icons/dice/multiple';
import { noop } from '../../constants';
import DiceDialog from '../../containers/DiceDialog';
import { monsterInstance, playerInstance } from '../../utils/propTypes';

import MonsterSlider from './MonsterSlider';
import PlayerSlider from './PlayerSlider';
import { Layout, LayoutContent, LayoutHeader } from '../Layout';

import cn from './style.css';

class Combat extends PureComponent {
  render() {
    const {
      helper,
      helperBonus,
      monsters,
      onBack,
      onDiceClick,
      onHelperBonusChange,
      onHelperRemove,
      onMonsterAdd,
      onMonsterRemove,
      onPlayerBonusChange,
      player,
      playerBonus,
    } = this.props;

    const diceButton = (
      <IconButton color="contrast" onClick={onDiceClick}>
        <DiceMultipleIcon />
      </IconButton>
    );

    return (
      <Layout>
        <LayoutHeader>
          <AppBar color="primary" position="static">
            <Toolbar disableGutters>
              <IconButton color="contrast" onClick={onBack}>
                <NavigationArrowBack />
              </IconButton>

              <Typography
                color="inherit"
                noWrap
                style={{ flex: 1 }}
                type="title"
              >
                <FormattedMessage id="combat" defaultMessage="Combat" />
              </Typography>

              {diceButton}
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent className={cn.content}>
          <PlayerSlider
            className={cn.players}
            helper={helper}
            onHelperBonusChange={onHelperBonusChange}
            onHelperRemove={onHelperRemove}
            onPlayerBonusChange={onPlayerBonusChange}
            player={player}
          />

          <div className={cn.total}>
            <span className={cn.value}>
              {
                player.level + player.gear + playerBonus +
                (helper ? (helper.level + helper.gear + helperBonus) : 0)
              }
            </span>
            <span className={cn.versus}>vs</span>
            <span className={cn.value}>
              {monsters.reduce((strength, monster) => strength + monster.level + monster.bonus, 0)}
            </span>
          </div>

          <MonsterSlider
            className={cn.monsters}
            monsters={monsters}
            onMonsterAdd={onMonsterAdd}
            onMonsterRemove={onMonsterRemove}
          />

          <DiceDialog />
        </LayoutContent>
      </Layout>
    );
  }
}

Combat.propTypes = {
  helper: playerInstance,
  helperBonus: PropTypes.number,
  monsters: PropTypes.arrayOf(monsterInstance),
  onBack: PropTypes.func,
  onDiceClick: PropTypes.func,
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  player: playerInstance.isRequired,
  playerBonus: PropTypes.number,
};

Combat.defaultProps = {
  helper: null,
  helperBonus: 0,
  monsters: [],
  onBack: noop,
  onDiceClick: noop,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  onPlayerBonusChange: noop,
  playerBonus: 0,
};

export default Combat;
