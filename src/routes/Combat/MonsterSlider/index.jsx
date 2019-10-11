import { IconButton, makeStyles, Paper, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import { CloseCircle } from 'mdi-material-ui';
import React, { memo, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import { removeMonster } from '../../../ducks/monsters';

import Monster from './Monster';

const useStyles = makeStyles(
  (theme) => ({
    monsters: {
      alignItems: 'flex-end',
      display: 'flex',
      position: 'relative',
    },

    remove: {
      position: 'absolute !important',
      right: 8,
      top: 8,
    },

    [`${theme.breakpoints.up('sm')} and (orientation: portrait)`]: {
      paper: {
        marginBottom: 8,
      },
    },

    '@media (orientation: landscape)': {
      monsters: {
        alignItems: 'center',
        overflow: 'hidden',
      },

      remove: {
        bottom: 8,
        left: 8,
        right: 'auto',
        top: 'auto',
      },
    },
  }),
  { name: 'CombatMonsterSlider' },
);

const CombatMonsterSlider = ({ className }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { direction } = useTheme();

  const portrait = useMediaQuery('(orientation: portrait)', {
    noSsr: true,
  });

  const monsters = useSelector((state) => state.combat.monsters);

  const [index, setIndex] = useState(0);
  const monsterCount = useRef(monsters.length);

  useEffect(() => {
    if (monsters.length > monsterCount.current) {
      setIndex(monsters.length - 1);
    }

    monsterCount.current = monsters.length;
  }, [monsters.length]);

  const handleRemove = (monsterId) => {
    const monsterIndex = monsters.indexOf(monsterId);

    if (monsterIndex > 0) {
      setIndex(monsterIndex - 1);
    }

    dispatch(removeMonster(monsterId));
  };

  const views = monsters.map((id, monsterIndex) => (
    <Paper key={id} className={classes.paper}>
      <Monster
        monsterId={id}
        title={
          <FormattedMessage
            defaultMessage="Monster {number}"
            id="combat.monster"
            values={{
              number: monsterIndex + 1,
            }}
          />
        }
      />

      {monsters.length > 1 && monsterIndex === index && (
        <IconButton
          className={classes.remove}
          onClick={() => handleRemove(id)}
          style={{
            width: 36,
            height: 36,
            padding: 6,
          }}
        >
          <CloseCircle />
        </IconButton>
      )}
    </Paper>
  ));

  return (
    <div className={clsx(classes.monsters, className)}>
      {portrait ? (
        <SwipeableViews
          axis={direction === 'rtl' ? 'x-reverse' : 'x'}
          enableMouseEvents
          index={index}
          onChangeIndex={(value) => setIndex(value)}
          slideStyle={{
            direction,
            padding: '8px 8px 0',
            position: 'relative',
          }}
          style={{
            flex: 1,
            padding: '0 48px',
          }}
        >
          {views}
        </SwipeableViews>
      ) : (
        <SwipeableViews
          axis="y"
          containerStyle={{
            height: 224,
            width: '100%',
          }}
          enableMouseEvents
          ignoreNativeScroll
          index={index}
          onChangeIndex={(value) => setIndex(value)}
          slideStyle={{
            direction,
            height: 224,
            padding:
              direction === 'rtl' ? '8px 8px 8px 48px' : '8px 48px 8px 8px',
            position: 'relative',
          }}
          style={{
            alignItems: 'center',
            display: 'flex',
            overflowY: 'visible',
            width: '100%',
          }}
        >
          {views}
        </SwipeableViews>
      )}
    </div>
  );
};

CombatMonsterSlider.displayName = 'CombatMonsterSlider';

export default memo(CombatMonsterSlider);
