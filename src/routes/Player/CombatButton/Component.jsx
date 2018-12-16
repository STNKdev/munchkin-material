import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SwordCross } from 'mdi-material-ui';
import { noop } from 'lodash/fp';

import Fab from '../../../components/Fab';

class PlayerScreenCombatButtonComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { goToCombat, playerId } = this.props;

    if (playerId) {
      goToCombat(playerId);
    }
  }

  render() {
    const { goToCombat, playerId, ...rest } = this.props;

    return (
      <Fab
        data-screenshots="combat-button"
        onClick={this.handleClick}
        {...rest}
      >
        <SwordCross />
      </Fab>
    );
  }
}

PlayerScreenCombatButtonComponent.propTypes = {
  goToCombat: PropTypes.func,
  playerId: PropTypes.string,
};

PlayerScreenCombatButtonComponent.defaultProps = {
  goToCombat: noop,
  playerId: null,
};

export default PlayerScreenCombatButtonComponent;
