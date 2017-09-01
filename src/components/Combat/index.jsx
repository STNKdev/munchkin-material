import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import DiceMultipleIcon from '../icons/dice/multiple';
import { noop } from '../../constants';
import DiceDialog from '../../containers/DiceDialog';
import { ios } from '../../helpers/platforms';
import { monsterInstance, playerInstance } from '../../utils/propTypes';

import MonsterSlider from './MonsterSlider';
import PlayerSlider from './PlayerSlider';
import { Layout, LayoutContent, LayoutHeader } from '../Layout';
import AppBar from '../material-ui/AppBar';

import cn from './style.css';

class Combat extends PureComponent {
  render() {
    const {
      helper,
      helperBonus,
      monsters,
      onBack,
      onDiceTouchTap,
      onHelperBonusChange,
      onHelperRemove,
      onMonsterAdd,
      onMonsterRemove,
      onPlayerBonusChange,
      player,
      playerBonus,
    } = this.props;

    const diceButton = (
      <IconButton onTouchTap={onDiceTouchTap} style={{ marginLeft: ios ? 8 : undefined }}>
        <DiceMultipleIcon />
      </IconButton>
    );

    return (
      <Layout>
        <LayoutHeader>
          <AppBar
            iconElementLeft={(
              <IconButton onTouchTap={onBack}>
                <NavigationArrowBack />
              </IconButton>
            )}
            iconElementRight={diceButton}
            title={<FormattedMessage id="combat" defaultMessage="Combat" />}
          />
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
  onDiceTouchTap: PropTypes.func,
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
  onDiceTouchTap: noop,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  onPlayerBonusChange: noop,
  playerBonus: 0,
};

export default Combat;
