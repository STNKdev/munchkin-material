import brown from 'material-ui/colors/brown';
import { createMuiTheme } from 'material-ui/styles';
import createBreakpoints from 'material-ui/styles/createBreakpoints';

import { ios } from '../helpers/platforms';

const breakpoints = createBreakpoints({});

const theme = {
  overrides: {
    MuiAppBar: {
      root: {
        textAlign: ios ? 'center' : 'left',
      },
    },

    MuiButtonBase: {
      root: {
        color: 'rgba(0, 0, 0, 0.38)',
      },
    },

    MuiToolbar: {
      root: {
        [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
          minHeight: 56,
        },
      },
    },
  },

  palette: {
    primary: brown,
  },

  typography: {
    fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
  },
};

export default createMuiTheme(theme);
