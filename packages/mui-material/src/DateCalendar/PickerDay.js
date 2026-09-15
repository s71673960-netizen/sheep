'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import ButtonBase from '../ButtonBase';
import { isSameDay, isDateDisabled, dayjs } from '../pickerInternals/dateUtils';
import { DAY_SIZE, DAY_MARGIN } from '../pickerInternals/constants';

const PickerDayRoot = styled(ButtonBase, {
  name: 'UiPickerDay',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    width: DAY_SIZE,
    height: DAY_SIZE,
    borderRadius: '50%',
    padding: 0,
    margin: `0 ${DAY_MARGIN}px`,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: 400,
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
    '&.Ls-selected': {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
      fontWeight: 500,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    },
    '&.Ls-today:not(.Ls-selected)': {
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      color: (theme.vars || theme).palette.text.primary,
    },
    '&.Ls-disabled': {
      color: (theme.vars || theme).palette.action.disabled,
      pointerEvents: 'none',
    },
    '&.Ls-outside': {
      color: (theme.vars || theme).palette.text.disabled,
    },
    '&.Ls-rangeStart': {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderRadius: '50%',
      position: 'relative',
      zIndex: 1,
    },
    '&.Ls-rangeEnd': {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderRadius: '50%',
      position: 'relative',
      zIndex: 1,
    },
    '&.Ls-inRange': {
      backgroundColor: (theme.vars || theme).palette.action.selected,
      borderRadius: 0,
    },
  })),
);

export default function PickerDay({
  day,
  selected,
  today,
  disabled,
  outsideMonth,
  onClick,
  isRangeStart,
  isRangeEnd,
  isInRange,
  ...other
}) {
  const classNames = [
    selected && 'Ls-selected',
    today && 'Ls-today',
    disabled && 'Ls-disabled',
    outsideMonth && 'Ls-outside',
    isRangeStart && 'Ls-rangeStart',
    isRangeEnd && 'Ls-rangeEnd',
    isInRange && !isRangeStart && !isRangeEnd && 'Ls-inRange',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <PickerDayRoot
      className={classNames}
      disabled={disabled}
      onClick={() => !disabled && onClick?.(day)}
      {...other}
    >
      {day.date()}
    </PickerDayRoot>
  );
}
