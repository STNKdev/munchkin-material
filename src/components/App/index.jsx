import React, { PureComponent } from 'react';
import Provider from 'react-redux/es/components/Provider';
import { storeShape } from 'react-redux/es/utils/PropTypes';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';

import Root from '../../routes/Root';
import noop from '../../utils/noop';
import LocaleProvider from '../../containers/LocaleProvider';
import munchkinWoff from '../../fonts/munchkin.woff';
import munchkinWoff2 from '../../fonts/munchkin.woff2';
import munchkinTheme from '../../styles/munchkinTheme';

const styles = {
  '@global': {
    '@font-face': {
      fontFamily: 'Munchkin',
      src: `
        url(${munchkinWoff2}) format('woff2'),
        url(${munchkinWoff}) format('woff')`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },

    html: {
      height: '100%',
      lineHeight: 1.15,
      overflow: 'hidden',
      textSizeAdjust: '100%',
    },

    body: {
      height: '100%',
      overflow: 'hidden',
      userSelect: 'none',
      width: '100%',
      '-webkit-touch-callout': 'none', /* iOS Safari */
    },

    '#app': {
      backgroundColor: '#000000',
      height: '100%',
      position: 'relative',
    },
  },
};

class App extends PureComponent {
  getChildContext() {
    const { buyFullVersion } = this.props;

    return { buyFullVersion };
  }

  render() {
    const { history, store } = this.props;

    return (
      <Provider store={store}>
        <LocaleProvider>
          <MuiThemeProvider theme={munchkinTheme}>
            <Reboot>
              <ConnectedRouter history={history}>
                <Root />
              </ConnectedRouter>
            </Reboot>
          </MuiThemeProvider>
        </LocaleProvider>
      </Provider>
    );
  }
}

App.childContextTypes = {
  buyFullVersion: PropTypes.func,
};

App.propTypes = {
  buyFullVersion: PropTypes.func,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: storeShape.isRequired, // eslint-disable-line react/no-typos
};

App.defaultProps = {
  buyFullVersion: noop,
};

export default withStyles(styles)(App);
