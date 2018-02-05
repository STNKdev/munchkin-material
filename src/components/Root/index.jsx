import React, { Fragment } from 'react';

import Combat from '../../pages/Combat';
import Home from '../../pages/Home';
import Player from '../../pages/Player';
import PlayerForm from '../../pages/PlayerForm';

import DiceDialog from '../dice/Dialog';

const Root = () => (
  <Fragment>
    <Home />
    <PlayerForm />
    <Player />
    <Combat />

    <DiceDialog />
  </Fragment>
);

export default Root;
