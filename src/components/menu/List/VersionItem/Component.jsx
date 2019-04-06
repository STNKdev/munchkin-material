import React from 'react';
import PropTypes from 'prop-types';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { CellphoneArrowDown, InformationOutline } from 'mdi-material-ui';

import ListItem from '../Item';

const VersionItem = ({ update, version, ...rest }) => (
  <ListItem button {...rest}>
    <ListItemIcon>
      {update ? <CellphoneArrowDown /> : <InformationOutline />}
    </ListItemIcon>
    <ListItemText primary={version} />
  </ListItem>
);

VersionItem.propTypes = {
  update: PropTypes.bool,
  version: PropTypes.string.isRequired,
};

VersionItem.defaultProps = {
  update: false,
};

export default VersionItem;
