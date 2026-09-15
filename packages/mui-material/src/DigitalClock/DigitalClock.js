'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import Scrollbar from '../Scrollbar';
import { dayjs } from '../pickerInternals/dateUtils';
import { DIGITAL_CLOCK_WIDTH, DIGITAL_CLOCK_HEIGHT, DIGITAL_CLOCK_ITEM_HEIGHT, DEFAULT_TIME_STEP } from '../pickerInternals/constants';

const DigitalClockRoot = styled(Scrollbar, {
  name: 'UiDigitalClock',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    width: DIGITAL_CLOCK_WIDTH,
    maxHeight: DIGITAL_CLOCK_HEIGHT,
    padding: '8px 4px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    fontFamily: theme.typography.fontFamily,
  })),
);

const DigitalClockItem = styled(ButtonBase, {
  name: 'UiDigitalClock',
  slot: 'Item',
})(
  memoTheme(({ theme }) => ({
    width: '100%',
    minHeight: DIGITAL_CLOCK_ITEM_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.pxToRem(14),
    color: (theme.vars || theme).palette.text.primary,
    borderRadius: 8,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
    '&.Ls-selected': {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.action.selectedOpacity,
      ),
      color: (theme.vars || theme).palette.primary.main,
      fontWeight: 500,
      '&:hover': {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`,
        ),
      },
    },
    '&.Ls-disabled': {
      color: (theme.vars || theme).palette.action.disabled,
      pointerEvents: 'none',
    },
  })),
);

function generateTimeOptions(step, minTime, maxTime, format) {
  const options = [];
  const start = dayjs().startOf('day');
  const totalMinutes = 24 * 60;

  for (let minutes = 0; minutes < totalMinutes; minutes += step) {
    const time = start.add(minutes, 'minute');
    if (minTime) {
      const min = dayjs(minTime);
      const minMinutes = min.hour() * 60 + min.minute();
      if (minutes < minMinutes) continue;
    }
    if (maxTime) {
      const max = dayjs(maxTime);
      const maxMinutes = max.hour() * 60 + max.minute();
      if (minutes > maxMinutes) continue;
    }
    options.push(time);
  }
  return options;
}

const DigitalClock = React.forwardRef(function DigitalClock(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDigitalClock' });
  const {
    value = null,
    onChange,
    timeStep = DEFAULT_TIME_STEP,
    minTime,
    maxTime,
    format = 'HH:mm',
    disabled = false,
    sx,
    ...other
  } = props;

  const containerRef = React.useRef(null);
  const combinedRef = React.useCallback(
    (node) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const options = React.useMemo(
    () => generateTimeOptions(timeStep, minTime, maxTime, format),
    [timeStep, minTime, maxTime, format],
  );

  React.useEffect(() => {
    if (containerRef.current && value) {
      const selectedEl = containerRef.current.querySelector('.Ls-selected');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }
  }, [value]);

  const isSelected = React.useCallback(
    (option) => {
      if (!value) return false;
      return dayjs(value).hour() === option.hour() && dayjs(value).minute() === option.minute();
    },
    [value],
  );

  return (
    <DigitalClockRoot ref={combinedRef} sx={sx} {...other}>
      {options.map((option, index) => (
        <DigitalClockItem
          key={index}
          className={isSelected(option) ? 'Ls-selected' : undefined}
          disabled={disabled}
          onClick={() => {
            const base = value ? dayjs(value) : dayjs();
            const newValue = base.hour(option.hour()).minute(option.minute()).second(0);
            onChange?.(newValue);
          }}
        >
          {option.format(format)}
        </DigitalClockItem>
      ))}
    </DigitalClockRoot>
  );
});

DigitalClock.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  timeStep: PropTypes.number,
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default DigitalClock;
