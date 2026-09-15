'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTableContainerUtilityClass } from './tableContainerClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableContainerUtilityClass, classes);
};

const TableContainerRoot = styled('div', {
  name: 'MuiTableContainer',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    '--table-scrollbar-thumb':
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.10)',
    '--table-scrollbar-thumb-hover':
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.26)' : 'rgba(0, 0, 0, 0.12)',
    '--table-scrollbar-thumb-active':
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.34)' : 'rgba(0, 0, 0, 0.15)',
    width: '100%',
    overflowX: 'auto',
    borderRadius: 12,
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--table-scrollbar-thumb) transparent',
    '&::-webkit-scrollbar': {
      width: 4,
      height: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--table-scrollbar-thumb)',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: 'var(--table-scrollbar-thumb-hover)',
      },
      '&:active': {
        backgroundColor: 'var(--table-scrollbar-thumb-active)',
      },
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  })),
);

const TableContainer = React.forwardRef(function TableContainer(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTableContainer' });
  const { className, component = 'div', ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TableContainerRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    />
  );
});

TableContainer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `Table`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TableContainer;
