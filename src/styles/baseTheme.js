import deepmerge from 'deepmerge';
import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import createPalette from '@material-ui/core/styles/createPalette';

import { ios } from '../utils/platforms';

const breakpoints = createBreakpoints({});

export default (type) => {
  const palette = createPalette({ type });

  let theme = {
    mixins: {
      toolbar: {
        minHeight: 56,

        [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
          minHeight: 48,
        },

        [`${breakpoints.up('sm')} and (orientation: portrait)`]: {
          minHeight: 64,
        },

        [breakpoints.up('md')]: {
          minHeight: 64,
        },
      },
    },

    overrides: {
      MuiAvatar: {
        colorDefault: {
          backgroundColor: brown[500],
        },
      },

      MuiDialog: {
        paperScrollPaper: {
          maxHeight: 'calc(100% - 32px)',
        },
      },
    },

    palette: {
      primary: {
        main: brown[500],
      },
      secondary: {
        main: orange.A400,
      },
    },

    props: {
      MuiTooltip: {
        disableFocusListener: true,
        disableHoverListener: ios,
      },
    },

    typography: {
      fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
      useNextVariants: true,
    },
  };

  if (type === 'light') {
    theme = deepmerge(theme, {
      overrides: {
        MuiIconButton: {
          root: {
            color: palette.text.primary,
          },
        },
      },
    });
  }

  if (type === 'dark') {
    theme = deepmerge(theme, {
      palette: {
        background: {
          default: '#202124', // got it from Contacts app for Android & material.io web site
        },
      },
    });
  }

  return theme;
};
