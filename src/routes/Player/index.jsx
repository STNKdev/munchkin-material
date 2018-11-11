import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import Transition from 'react-transition-group/Transition';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

import FadeUp from '../../components/FadeUp';
import ModalScreen from '../../components/ModalScreen';

import { Provider } from './context';
import CombatButton from './CombatButton';
import Page from './Page';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.modal - 1,
  },

  transition: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    outline: 'none',
  },
});

class PlayerScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appear: props.appear,
      playerId: props.match.params.id,
    };
  }

  getChildContext() {
    const { playerId } = this.state;

    return { playerId };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { match } = nextProps;

    if (match && match.params.id !== prevState.playerId) {
      return {
        playerId: match.params.id,
      };
    }

    return null;
  }

  componentDidMount() {
    const { appear } = this.state;

    if (!appear) {
      this.setState({
        appear: true,
      });
    }
  }

  render() {
    const { classes, match, theme } = this.props;
    const { appear, playerId } = this.state;

    const inProp = Boolean(match) && match.isExact;

    return (
      <ModalScreen
        className={classes.root}
        disablePortal
        hideBackdrop
        open={Boolean(match)}
      >
        <Transition
          appear={appear}
          in={Boolean(match)}
          mountOnEnter
          timeout={{
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
          }}
          unmountOnExit
        >
          <div className={classes.transition}>
            <Provider value={playerId}>
              <FadeUp
                appear={appear}
                in={Boolean(match)}
                mountOnEnter
                unmountOnExit
              >
                <Page />
              </FadeUp>
              <Zoom
                appear={appear}
                in={inProp}
                style={{
                  transitionDelay: inProp
                    ? theme.transitions.duration.leavingScreen
                    : 0,
                }}
              >
                <CombatButton />
              </Zoom>
            </Provider>
          </div>
        </Transition>
      </ModalScreen>
    );
  }
}

PlayerScreen.childContextTypes = {
  playerId: PropTypes.string,
};

PlayerScreen.propTypes = {
  appear: PropTypes.bool.isRequired,
  match: PropTypes.object,
};

PlayerScreen.defaultProps = {
  match: null,
};

export default compose(
  hot(module),
  withStyles(styles, { withTheme: true }),
)(PlayerScreen);
