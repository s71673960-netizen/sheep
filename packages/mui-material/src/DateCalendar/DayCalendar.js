'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import Typography from '../Typography';
import PickerDay from './PickerDay';
import { getWeekArray, isSameDay, isSameMonth, isDateDisabled, isDateBetween, dayjs } from '../pickerInternals/dateUtils';
import { CALENDAR_WIDTH, DAY_SIZE, DAY_MARGIN } from '../pickerInternals/constants';
import { defaultLocale } from '../pickerInternals/pickerLocale';

const DayCalendarRoot = styled('div', {
  name: 'UiDayCalendar',
  slot: 'Root',
})({
  padding: '0 8px',
  maxWidth: CALENDAR_WIDTH,
});

const WeekDayRow = styled('div', {
  name: 'UiDayCalendar',
  slot: 'WeekDayRow',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 4,
  })),
);

const WeekDayLabel = styled(Typography, {
  name: 'UiDayCalendar',
  slot: 'WeekDayLabel',
})(
  memoTheme(({ theme }) => ({
    width: DAY_SIZE,
    height: DAY_SIZE,
    margin: `0 ${DAY_MARGIN}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.pxToRem(12),
    color: (theme.vars || theme).palette.primary.main,
    fontWeight: 500,
  })),
);

const WeekRow = styled('div', {
  name: 'UiDayCalendar',
  slot: 'WeekRow',
})({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 2,
});

export default function DayCalendar({
  currentMonth,
  value,
  onChange,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  shouldDisableDate,
  rangeStart,
  rangeEnd,
  locale = defaultLocale,
}) {
  const weeks = React.useMemo(() => getWeekArray(currentMonth), [currentMonth]);
  const today = React.useMemo(() => dayjs(), []);

  return (
    <DayCalendarRoot>
      <WeekDayRow>
        {locale.weekDaysShort.map((day, i) => (
          <WeekDayLabel key={i} variant="caption">
            {day}
          </WeekDayLabel>
        ))}
      </WeekDayRow>
      {weeks.map((week, weekIndex) => (
        <WeekRow key={weekIndex}>
          {week.map((day, dayIndex) => {
            const isSelected = Array.isArray(value)
              ? value.some((v) => v && isSameDay(day, v))
              : value && isSameDay(day, value);
            const isToday = isSameDay(day, today);
            const isOutside = !isSameMonth(day, currentMonth);
            const isDisabled = isDateDisabled(day, {
              minDate,
              maxDate,
              disablePast,
              disableFuture,
              shouldDisableDate,
            });
            const isRangeStart = rangeStart && isSameDay(day, rangeStart);
            const isRangeEnd = rangeEnd && isSameDay(day, rangeEnd);
            const isInRange = rangeStart && rangeEnd && isDateBetween(day, rangeStart, rangeEnd);

            return (
              <PickerDay
                key={dayIndex}
                day={day}
                selected={isSelected}
                today={isToday}
                disabled={isDisabled}
                outsideMonth={isOutside}
                onClick={onChange}
                isRangeStart={isRangeStart}
                isRangeEnd={isRangeEnd}
                isInRange={isInRange}
              />
            );
          })}
        </WeekRow>
      ))}
    </DayCalendarRoot>
  );
}
