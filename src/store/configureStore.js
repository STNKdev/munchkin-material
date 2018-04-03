/* global __VERSION__ */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import version from 'munchkin-core/lib/utils/version';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { pick, throttle } from 'lodash';
import { setVersion } from 'munchkin-core/lib/ducks/versions';

import reducers from '../reducers';

import { loadState, saveState } from './localStorage';
import purchase from './middlewares/purchase';

const getRootReducer = (history) =>
  compose(connectRouter(history), combineReducers)(reducers);

export default ({ buyFullVersion, history, storageKey }) => {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk, purchase(buyFullVersion), routerMiddleware(history)),
  );

  const preloadedState = loadState(storageKey);

  const store = createStore(getRootReducer(history), preloadedState, enhancer);

  store.subscribe(
    throttle(() => {
      const state = pick(store.getState(), Object.keys(reducers));

      saveState(storageKey, state);
    }, 100),
  );

  /* istanbul ignore if  */
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(getRootReducer(history)),
    );
  }

  store.dispatch(setVersion('core', version));
  store.dispatch(setVersion('app', __VERSION__));

  return store;
};
