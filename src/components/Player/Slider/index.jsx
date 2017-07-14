import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import cns from 'classnames';
import { Player } from 'munchkin';

import banner from './banner';

import DiceMultipleIcon from '../../icons/dice/multiple';
import { Layout, LayoutContent, LayoutHeader } from '../../Layout';
import AppBar from '../../material-ui/AppBar';
import { noop } from '../../../constants';
import DiceDialog from '../../../containers/DiceDialog';
import PlayerStats from '../../../containers/Player/Stats';
import { classesShape } from '../../../helpers/PropTypes';

const styles = {
  sliderContent: {
    display: 'flex',
  },

  bannerVisible: {
    paddingBottom: '50px',
  },

  slider: {
    display: 'flex',
    width: '100%',

    '& .slick-list': {
      display: 'flex',
      overflow: 'hidden',
    },

    '& .slick-track': {
      display: 'flex',
      flexShrink: '0',
    },
  },

  item: {
    display: 'flex',
  },
};

class PlayerSlider extends Component {
  constructor(props) {
    super(props);

    const { players, selectedPlayer } = props;

    this.state = {
      initialSlide: players.indexOf(selectedPlayer),
    };
  }

  componentWillMount() {
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleChangeIndex(index) {
    const { onPlayerChange, players } = this.props;

    onPlayerChange(players[index]);
  }

  render() {
    const {
      bannerVisible,
      classes,
      onBack,
      onDiceTouchTap,
      players,
      selectedPlayer,
    } = this.props;

    const { initialSlide } = this.state;

    const backButton = (
      <IconButton onTouchTap={onBack}>
        <NavigationArrowBack />
      </IconButton>
    );

    const diceButton = (
      <IconButton onTouchTap={() => onDiceTouchTap()}>
        <DiceMultipleIcon />
      </IconButton>
    );

    return (
      <Layout>
        <LayoutHeader>
          <AppBar
            iconElementLeft={backButton}
            iconElementRight={diceButton}
            title={selectedPlayer.name}
          />
        </LayoutHeader>
        <LayoutContent
          className={cns(classes.sliderContent, { [classes.bannerVisible]: bannerVisible })}
        >
          <Slider
            afterChange={this.handleChangeIndex}
            arrows={false}
            className={classes.slider}
            initialSlide={initialSlide}
            speed={300}
          >
            {
              players.map(player => (
                <div className={classes.item} key={player.id}>
                  <PlayerStats player={player} />
                </div>
              ))
            }
          </Slider>

          <DiceDialog />
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerSlider.propTypes = {
  bannerVisible: PropTypes.bool,
  classes: classesShape.isRequired,
  onBack: PropTypes.func,
  onDiceTouchTap: PropTypes.func,
  onPlayerChange: PropTypes.func,
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)).isRequired,
  selectedPlayer: PropTypes.instanceOf(Player).isRequired,
};

PlayerSlider.defaultProps = {
  bannerVisible: false,
  onBack: noop,
  onDiceTouchTap: noop,
  onPlayerChange: noop,
};

export default banner(injectSheet(styles)(PlayerSlider));
