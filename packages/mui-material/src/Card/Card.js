'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Paper from '../Paper';
import { getCardUtilityClass } from './cardClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardUtilityClass, classes);
};

const CardRoot = styled(Paper, {
  name: 'MuiCard',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    overflow: 'hidden',
    border: 'none',
    transition: 'box-shadow 0.3s, border-color 0.3s',
    variants: [
      {
        props: ({ ownerState }) => ownerState.hoverable,
        style: {
          cursor: 'pointer',
          '&:hover': {
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 8px 24px rgba(0,0,0,0.28)'
                : '0 0 0 1px rgba(0,0,0,0.02), 0 2px 12px 0 rgba(0,0,0,0.04)',
          },
        },
      },
    ],
  })),
);

const Card = React.forwardRef(function Card(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCard',
  });

  const { className, raised = false, hoverable = false, ...other } = props;

  const ownerState = { ...props, raised, hoverable };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardRoot
      className={clsx(classes.root, className)}
      elevation={raised ? 8 : 0}
      variant={raised ? 'elevation' : undefined}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

Card.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
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
   * If `true`, the card will show a hover shadow effect.
   * @default false
   */
  hoverable: PropTypes.bool,
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: chainPropTypes(PropTypes.bool, (props) => {
    if (props.raised && props.variant === 'outlined') {
      return new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.');
    }

    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Card;
