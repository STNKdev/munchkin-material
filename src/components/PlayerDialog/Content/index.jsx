import React, { createRef, PureComponent } from 'react';
import { Field } from 'react-final-form';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  TextField,
  withStyles,
} from '@material-ui/core';
import { GenderFemale, GenderMale } from 'mdi-material-ui';
import { FEMALE, MALE } from 'munchkin-core';

import ColorPicker from '../ColorPicker';

const messages = defineMessages({
  label: {
    id: 'player.form.namePlaceholder',
    defaultMessage: 'Name',
  },
});

const styles = {
  label: {
    marginTop: 0,
  },

  icon: {
    verticalAlign: 'middle',
  },
};

const renderColorPicker = ({ input, ...props }) => (
  <ColorPicker {...input} {...props} />
);

const renderRadio = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    input: { checked, name, onChange, value, ...inputProps },
  } = props;

  return (
    <Radio
      checked={checked}
      color="primary"
      inputProps={inputProps}
      name={name}
      onChange={onChange}
      value={value}
    />
  );
};

const renderTextField = ({ input, meta, ...props }) => (
  <TextField {...input} {...props} />
);

class PlayerForm extends PureComponent {
  constructor(props) {
    super(props);

    this.nameRef = createRef();
  }

  render() {
    const { autoFocus, classes, intl } = this.props;

    return (
      <>
        <Field
          autoComplete="off"
          autoFocus={autoFocus}
          component={renderTextField}
          fullWidth
          inputRef={this.nameRef}
          margin="normal"
          name="name"
          placeholder={intl.formatMessage(messages.label)}
        />

        <Grid container>
          <Grid item xs={6}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">
                <FormattedMessage id="player.form.sex" defaultMessage="Sex" />
              </FormLabel>
              <FormControlLabel
                classes={{
                  label: classes.label,
                }}
                control={
                  <Field component={renderRadio} name="sex" type="radio" />
                }
                label={<GenderMale className={classes.icon} />}
                value={MALE}
              />
              <FormControlLabel
                classes={{
                  label: classes.label,
                }}
                control={
                  <Field component={renderRadio} name="sex" type="radio" />
                }
                label={<GenderFemale className={classes.icon} />}
                value={FEMALE}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl margin="normal">
              <FormLabel>
                <FormattedMessage
                  id="player.form.color"
                  defaultMessage="Color"
                />
              </FormLabel>
              <Field component={renderColorPicker} name="color" />
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
  }
}

PlayerForm.propTypes = {
  autoFocus: PropTypes.bool,
  intl: intlShape.isRequired,
};

PlayerForm.defaultProps = {
  autoFocus: false,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(PlayerForm);
