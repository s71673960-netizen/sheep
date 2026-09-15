'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';

const StatusDotRoot = styled('span', {
  name: 'MuiStatusDot',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'ownerState',
})(
  memoTheme(({ theme }) => ({
    display: 'inline-block',
    borderRadius: '50%',
    flexShrink: 0,
    variants: [
      { props: { size: 'small' }, style: { width: 6, height: 6 } },
      { props: { size: 'medium' }, style: { width: 10, height: 10 } },
      { props: { size: 'large' }, style: { width: 14, height: 14 } },
      ...['primary', 'success', 'warning', 'error', 'info'].map((color) => ({
        props: ({ ownerState }) => ownerState.color === color,
        style: {
          backgroundColor: (theme.vars || theme).palette[color].main,
        },
      })),
      {
        props: ({ ownerState }) => ownerState.animate === true,
        style: {
          animation: 'statusDotBreathe 2s ease-in-out infinite',
          '@keyframes statusDotBreathe': {
            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
            '50%': { opacity: 0.5, transform: 'scale(0.8)' },
          },
        },
      },
    ],
  })),
);

const StatusDot = React.forwardRef(function StatusDot(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiStatusDot' });
  const {
    type,
    color: colorProp = 'primary',
    size = 'medium',
    animate = false,
    sx,
    ...other
  } = props;

  const color = type || colorProp;

  const ownerState = { color, size, animate };

  return (
    <StatusDotRoot
      ref={ref}
      ownerState={ownerState}
      size={size}
      sx={sx}
      {...other}
    />
  );
});

StatusDot.propTypes = {
  animate: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
};

export default StatusDot;
