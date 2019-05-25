import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { IconButton, makeStyles, Paper } from '@material-ui/core';
import { CloseCircle } from 'mdi-material-ui';
import clsx from 'clsx';

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

const CombatMonsterSlider = ({ className, monsters, onMonsterRemove }) => {
  const classes = useStyles();

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

    onMonsterRemove(monsterId);
  };

  const views = monsters.map((id, monsterIndex) => (
    <Paper key={id} className={classes.paper}>
      <Monster
        id={id}
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
      <MediaQuery orientation="portrait">
        <SwipeableViews
          enableMouseEvents
          index={index}
          onChangeIndex={(value) => setIndex(value)}
          slideStyle={{
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
      </MediaQuery>

      <MediaQuery orientation="landscape">
        <SwipeableViews
          axis="y"
          containerStyle={{
            height: 221,
            width: '100%',
          }}
          enableMouseEvents
          ignoreNativeScroll
          index={index}
          onChangeIndex={(value) => setIndex(value)}
          slideStyle={{
            height: 221,
            padding: '8px 48px 8px 8px',
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
      </MediaQuery>
    </div>
  );
};

CombatMonsterSlider.propTypes = {
  monsters: PropTypes.arrayOf(PropTypes.string),
  onMonsterRemove: PropTypes.func.isRequired,
};

CombatMonsterSlider.defaultProps = {
  monsters: [],
};

export default CombatMonsterSlider;
