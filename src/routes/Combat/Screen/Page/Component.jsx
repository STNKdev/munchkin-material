import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { noop } from 'lodash';

import Layout, { LayoutContent } from '../../../../components/Layout';

import AppBar from './AppBar';
import MonsterSlider from './MonsterSlider';
import PlayerSlider from './PlayerSlider';

const styles = (theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },

  players: {
    flex: 1,
  },

  monsters: {
    flex: 1,
  },

  total: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  value: {
    fontFamily: `"Munchkin", ${theme.typography.fontFamily}`,
    fontSize: '2em',
  },

  versus: {
    margin: '0 0.5em',
  },

  '@media (min-width: 600px) and (orientation: portrait)': {
    content: {
      justifyContent: 'center',
    },

    players: {
      flex: 'none',
    },

    monsters: {
      flex: 'none',
    },

    total: {
      padding: `${theme.spacing.unit * 2}px 0`,
    },
  },

  '@media (orientation: landscape)': {
    content: {
      flexDirection: 'row',
    },

    total: {
      flexDirection: 'column',
      width: 50,
    },
  },
});

class CombatScreenPage extends PureComponent {
  render() {
    const {
      classes,
      combinedMonsterStrength,
      combinedPlayerStrength,
      helperId,
      onHelperBonusChange,
      onHelperRemove,
      onMonsterAdd,
      onMonsterRemove,
      onPlayerBonusChange,
      playerId,
    } = this.props;

    return (
      <Layout>
        <AppBar />
        <LayoutContent className={classes.content}>
          <PlayerSlider
            className={classes.players}
            helperId={helperId}
            onHelperBonusChange={onHelperBonusChange}
            onHelperRemove={onHelperRemove}
            onPlayerBonusChange={onPlayerBonusChange}
            playerId={playerId}
          />

          <div className={classes.total}>
            <span className={classes.value}>{combinedPlayerStrength}</span>
            <Typography className={classes.versus} component="span">
              vs
            </Typography>
            <span className={classes.value}>{combinedMonsterStrength}</span>
          </div>

          <MonsterSlider
            className={classes.monsters}
            onMonsterAdd={onMonsterAdd}
            onMonsterRemove={onMonsterRemove}
          />
        </LayoutContent>
      </Layout>
    );
  }
}

CombatScreenPage.propTypes = {
  combinedMonsterStrength: PropTypes.number.isRequired,
  combinedPlayerStrength: PropTypes.number.isRequired,
  helperId: PropTypes.string,
  onHelperBonusChange: PropTypes.func,
  onHelperRemove: PropTypes.func,
  onMonsterAdd: PropTypes.func,
  onMonsterRemove: PropTypes.func,
  onPlayerBonusChange: PropTypes.func,
  playerId: PropTypes.string.isRequired,
};

CombatScreenPage.defaultProps = {
  helperId: null,
  onHelperBonusChange: noop,
  onHelperRemove: noop,
  onMonsterAdd: noop,
  onMonsterRemove: noop,
  onPlayerBonusChange: noop,
};

export default withStyles(styles)(CombatScreenPage);
