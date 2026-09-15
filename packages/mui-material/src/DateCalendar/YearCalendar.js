'use client';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import ButtonBase from '../ButtonBase';
import Scrollbar from '../Scrollbar';
import { dayjs, getYearsRange } from '../pickerInternals/dateUtils';
import { CALENDAR_WIDTH, YEARS_PER_ROW } from '../pickerInternals/constants';

const YearCalendarRoot = styled(Scrollbar, {
  name: 'UiYearCalendar',
  slot: 'Root',
})({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '8px 12px',
  maxWidth: CALENDAR_WIDTH,
  maxHeight: 280,
});

const YearButton = styled(ButtonBase, {
  name: 'UiYearCalendar',
  slot: 'Button',
})(
  memoTheme(({ theme }) => ({
    width: `calc(100% / ${YEARS_PER_ROW} - 16px)`,
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

export default function YearCalendar({ currentMonth, value, onChange, minDate, maxDate }) {
  const selectedYear = value ? dayjs(value).year() : null;
  const containerRef = React.useRef(null);

  const years = React.useMemo(() => {
    const min = minDate ? dayjs(minDate).year() : dayjs().year() - 100;
    const max = maxDate ? dayjs(maxDate).year() : dayjs().year() + 50;
    return getYearsRange(dayjs().year(min), dayjs().year(max));
  }, [minDate, maxDate]);

  React.useEffect(() => {
    if (containerRef.current) {
      const selectedEl = containerRef.current.querySelector('.Ls-selected');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }
  }, []);

  return (
    <YearCalendarRoot ref={containerRef}>
      {years.map((year) => {
        const isSelected = year === selectedYear;
        return (
          <YearButton
            key={year}
            className={isSelected ? 'Ls-selected' : undefined}
            onClick={() => onChange?.(currentMonth.year(year))}
          >
            {year}
          </YearButton>
        );
      })}
    </YearCalendarRoot>
  );
}
