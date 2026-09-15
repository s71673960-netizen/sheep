'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { dayjs } from '../pickerInternals/dateUtils';
import { CALENDAR_WIDTH } from '../pickerInternals/constants';
import { defaultLocale } from '../pickerInternals/pickerLocale';
import CalendarHeader from './CalendarHeader';
import DayCalendar from './DayCalendar';
import MonthCalendar from './MonthCalendar';
import YearCalendar from './YearCalendar';

const DateCalendarRoot = styled('div', {
  name: 'UiDateCalendar',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    width: CALENDAR_WIDTH,
    overflow: 'hidden',
    fontFamily: theme.typography.fontFamily,
  })),
);

const DateCalendar = React.forwardRef(function DateCalendar(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDateCalendar' });
  const {
    value = null,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    disablePast = false,
    disableFuture = false,
    shouldDisableDate,
    views = ['year', 'month', 'day'],
    openTo = 'day',
    locale = defaultLocale,
    sx,
    rangeStart,
    rangeEnd,
    ...other
  } = props;

  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const initial = value || defaultValue || dayjs();
    return dayjs(initial).startOf('month');
  });

  const [view, setView] = React.useState(openTo);

  React.useEffect(() => {
    if (value) {
      setCurrentMonth(dayjs(value).startOf('month'));
    }
  }, [value]);

  const handleDaySelect = React.useCallback(
    (day) => {
      onChange?.(day);
    },
    [onChange],
  );

  const handleMonthSelect = React.useCallback(
    (month) => {
      setCurrentMonth(month.startOf('month'));
      if (views.includes('day')) {
        setView('day');
      } else {
        onChange?.(month);
      }
    },
    [views, onChange],
  );

  const handleYearSelect = React.useCallback(
    (date) => {
      setCurrentMonth(date.startOf('month'));
      if (views.includes('month')) {
        setView('month');
      } else if (views.includes('day')) {
        setView('day');
      } else {
        onChange?.(date);
      }
    },
    [views, onChange],
  );

  const handleMonthChange = React.useCallback((newMonth) => {
    setCurrentMonth(newMonth.startOf('month'));
  }, []);

  const handleViewChange = React.useCallback((newView) => {
    setView(newView);
  }, []);

  return (
    <DateCalendarRoot ref={ref} sx={sx} {...other}>
      <CalendarHeader
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
        onViewChange={handleViewChange}
        view={view}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
      />
      {view === 'day' && (
        <DayCalendar
          currentMonth={currentMonth}
          value={value}
          onChange={handleDaySelect}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          shouldDisableDate={shouldDisableDate}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          locale={locale}
        />
      )}
      {view === 'month' && (
        <MonthCalendar
          currentMonth={currentMonth}
          value={value}
          onChange={handleMonthSelect}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
        />
      )}
      {view === 'year' && (
        <YearCalendar
          currentMonth={currentMonth}
          value={value}
          onChange={handleYearSelect}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </DateCalendarRoot>
  );
});

DateCalendar.propTypes = {
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  views: PropTypes.arrayOf(PropTypes.oneOf(['year', 'month', 'day'])),
  openTo: PropTypes.oneOf(['year', 'month', 'day']),
  locale: PropTypes.object,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  rangeStart: PropTypes.object,
  rangeEnd: PropTypes.object,
};

export default DateCalendar;
