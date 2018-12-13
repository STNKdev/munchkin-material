import React, { memo } from 'react';
import { hot } from 'react-hot-loader';
import compose from 'recompose/compose';

import HelperButton from './HelperButton';
import HelperSelector from './HelperSelector';
import Page from './Page';

const CombatScreen = () => (
  <>
    <Page />

    <HelperButton
      TransitionProps={{
        appear: false,
      }}
    />

    <HelperSelector />
  </>
);

export default compose(
  hot(module),
  memo,
)(CombatScreen);
