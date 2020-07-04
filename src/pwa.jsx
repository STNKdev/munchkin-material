import './polyfills';

import 'firebase/analytics';
import firebase from 'firebase/app';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './components/App';
import AugmentedStylesProvider from './components/AugmentedStylesProvider';
import AugmentedThemeProvider from './components/AugmentedThemeProvider';
import LocaleProvider from './components/LocaleProvider';
import SentryHelper from './components/SentryHelper';
import WorkboxProvider from './components/WorkboxProvider';
import sentry from './sentry';
import configureStore from './store/configureStore';

if (process.env.NODE_ENV === 'production') {
  sentry('web', 'https://41e93153dfb94d9db3ed8a2cbc7228a9@sentry.io/253536');

  firebase.initializeApp({
    apiKey: 'AIzaSyAwIA0iUuTMsyEOumkpDODkhXtpaMwDq_U',
    appId: '1:996090838746:web:502ca5d05189215f',
    authDomain: 'izorg-munchkin.firebaseapp.com',
    databaseURL: 'https://izorg-munchkin.firebaseio.com',
    measurementId: 'G-PXJHCTHZLJ',
    messagingSenderId: '996090838746',
    projectId: 'izorg-munchkin',
    storageBucket: 'izorg-munchkin.appspot.com',
  });
  firebase.analytics();
}

const store = configureStore();

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

const history = createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={history}>
      <SentryHelper>
        <WorkboxProvider>
          <LocaleProvider>
            <AugmentedStylesProvider>
              <AugmentedThemeProvider>
                <App />
              </AugmentedThemeProvider>
            </AugmentedStylesProvider>
          </LocaleProvider>
        </WorkboxProvider>
      </SentryHelper>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
