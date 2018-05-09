import React, { PureComponent } from 'react';
import { Field, Form } from 'react-final-form';
import compose from 'recompose/compose';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';
import Radio from 'material-ui/Radio';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Slide from 'material-ui/es/transitions/Slide';
import { noop } from 'lodash';
import { FEMALE, MALE } from 'munchkin-core/lib/utils/sex';

import SexFemale from '../../../../components/icons/sex/Female';
import SexMale from '../../../../components/icons/sex/Male';
import { sexProp } from '../../../../utils/propTypes';

import AppBar from './AppBar';
import ColorPicker from './ColorPicker';

const FORM_ID = 'player-form';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

const styles = (theme) => ({
  dialog: {
    minWidth: 320,
  },

  title: {
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },

  icon: {
    fontSize: theme.typography.pxToRem(24),
  },
});

class DialogComponent extends PureComponent {
  static handleExternalSubmit() {
    document.getElementById(FORM_ID).dispatchEvent(new Event('submit'));
  }

  static renderColorPicker({ input, ...props }) {
    return <ColorPicker {...input} {...props} />;
  }

  static renderRadio(props) {
    const {
      input: { checked, name, onChange, value, ...restInput },
    } = props;

    return (
      <Radio
        checked={checked}
        color="primary"
        inputProps={restInput}
        name={name}
        onChange={onChange}
        value={value}
      />
    );
  }

  static renderTextField({ input, ...props }) {
    return <TextField {...input} {...props} />;
  }

  constructor(props) {
    super(props);

    this.state = {
      appear: props.appear,
    };

    this.handleExited = this.handleExited.bind(this);
    this.renderTransition = this.renderTransition.bind(this);
  }

  handleExited() {
    if (!this.state.appear) {
      this.setState({
        appear: true,
      });
    }
  }

  renderTransition(props) {
    const { appear } = this.state;

    return <Slide {...props} appear={appear} direction="up" />;
  }

  render() {
    const {
      classes,
      fullScreen,
      initialValues,
      intl,
      newPlayer,
      onClose,
      onSubmit,
      open,
    } = this.props;

    const title =
      initialValues && initialValues.id ? (
        <FormattedMessage
          id="player.form.titleEdit"
          defaultMessage="Edit munchkin"
        />
      ) : (
        <FormattedMessage
          id="player.form.title"
          defaultMessage="New munchkin"
        />
      );

    return (
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        fullScreen={fullScreen}
        hideBackdrop={fullScreen}
        onClose={onClose}
        onExited={this.handleExited}
        open={open}
        TransitionComponent={this.renderTransition}
      >
        <DialogTitle className={classes.title}>
          <Hidden smUp>
            <AppBar
              onSubmit={DialogComponent.handleExternalSubmit}
              title={title}
            />
          </Hidden>
          <Hidden xsDown>{title}</Hidden>
        </DialogTitle>
        <DialogContent>
          <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            subscription={{ submitting: true }}
            render={({ handleSubmit }) => (
              <form
                autoComplete="off"
                id={FORM_ID}
                noValidate
                onSubmit={handleSubmit}
              >
                <Field
                  autoFocus={newPlayer}
                  component={DialogComponent.renderTextField}
                  fullWidth
                  margin="normal"
                  name="name"
                  placeholder={intl.formatMessage(messages.label)}
                />

                <Grid container>
                  <Grid item xs={6} md={2} lg={1}>
                    <FormControl component="fieldset" margin="normal">
                      <FormLabel component="legend">
                        <FormattedMessage
                          id="player.form.sex"
                          defaultMessage="Sex"
                        />
                      </FormLabel>
                      <FormControlLabel
                        control={
                          <Field
                            component={DialogComponent.renderRadio}
                            name="sex"
                            type="radio"
                          />
                        }
                        label={<SexMale className={classes.icon} />}
                        value={MALE}
                      />
                      <FormControlLabel
                        control={
                          <Field
                            component={DialogComponent.renderRadio}
                            name="sex"
                            type="radio"
                          />
                        }
                        label={<SexFemale className={classes.icon} />}
                        value={FEMALE}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} md={2} lg={1}>
                    <FormControl margin="normal">
                      <FormLabel>
                        <FormattedMessage
                          id="player.form.color"
                          defaultMessage="Color"
                        />
                      </FormLabel>
                      <Field
                        component={DialogComponent.renderColorPicker}
                        name="color"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </DialogContent>
        <Hidden xsDown>
          <DialogActions>
            <Button color="primary" onClick={onClose}>
              <FormattedMessage
                id="player.form.cancel"
                defaultMessage="Cancel"
              />
            </Button>
            <Button
              color="primary"
              onClick={DialogComponent.handleExternalSubmit}
            >
              <FormattedMessage id="player.form.save" defaultMessage="Save" />
            </Button>
          </DialogActions>
        </Hidden>
      </Dialog>
    );
  }
}

DialogComponent.propTypes = {
  appear: PropTypes.bool,
  fullScreen: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string,
    sex: sexProp.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
  newPlayer: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
};

DialogComponent.defaultProps = {
  appear: false,
  newPlayer: true,
  onClose: noop,
  onSubmit: noop,
  open: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
  withMobileDialog({ breakpoint: 'xs' }),
)(DialogComponent);
