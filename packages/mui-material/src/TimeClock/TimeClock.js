'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { dayjs } from '../pickerInternals/dateUtils';
import { CLOCK_SIZE } from '../pickerInternals/constants';

const TimeClockRoot = styled('div', {
  name: 'UiTimeClock',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    fontFamily: theme.typography.fontFamily,
  })),
);

const ClockFace = styled('div', {
  name: 'UiTimeClock',
  slot: 'Face',
})(
  memoTheme(({ theme }) => ({
    width: CLOCK_SIZE,
    height: CLOCK_SIZE,
    borderRadius: '50%',
    backgroundColor: (theme.vars || theme).palette.action.hover,
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
  })),
);

const ClockPointer = styled('div', {
  name: 'UiTimeClock',
  slot: 'Pointer',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 2,
    height: '40%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    transformOrigin: 'bottom center',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: (theme.vars || theme).palette.background.paper,
    },
  })),
);

const ClockCenter = styled('div', {
  name: 'UiTimeClock',
  slot: 'Center',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
  })),
);

const ClockNumber = styled('span', {
  name: 'UiTimeClock',
  slot: 'Number',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    fontSize: theme.typography.pxToRem(13),
    color: (theme.vars || theme).palette.text.primary,
    userSelect: 'none',
    '&.Ls-selected': {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
  })),
);

const ViewSwitcher = styled('div', {
  name: 'UiTimeClock',
  slot: 'ViewSwitcher',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    gap: 4,
    marginBottom: 12,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 500,
    cursor: 'pointer',
    '& span': {
      padding: '2px 4px',
      borderRadius: 4,
    },
    '& span.Ls-active': {
      backgroundColor: (theme.vars || theme).palette.background.paper,
      color: (theme.vars || theme).palette.text.primary,
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
  })),
);

function getAngle(value, isHours) {
  if (isHours) {
    return ((value % 12) / 12) * 360 - 180;
  }
  return (value / 60) * 360 - 180;
}

function getNumberPosition(index, total, radius) {
  const angle = ((index / total) * 360 - 90) * (Math.PI / 180);
  const x = radius + radius * 0.78 * Math.cos(angle) - 16;
  const y = radius + radius * 0.78 * Math.sin(angle) - 16;
  return { left: x, top: y };
}

function getValueFromPosition(x, y, isHours) {
  const angle = Math.atan2(x, -y) * (180 / Math.PI) + 180;
  if (isHours) {
    return Math.round(angle / 30) % 12 || 12;
  }
  return Math.round(angle / 6) % 60;
}

const TimeClock = React.forwardRef(function TimeClock(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiTimeClock' });
  const {
    value = null,
    onChange,
    ampm = false,
    views = ['hours', 'minutes'],
    disabled = false,
    sx,
    ...other
  } = props;

  const [activeView, setActiveView] = React.useState(views[0]);
  const clockRef = React.useRef(null);

  const currentValue = value ? dayjs(value) : dayjs();
  const hours = currentValue.hour();
  const minutes = currentValue.minute();
  const displayHours = ampm ? (hours % 12 || 12) : hours;

  const isHoursView = activeView === 'hours';

  const handleClockClick = React.useCallback(
    (event) => {
      if (disabled) return;
      const rect = clockRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = event.clientX - rect.left - centerX;
      const y = event.clientY - rect.top - centerY;

      if (isHoursView) {
        let newHour = getValueFromPosition(x, y, true);
        if (!ampm) {
          const dist = Math.sqrt(x * x + y * y);
          if (dist < rect.width * 0.25) {
            newHour = newHour === 12 ? 0 : newHour + 12;
          }
        } else if (hours >= 12 && newHour !== 12) {
          newHour += 12;
        } else if (hours < 12 && newHour === 12) {
          newHour = 0;
        }
        const base = value ? dayjs(value) : dayjs();
        const newValue = base.hour(newHour);
        onChange?.(newValue);
        if (views.includes('minutes')) {
          setActiveView('minutes');
        }
      } else {
        const newMinute = getValueFromPosition(x, y, false);
        const base = value ? dayjs(value) : dayjs();
        const newValue = base.minute(newMinute);
        onChange?.(newValue);
      }
    },
    [disabled, isHoursView, ampm, hours, value, onChange, views],
  );

  const pointerAngle = isHoursView ? getAngle(displayHours, true) : getAngle(minutes, false);
  const radius = CLOCK_SIZE / 2;

  const numbers = isHoursView
    ? (ampm ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <TimeClockRoot ref={ref} sx={sx} {...other}>
      <ViewSwitcher>
        <span
          className={isHoursView ? 'Ls-active' : undefined}
          onClick={() => setActiveView('hours')}
        >
          {String(displayHours).padStart(2, '0')}
        </span>
        <span>:</span>
        <span
          className={!isHoursView ? 'Ls-active' : undefined}
          onClick={() => setActiveView('minutes')}
        >
          {String(minutes).padStart(2, '0')}
        </span>
      </ViewSwitcher>
      <ClockFace ref={clockRef} onClick={handleClockClick}>
        <ClockCenter />
        <ClockPointer style={{ transform: `translateX(-50%) rotate(${pointerAngle}deg)` }} />
        {numbers.map((num, i) => {
          const pos = getNumberPosition(i, 12, radius);
          const isSelected = isHoursView
            ? (ampm ? num === displayHours : num === (hours % 12 || 12))
            : num === minutes;
          return (
            <ClockNumber
              key={i}
              className={isSelected ? 'Ls-selected' : undefined}
              style={{ left: pos.left, top: pos.top }}
            >
              {isHoursView ? num : String(num).padStart(2, '0')}
            </ClockNumber>
          );
        })}
      </ClockFace>
    </TimeClockRoot>
  );
});

TimeClock.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  ampm: PropTypes.bool,
  views: PropTypes.arrayOf(PropTypes.oneOf(['hours', 'minutes'])),
  disabled: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TimeClock;
