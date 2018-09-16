import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Share from '@material-ui/icons/Share';

const messages = defineMessages({
  share: {
    id: 'menu.share',
    defaultMessage: 'Share',
  },

  text: {
    id: 'share.text',
    defaultMessage: 'Simple but powerful Munchkin level counter',
  },

  title: {
    id: 'share.title',
    defaultMessage: 'Munchkin Level Counter',
  },
});

const ShareItem = ({ intl, onClick, shareLink, ...rest }) => (
  <ListItem
    button
    onClick={() =>
      onClick({
        text: intl.formatMessage(messages.text),
        title: intl.formatMessage(messages.share),
        url: shareLink,
      })
    }
    {...rest}
  >
    <ListItemIcon>
      <Share />
    </ListItemIcon>
    <ListItemText primary={intl.formatMessage(messages.share)} />
  </ListItem>
);

ShareItem.propTypes = {
  intl: intlShape.isRequired,
  shareLink: PropTypes.string.isRequired,
};

export default injectIntl(ShareItem);
