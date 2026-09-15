'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import IconButton from '../IconButton';
import Typography from '../Typography';
import { addMonths, addYears } from '../pickerInternals/dateUtils';
import { CALENDAR_WIDTH } from '../pickerInternals/constants';
import { defaultLocale } from '../pickerInternals/pickerLocale';

const CalendarHeaderRoot = styled('div', {
  name: 'UiCalendarHeader',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 8px 4px 8px',
    maxWidth: CALENDAR_WIDTH,
  })),
);

const CalendarHeaderLabelContainer = styled('div', {
  name: 'UiCalendarHeader',
  slot: 'LabelContainer',
})({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: 4,
  overflow: 'hidden',
});

const ArrowIcon = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {direction === 'left' ? (
      <polyline points="15 18 9 12 15 6" />
    ) : (
      <polyline points="9 18 15 12 9 6" />
    )}
  </svg>
);

export default function CalendarHeader({
  currentMonth,
  onMonthChange,
  onPrev,
  onNext,
  onViewChange,
  view = 'day',
  minDate,
  maxDate,
  locale = defaultLocale,
}) {
  const handlePrev = () => {
    if (onPrev) {
      onPrev();
      return;
    }
    if (view === 'day') {
      onMonthChange?.(addMonths(currentMonth, -1));
    } else if (view === 'year') {
      onMonthChange?.(addYears(currentMonth, -12));
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
      return;
    }
    if (view === 'day') {
      onMonthChange?.(addMonths(currentMonth, 1));
    } else if (view === 'year') {
      onMonthChange?.(addYears(currentMonth, 12));
    }
  };

  const handleLabelClick = () => {
    if (view === 'day') {
      onViewChange?.('month');
    } else if (view === 'month') {
      onViewChange?.('year');
    } else {
      onViewChange?.('day');
    }
  };

  const showLeft = onPrev !== undefined || onMonthChange !== undefined;
  const showRight = onNext !== undefined || onMonthChange !== undefined;

  const label = React.useMemo(() => {
    const d = currentMonth;
    if (view === 'year') {
      const startYear = d.year() - 4;
      const endYear = d.year() + 7;
      return `${startYear} - ${endYear}`;
    }
    return `${d.year()}${locale.year} ${locale.months[d.month()]}`;
  }, [currentMonth, view, locale]);

  return (
    <CalendarHeaderRoot>
      {showLeft ? (
        <IconButton size="small" onClick={handlePrev} aria-label="previous">
          <ArrowIcon direction="left" />
        </IconButton>
      ) : <span style={{ width: 28 }} />}
      <CalendarHeaderLabelContainer onClick={handleLabelClick}>
        <Typography variant="body2" sx={{ fontWeight: 600, userSelect: 'none' }}>
          {label}
        </Typography>
      </CalendarHeaderLabelContainer>
      {showRight ? (
        <IconButton size="small" onClick={handleNext} aria-label="next">
          <ArrowIcon direction="right" />
        </IconButton>
      ) : <span style={{ width: 28 }} />}
    </CalendarHeaderRoot>
  );
}
