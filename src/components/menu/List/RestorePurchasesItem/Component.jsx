import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { CloudDownloadOutline } from 'mdi-material-ui';

import ListItem from '../Item';

const VersionItem = ({ restorePurchases, ...rest }) => (
  <ListItem button onClick={restorePurchases} {...rest}>
    <ListItemIcon>
      <CloudDownloadOutline />
    </ListItemIcon>
    <ListItemText
      primary={
        <FormattedMessage
          defaultMessage="Restore purchases"
          id="menu.restorePurchases"
        />
      }
    />
  </ListItem>
);

VersionItem.propTypes = {
  restorePurchases: PropTypes.func.isRequired,
};

export default VersionItem;