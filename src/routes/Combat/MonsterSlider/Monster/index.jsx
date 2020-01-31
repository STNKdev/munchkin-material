import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { counterMessages } from '../../../../components/Counter';
import {
  decrementMonsterBonus,
  decrementMonsterLevel,
  incrementMonsterBonus,
  incrementMonsterLevel,
} from '../../../../ducks/monsters';

import Counter from '../../Counter';

const displayName = 'CombatMonster';

const useStyles = makeStyles(
  {
    monster: {
      padding: [[8, 8, 16, 8]],
      textAlign: 'center',

      '@media (orientation: landscape)': {
        padding: [[8, 8, 32, 8]],
      },
    },

    name: {
      margin: '0 0 16px',
    },

    stats: {
      display: 'flex',
      margin: '0 auto',
      maxWidth: 280,
    },

    item: {
      flex: 1,
      overflow: 'hidden',
    },
  },
  { name: displayName },
);

const CombatMonster = ({ monsterId, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const intl = useIntl();

  const monsters = useSelector((state) => state.monsters);

  const { bonus, id, level } = monsters[monsterId];

  return (
    <div className={classes.monster}>
      <Typography
        align="center"
        className={classes.name}
        component="div"
        noWrap
      >
        {title}
      </Typography>

      <div className={classes.stats}>
        <Counter
          className={classes.item}
          onDecrement={() => dispatch(decrementMonsterLevel(id))}
          onIncrement={() => dispatch(incrementMonsterLevel(id))}
          title={intl.formatMessage(counterMessages.level)}
          value={level}
        />
        <Counter
          className={classes.item}
          onDecrement={() => dispatch(decrementMonsterBonus(id))}
          onIncrement={() => dispatch(incrementMonsterBonus(id))}
          title={intl.formatMessage(counterMessages.modifier)}
          value={bonus}
        />
      </div>
    </div>
  );
};

CombatMonster.propTypes = {
  monsterId: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
};

CombatMonster.displayName = displayName;

export default CombatMonster;
