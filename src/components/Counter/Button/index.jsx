import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDrag } from 'react-use-gesture';

const displayName = 'CounterButton';

const CounterButton = ({ disabled, onClick, ...rest }) => {
  const ref = useRef();
  const timeoutRef = useRef(0);
  const intervalRef = useRef(0);

  const clearPress = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = 0;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);

      intervalRef.current = 0;
    }
  }, []);

  useEffect(() => () => clearPress(), [clearPress]);
  useEffect(() => {
    if (disabled) {
      clearPress();
    }
  }, [clearPress, disabled]);

  const bind = useDrag(
    (state) => {
      const { event, first, tap } = state;

      if (first && !timeoutRef.current && !intervalRef.current) {
        event.preventDefault();

        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(() => onClick(), 250);
        }, 500);
      }

      if (tap) {
        if (!intervalRef.current && !disabled) {
          onClick();
        }
      }

      if (!first) {
        clearPress();
      }
    },
    {
      domTarget: ref,
      eventOptions: {
        passive: false,
      },
    },
  );

  useEffect(() => {
    bind();
  }, [bind]);

  const onKeyDown = ({ key }) => {
    if (key === ' ' || key === 'Enter') {
      onClick();
    }
  };

  return (
    <IconButton ref={ref} disabled={disabled} {...rest} onKeyDown={onKeyDown} />
  );
};

CounterButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CounterButton.defaultProps = {
  disabled: false,
};

CounterButton.displayName = displayName;

export default CounterButton;
