import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import { getLocale, getMessages } from '../i18n';

const mapStateToProps = (state) => {
  const locale = state.app.locale || getLocale();

  return {
    key: locale, // https://github.com/yahoo/react-intl/issues/234#issuecomment-163366518
    locale,
    messages: getMessages(locale),
  };
};

export default connect(mapStateToProps)(IntlProvider);
