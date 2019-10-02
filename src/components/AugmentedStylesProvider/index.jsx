import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { getDirection } from '../../i18n';

const AugmentedStylesProvider = ({ children }) => {
  const { locale } = useIntl();
  const direction = getDirection(locale);

  const jss = useMemo(
    () =>
      create({
        plugins: [
          ...jssPreset().plugins,
          rtl({ enabled: direction === 'rtl' }),
        ],
      }),
    [direction],
  );

  return <StylesProvider jss={jss}>{children}</StylesProvider>;
};

AugmentedStylesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

AugmentedStylesProvider.displayName = 'AugmentedStylesProvider';

export default AugmentedStylesProvider;
