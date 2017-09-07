import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { noop } from '../constants';

const messages = defineMessages({
  label: {
    id: 'mainButton.label',
    defaultMessage: 'Add a new munchkin',
  },
});

const NewPlayerButton = ({ intl, onClick }) => (
  <FloatingActionButton
    aria-label={intl.formatMessage(messages.label)}
    onClick={onClick}
  >
    <ContentAdd />
  </FloatingActionButton>
);

NewPlayerButton.propTypes = {
  intl: intlShape.isRequired,
  onClick: PropTypes.func,
};

NewPlayerButton.defaultProps = {
  onClick: noop,
};

export default injectIntl(NewPlayerButton);
