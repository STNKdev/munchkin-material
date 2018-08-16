import { compose } from 'redux';

import migrations from './migrations';

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return compose(...migrations)(JSON.parse(serializedState));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Can't load state from localStorage");

    return undefined;
  }
};

export const saveState = (key, state) => {
  try {
    const { update, ...savedState } = state;

    const serializedState = JSON.stringify(savedState);

    localStorage.setItem(key, serializedState);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Can't save state to localStorage");
  }
};
