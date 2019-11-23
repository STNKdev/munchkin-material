import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import AugmentedStylesProvider from '../AugmentedStylesProvider';
import AugmentedThemeProvider from '../AugmentedThemeProvider';
import LocaleProvider from '../LocaleProvider';
import OptionsProvider from '../OptionsProvider';
import ReduxProvider from '../ReduxProvider';
import Root from '../Root';

class App extends Component {
  componentDidCatch(error, errorInfo) {
    const { Sentry, store } = this.props;

    if (Sentry) {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });
        scope.setExtra('state', store.getState());
        Sentry.captureException(error);
      });
    }
  }

  render() {
    const { history, options, store } = this.props;

    return (
      <OptionsProvider value={options}>
        <ReduxProvider history={history} store={store}>
          <LocaleProvider>
            <AugmentedStylesProvider>
              <AugmentedThemeProvider>
                <Root />
              </AugmentedThemeProvider>
            </AugmentedStylesProvider>
          </LocaleProvider>
        </ReduxProvider>
      </OptionsProvider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

App.displayName = 'App';

export default hot(App);
