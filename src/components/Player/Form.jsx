import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { RadioGroup } from 'redux-form-material-ui';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Radio from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { duration } from 'material-ui/styles/transitions';
import NavigationArrowBack from 'material-ui-icons/ArrowBack';
import NavigationCheck from 'material-ui-icons/Check';
import SocialPersonAdd from 'material-ui-icons/PersonAdd';
import { GENDER } from 'munchkin-core';

import Layout, { LayoutContent, LayoutHeader } from '../Layout/index';
import { noop, PLAYER_FORM } from '../../constants/index';
import PlayerColorPickerField from '../../containers/PlayerColorPickerField';
import GenderFemale from '../icons/gender/Female';
import GenderMale from '../icons/gender/Male';
import { classesObject } from '../../utils/propTypes';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

const styles = {
  title: {
    flex: 1,
  },

  content: {
    padding: [0, 16],
  },
};

class PlayerForm extends Component {
  static renderTextField({ input, ...props }) {
    return <TextField {...input} {...props} />;
  }

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.autoFocusTimeoutid = setTimeout(() => {
        delete this.autoFocusTimeoutid;

        const node = document.querySelector('input[name="name"]');

        if (node) {
          node.focus();
        }
      }, duration.enteringScreen);
    }
  }

  componentWillUnmount() {
    if (this.autoFocusTimeoutid) {
      clearTimeout(this.autoFocusTimeoutid);
    }
  }

  render() {
    const {
      className, classes, handleSubmit, intl, newPlayer, onCancel, onImport, title,
    } = this.props;

    return (
      <Layout className={className}>
        <LayoutHeader>
          <AppBar color="primary" position="static">
            <Toolbar disableGutters>
              <IconButton color="contrast" onClick={onCancel}>
                <NavigationArrowBack />
              </IconButton>

              <Typography
                className={classes.title}
                color="inherit"
                noWrap
                type="title"
              >
                {title}
              </Typography>

              <IconButton color="contrast" onClick={handleSubmit}>
                <NavigationCheck />
              </IconButton>
            </Toolbar>
          </AppBar>
        </LayoutHeader>
        <LayoutContent>
          <form
            autoComplete="off"
            className={classes.content}
            noValidate
            onSubmit={handleSubmit}
          >
            <Field component="input" name="avatar" type="hidden" />

            <Field
              component={this.constructor.renderTextField}
              fullWidth
              margin="normal"
              name="name"
              placeholder={intl.formatMessage(messages.label)}
            />

            {
              newPlayer && navigator.contacts ? (
                <IconButton
                  disableTouchRipple
                  onClick={onImport}
                  style={{
                    height: 24,
                    padding: 0,
                    position: 'absolute',
                    right: 0,
                    top: 12,
                    width: 24,
                  }}
                >
                  <SocialPersonAdd />
                </IconButton>
              ) : null
            }

            <Grid container>
              <Grid item xs={6} sm={3} md={2} lg={1}>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">
                    <FormattedMessage id="player.form.gender" defaultMessage="Gender" />
                  </FormLabel>
                  <Field component={RadioGroup} name="gender">
                    <FormControlLabel
                      control={<Radio />}
                      label={<GenderMale />}
                      value={GENDER.MALE}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label={<GenderFemale />}
                      value={GENDER.FEMALE}
                    />
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={3} md={2} lg={1}>
                <FormControl margin="normal">
                  <FormLabel>
                    <FormattedMessage id="player.form.color" defaultMessage="Color" />
                  </FormLabel>
                  <Field component={PlayerColorPickerField} name="color" />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </LayoutContent>
      </Layout>
    );
  }
}

PlayerForm.propTypes = {
  autoFocus: PropTypes.bool,
  classes: classesObject.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  newPlayer: PropTypes.bool,
  onCancel: PropTypes.func,
  onImport: PropTypes.func,
  title: PropTypes.node,
};

PlayerForm.defaultProps = {
  autoFocus: false,
  className: '',
  newPlayer: true,
  onImport: noop,
  onCancel: noop,
  title: null,
};

export default reduxForm({
  form: PLAYER_FORM,
  pure: false,
})(injectIntl(withStyles(styles)(PlayerForm)));
