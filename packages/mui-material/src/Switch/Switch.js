'use client';
// @inheritedComponent IconButton
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import SwitchBase from '../internal/SwitchBase';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, edge, size, color, checked, disabled } = ownerState;

  const slots = {
    root: ['root', edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    switchBase: [
      'switchBase',
      `color${capitalize(color)}`,
      checked && 'checked',
      disabled && 'disabled',
    ],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
      styles[`size${capitalize(ownerState.size)}`],
    ];
  },
})({
  display: 'inline-flex',
  width: 40,
  height: 20,
  overflow: 'hidden',
  padding: 0,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0,
  verticalAlign: 'middle',
  borderRadius: 10,
  '@media print': {
    colorAdjust: 'exact',
  },
  variants: [
    {
      props: { edge: 'start' },
      style: { marginLeft: -4 },
    },
    {
      props: { edge: 'end' },
      style: { marginRight: -4 },
    },
    {
      props: { size: 'small' },
      style: {
        width: 32,
        height: 16,
        borderRadius: 8,
      },
    },
    {
      props: { size: 'large' },
      style: {
        width: 48,
        height: 24,
        borderRadius: 12,
      },
    },
  ],
});

const SwitchSwitchBase = styled(SwitchBase, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.switchBase,
      { [`& .${switchClasses.input}`]: styles.input },
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    padding: 2,
    borderRadius: '50%',
    color: '#fff',
    backgroundColor: 'transparent',
    transition: 'left 0.3s, transform 0.3s',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:focus-visible': {
      outline: 'none',
    },
    [`&.${switchClasses.checked}`]: {
      transform: 'translateX(20px)',
    },
    [`&.${switchClasses.disabled}`]: {
      color: '#fff',
      opacity: 1,
    },
    [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
      opacity: 1,
    },
    [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
      opacity: 0.4,
    },
    [`& .${switchClasses.input}`]: {
      left: '-100%',
      width: '300%',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          padding: 2,
          [`&.${switchClasses.checked}`]: {
            transform: 'translateX(16px)',
          },
        },
      },
      {
        props: { size: 'large' },
        style: {
          padding: 2,
          [`&.${switchClasses.checked}`]: {
            transform: 'translateX(24px)',
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['light']))
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
              backgroundColor: (theme.vars || theme).palette[color].main,
            },
          },
        })),
    ],
  })),
);

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
})(
  memoTheme(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 'inherit',
    zIndex: -1,
    transition: 'opacity 0.3s, background-color 0.3s',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? (theme.vars || theme).palette.divider
        : (theme.vars || theme).palette.grey[400],
    opacity: 1,
  })),
);

const SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
})(
  memoTheme(({ theme }) => ({
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    width: 16,
    height: 16,
    borderRadius: '50%',
    boxShadow: 'none',
    transition: 'width 0.3s',
    variants: [
      {
        props: { size: 'small' },
        style: {
          width: 12,
          height: 12,
        },
      },
      {
        props: { size: 'large' },
        style: {
          width: 20,
          height: 20,
        },
      },
    ],
  })),
);

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSwitch' });
  const {
    className,
    color = 'primary',
    edge = false,
    size = 'medium',
    sx,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    edge,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    className: clsx(classes.root, className),
    elementType: SwitchRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      sx,
    },
  });

  const [ThumbSlot, thumbSlotProps] = useSlot('thumb', {
    className: classes.thumb,
    elementType: SwitchThumb,
    externalForwardedProps,
    ownerState,
  });

  const icon = <ThumbSlot {...thumbSlotProps} />;

  const [TrackSlot, trackSlotProps] = useSlot('track', {
    className: classes.track,
    elementType: SwitchTrack,
    externalForwardedProps,
    ownerState,
  });

  return (
    <RootSlot {...rootSlotProps}>
      <SwitchSwitchBase
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        ref={ref}
        ownerState={ownerState}
        disableRipple
        {...other}
        classes={{
          ...classes,
          root: classes.switchBase,
        }}
        slots={{
          ...(slots.switchBase && { root: slots.switchBase }),
          ...(slots.input && { input: slots.input }),
        }}
        slotProps={{
          ...(slotProps.switchBase && {
            root:
              typeof slotProps.switchBase === 'function'
                ? slotProps.switchBase(ownerState)
                : slotProps.switchBase,
          }),
          input: {
            role: 'switch',
          },
          ...(slotProps.input && {
            input:
              typeof slotProps.input === 'function' ? slotProps.input(ownerState) : slotProps.input,
          }),
        }}
      />
      <TrackSlot {...trackSlotProps} />
    </RootSlot>
  );
});

Switch.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    switchBase: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    switchBase: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Switch;
