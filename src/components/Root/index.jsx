import React, { Fragment } from 'react';
import Helmet from 'react-helmet/es/Helmet';
import Hidden from 'material-ui/Hidden';

import Mobile from '../../structures/Mobile';
import Tablet from '../../structures/Tablet';

import DiceDialog from '../dice/Dialog';

const Root = () => (
  <Fragment>
    <Helmet>
      <html lang={navigator.language} />
    </Helmet>

    <Hidden smUp>
      <Mobile />
    </Hidden>

    <Hidden xsDown>
      <Tablet />
    </Hidden>

    <DiceDialog />
  </Fragment>
);

export default Root;
