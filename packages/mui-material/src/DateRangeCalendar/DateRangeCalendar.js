'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { dayjs, isSameDay } from '../pickerInternals/dateUtils';
import { CALENDAR_WIDTH } from '../pickerInternals/constants';
import CalendarHeader from '../DateCalendar/CalendarHeader';
import DayCalendar from '../DateCalendar/DayCalendar';
import { addMonths } from '../pickerInternals/dateUtils';
import { defaultLocale } from '../pickerInternals/pickerLocale';

const DateRangeCalendarRoot = styled('div', {
  name: 'UiDateRangeCalendar',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    fontFamily: theme.typography.fontFamily,
  })),
);

const CalendarPanel = styled('div', {
  name: 'UiDateRangeCalendar',
  slot: 'Panel',
})({
  width: CALENDAR_WIDTH,
});

const DateRangeCalendar = React.forwardRef(function DateRangeCalendar(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDateRangeCalendar' });
  const {
    value = [null, null],
    onChange,
    calendars = 2,
    minDate,
    maxDate,
    disablePast = false,
    disableFuture = false,
    shouldDisableDate,
    locale = defaultLocale,
    sx,
    ...other
  } = props;

  const [startValue, endValue] = value;
  const [rangePosition, setRangePosition] = React.useState('start');
  const [hoverDay, setHoverDay] = React.useState(null);

  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const initial = startValue || dayjs();
    return dayjs(initial).startOf('month');
  });

  const handleDaySelect = React.useCallback(
    (day) => {
      if (rangePosition === 'start') {
        onChange?.([day, endValue]);
        setRangePosition('end');
      } else {
        if (startValue && day.isBefore(startValue, 'day')) {
          onChange?.([day, startValue]);
        } else {
          onChange?.([startValue, day]);
        }
        setRangePosition('start');
      }
    },
    [rangePosition, startValue, endValue, onChange],
  );

  const handlePrevMonth = React.useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, -1).startOf('month'));
  }, []);

  const handleNextMonth = React.useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1).startOf('month'));
  }, []);

  const rangeStart = startValue;
  const rangeEnd = rangePosition === 'end' && hoverDay ? hoverDay : endValue;

  return (
    <DateRangeCalendarRoot ref={ref} sx={sx} {...other}>
      {Array.from({ length: calendars }, (_, i) => {
        const month = addMonths(currentMonth, i);
        const isFirst = i === 0;
        const isLast = i === calendars - 1;
        return (
          <CalendarPanel key={i}>
            <CalendarHeader
              currentMonth={month}
              onPrev={isFirst ? handlePrevMonth : undefined}
              onNext={isLast ? handleNextMonth : undefined}
              view="day"
              minDate={minDate}
              maxDate={maxDate}
              locale={locale}
            />
            <DayCalendar
              currentMonth={month}
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
          </CalendarPanel>
        );
      })}
    </DateRangeCalendarRoot>
  );
});

DateRangeCalendar.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  calendars: PropTypes.oneOf([1, 2, 3]),
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  locale: PropTypes.object,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default DateRangeCalendar;
