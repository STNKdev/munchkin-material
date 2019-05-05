import PropTypes from 'prop-types';
import { FEMALE, MALE } from 'munchkin-core';

import availableColors from './availableColors';

export const colorType = PropTypes.oneOf(availableColors);

export const matchShape = PropTypes.shape({
  params: PropTypes.object,
});

export const monsterShape = PropTypes.shape({
  bonus: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
});

export const playerShape = PropTypes.shape({
  gear: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string,
});

export const sexProp = PropTypes.oneOf([FEMALE, MALE]);
