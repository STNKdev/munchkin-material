import React from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core';
import { get } from 'lodash/fp';

import createTheme from '../../styles/createTheme';
import themes from '../../styles/themes';

import GlobalCss from './GlobalCss';

const themeSelector = createSelector(
  get('theme'),
  (theme) => createTheme(themes[theme.id], theme.type),
);

const mapStateToProps = createStructuredSelector({
  theme: themeSelector,
});

const mapDispatchToProps = {};

const ThemeProvider = ({ children, theme }) => (
  <MuiThemeProvider theme={theme}>
    <GlobalCss />
    {children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemeProvider);
