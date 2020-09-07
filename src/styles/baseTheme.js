import orange from '@material-ui/core/colors/orange';
import { fade } from '@material-ui/core/styles/colorManipulator';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import createPalette from '@material-ui/core/styles/createPalette';
import deepmerge from 'deepmerge';

const breakpoints = createBreakpoints({});

export default ({ direction, type }) => {
  const palette = createPalette({ type });

  let theme = {
    components: {
      MuiDialog: {
        styleOverrides: {
          paperScrollPaper: {
            maxHeight: 'calc(100% - 32px)',
          },
        },
      },

      MuiSnackbar: {
        styleOverrides: {
          root: {
            '@supports (padding: max(0px))': {
              left: 'max(8px, env(safe-area-inset-right))',
              right: 'max(8px, env(safe-area-inset-right))',
            },
          },

          anchorOriginBottomLeft: {
            '@supports (padding: max(0px))': {
              [breakpoints.up('sm')]: {
                left: 'max(24px, env(safe-area-inset-right))',
                right: 'max(24px, env(safe-area-inset-right))',
              },
            },
          },
        },
      },

      MuiSpeedDialAction: {
        styleOverrides: {
          fab: {
            color: undefined,
            backgroundColor: undefined,

            '&:hover': {
              backgroundColor: undefined,
            },
          },
        },
      },
    },

    direction,

    mixins: {
      toolbar: {
        minHeight: 56,

        [breakpoints.up('md')]: {
          minHeight: 64,
        },
      },
    },

    palette: {
      secondary: {
        main: orange.A400,
      },
    },

    typography: {
      fontFamily: '"Roboto", "San Francisco", "Helvetica", "Arial", sans-serif',
    },
  };

  if (type === 'light') {
    theme = deepmerge(theme, {
      components: {
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: palette.text.primary,
            },
          },
        },
      },
    });
  }

  if (type === 'dark') {
    theme = deepmerge(theme, {
      components: {
        MuiPaper: {
          styleOverrides: {
            elevation1: {
              backgroundColor: fade(palette.common.white, 0.05),
              boxShadow: 'none',
            },

            elevation2: {
              backgroundColor: fade(palette.common.white, 0.07),
              boxShadow: 'none',
            },
          },
        },
      },

      palette: {
        background: {
          default: '#121212',
        },
      },
    });
  }

  return theme;
};
