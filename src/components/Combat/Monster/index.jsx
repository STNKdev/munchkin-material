import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Counter from '../../Counter';
import { noop } from '../../../constants';
import { monsterInstance } from '../../../utils/propTypes';

import cn from './style.css';

const CombatMonster = ({
  monster,
  onBonusDecrement,
  onBonusIncrement,
  onLevelDecrement,
  onLevelIncrement,
  title,
}) => (
  <div className={cn.monster}>
    <div className={cn.name}>
      {title}
    </div>

    <div className={cn.stats}>
      <Counter
        className={cn.item}
        compact
        onDecrement={() => onLevelDecrement(monster)}
        onIncrement={() => onLevelIncrement(monster)}
        title={<FormattedMessage id="combat.monster.level" defaultMessage="Level" />}
        value={monster.level}
      />
      <Counter
        className={cn.item}
        compact
        onDecrement={() => onBonusDecrement(monster)}
        onIncrement={() => onBonusIncrement(monster)}
        title={<FormattedMessage id="combat.monster.modifier" defaultMessage="Modifier" />}
        value={monster.bonus}
      />
    </div>
  </div>
);

CombatMonster.propTypes = {
  monster: monsterInstance.isRequired,
  onBonusDecrement: PropTypes.func,
  onBonusIncrement: PropTypes.func,
  onLevelDecrement: PropTypes.func,
  onLevelIncrement: PropTypes.func,
  title: PropTypes.node,
};

CombatMonster.defaultProps = {
  onBonusDecrement: noop,
  onBonusIncrement: noop,
  onLevelDecrement: noop,
  onLevelIncrement: noop,
  title: '',
};

export default CombatMonster;
