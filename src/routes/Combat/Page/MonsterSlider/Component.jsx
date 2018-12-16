import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { IconButton, Paper, withStyles } from '@material-ui/core';
import { CloseCircle } from 'mdi-material-ui';
import cns from 'classnames';
import { noop } from 'lodash/fp';

import Monster from './Monster';

const styles = (theme) => ({
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
});

class CombatMonsterSlider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { monsters } = this.props;

    if (monsters.length > prevProps.monsters.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        index: monsters.length - 1,
      });
    }
  }

  handleChangeIndex(index) {
    this.setState({
      index,
    });
  }

  handleRemove(monsterId) {
    const { monsters, onMonsterRemove } = this.props;
    const index = monsters.indexOf(monsterId);

    if (index > 0) {
      this.setState({
        index: index - 1,
      });
    }

    onMonsterRemove(monsterId);
  }

  render() {
    const { classes, className, monsters } = this.props;
    const { index } = this.state;

    const views = monsters.map((id, monsterIndex) => (
      <Paper className={classes.paper} key={id}>
        <Monster
          id={id}
          title={
            <FormattedMessage
              id="combat.monster"
              defaultMessage="Monster {number}"
              values={{
                number: monsterIndex + 1,
              }}
            />
          }
        />

        {monsters.length > 1 && monsterIndex === index && (
          <IconButton
            className={classes.remove}
            onClick={() => this.handleRemove(id)}
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
      <div className={cns(classes.monsters, className)}>
        <MediaQuery orientation="portrait">
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={this.handleChangeIndex}
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
              height: 215,
              width: '100%',
            }}
            enableMouseEvents
            ignoreNativeScroll
            index={index}
            onChangeIndex={this.handleChangeIndex}
            slideStyle={{
              height: 215,
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
  }
}

CombatMonsterSlider.propTypes = {
  monsters: PropTypes.arrayOf(PropTypes.string),
  onMonsterRemove: PropTypes.func,
};

CombatMonsterSlider.defaultProps = {
  monsters: [],
  onMonsterRemove: noop,
};

export default withStyles(styles)(CombatMonsterSlider);
