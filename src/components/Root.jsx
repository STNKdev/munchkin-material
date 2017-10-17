import React from 'react';
import { Provider } from 'react-redux';
import { storeShape } from 'react-redux/lib/utils/PropTypes';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import Locale from '../containers/ConnectedIntlProvider';
import munchkinWoff from '../fonts/munchkin.woff';
import munchkinWoff2 from '../fonts/munchkin.woff2';
import munchkinTheme from '../styles/munchkinTheme';

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

    '*': {
      '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)', /* make transparent link selection, adjust last value opacity 0 to 1.0 */
    },

    html: {
      height: '100%',
      lineHeight: 1.15,
      '-ms-text-size-adjust': '100%',
      '-webkit-text-size-adjust': '100%',
    },

    body: {
      height: '100%',
      margin: 0,
      overflow: 'hidden',
      width: '100%',
      '-webkit-touch-callout': 'none', /* iOS Safari */
      userSelect: 'none', /* Non-prefixed version, currently supported by Chrome and Opera */
    },

    '#app': {
      height: '100%',
    },
  },
};

const Root = ({ history, store }) => (
  <Provider store={store}>
    <Locale>
      <MuiThemeProvider theme={munchkinTheme}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Locale>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: storeShape.isRequired, // eslint-disable-line react/no-typos
};

export default withStyles(styles)(Root);
