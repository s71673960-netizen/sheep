'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import ButtonBase from '../ButtonBase';
import { dayjs, isSameMonth } from '../pickerInternals/dateUtils';
import { CALENDAR_WIDTH, MONTHS_PER_ROW } from '../pickerInternals/constants';
import { defaultLocale } from '../pickerInternals/pickerLocale';

const MonthCalendarRoot = styled('div', {
  name: 'UiMonthCalendar',
  slot: 'Root',
})({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '8px 12px',
  maxWidth: CALENDAR_WIDTH,
});

const MonthButton = styled(ButtonBase, {
  name: 'UiMonthCalendar',
  slot: 'Button',
})(
  memoTheme(({ theme }) => ({
    width: `calc(100% / ${MONTHS_PER_ROW} - 16px)`,
    height: 40,
    margin: 8,
    borderRadius: 20,
    fontSize: theme.typography.pxToRem(13),
    color: (theme.vars || theme).palette.text.primary,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
    '&.Ls-selected': {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
    },
    '&.Ls-disabled': {
      color: (theme.vars || theme).palette.action.disabled,
      pointerEvents: 'none',
    },
  })),
);

export default function MonthCalendar({ currentMonth, value, onChange, minDate, maxDate, locale = defaultLocale }) {
  const months = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => currentMonth.month(i));
  }, [currentMonth]);

  return (
    <MonthCalendarRoot>
      {months.map((month, i) => {
        const isSelected = value && isSameMonth(month, value);
        const isDisabled =
          (minDate && month.endOf('month').isBefore(dayjs(minDate), 'day')) ||
          (maxDate && month.startOf('month').isAfter(dayjs(maxDate), 'day'));

        return (
          <MonthButton
            key={i}
            className={[isSelected && 'Ls-selected', isDisabled && 'Ls-disabled'].filter(Boolean).join(' ')}
            disabled={isDisabled}
            onClick={() => onChange?.(month)}
          >
            {locale.months[i]}
          </MonthButton>
        );
      })}
    </MonthCalendarRoot>
  );
}
