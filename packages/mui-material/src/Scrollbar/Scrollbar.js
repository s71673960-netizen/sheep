'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

const ScrollbarRoot = styled('div', {
  name: 'UiScrollbar',
  slot: 'Root',
})(
  memoTheme(({ theme }) => {
    const thumb = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.10)';
    const thumbHover = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.26)' : 'rgba(0, 0, 0, 0.12)';
    const thumbActive = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.34)' : 'rgba(0, 0, 0, 0.15)';

    return {
      overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: 4,
        height: 4,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: thumb,
        borderRadius: 4,
        '&:hover': {
          backgroundColor: thumbHover,
        },
        '&:active': {
          backgroundColor: thumbActive,
        },
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      scrollbarWidth: 'thin',
      scrollbarColor: `${thumb} transparent`,
    };
  }),
);

const Scrollbar = React.forwardRef(function Scrollbar(props, ref) {
  const { children, sx, component = 'div', ...other } = props;

  return (
    <ScrollbarRoot as={component} ref={ref} sx={sx} {...other}>
      {children}
    </ScrollbarRoot>
  );
});

Scrollbar.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Scrollbar;
