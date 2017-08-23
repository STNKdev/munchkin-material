import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { setCombatHelper } from 'munchkin-core/lib/actions';

import HelperSelector from '../components/HelperSelector';

const mapStateToProps = state => ({
  helpers: state.playerList
    .filter(id => id !== state.combat.playerId)
    .map(id => state.players[id]),
});

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(goBack()),
  onSelect: (id) => {
    dispatch(setCombatHelper(id));
    dispatch(goBack());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HelperSelector);
