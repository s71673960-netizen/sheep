'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getStatisticUtilityClass } from './statisticClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    title: ['title'],
    content: ['content'],
    prefix: ['prefix'],
    value: ['value'],
    suffix: ['suffix'],
  };

  return composeClasses(slots, getStatisticUtilityClass, classes);
};

const TimerRoot = styled('div', {
  name: 'MuiStatistic',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 8px',
    gap: 4,
    flex: 1,
    background: (theme.vars || theme).palette.background.soft,
    borderRadius: 12,
  })),
);

const TimerTitle = styled('div', {
  name: 'MuiStatistic',
  slot: 'Title',
  overridesResolver: (props, styles) => styles.title,
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.tertiary,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '160%',
    letterSpacing: '-0.005em',
  })),
);

const TimerContent = styled('div', {
  name: 'MuiStatistic',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content,
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.primary,
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
    lineHeight: '115%',
    letterSpacing: '0.01em',
    display: 'flex',
    alignItems: 'center',
    fontVariantNumeric: 'tabular-nums',
  })),
);

const TimerPrefix = styled('span', {
  name: 'MuiStatistic',
  slot: 'Prefix',
  overridesResolver: (props, styles) => styles.prefix,
})({
  marginInlineEnd: 4,
  display: 'inline-flex',
  alignItems: 'center',
});

const TimerValue = styled('span', {
  name: 'MuiStatistic',
  slot: 'Value',
  overridesResolver: (props, styles) => styles.value,
})({
  display: 'inline-block',
});

const TimerSuffix = styled('span', {
  name: 'MuiStatistic',
  slot: 'Suffix',
  overridesResolver: (props, styles) => styles.suffix,
})({
  marginInlineStart: 4,
  display: 'inline-flex',
  alignItems: 'center',
});

function padZero(num, len = 2) {
  return String(num).padStart(len, '0');
}

function formatDiff(diff, format) {
  const absDiff = Math.abs(diff);
  const totalSeconds = Math.floor(absDiff / 1000);
  const milliseconds = absDiff % 1000;
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  let result = format;
  result = result.replace(/SSS/g, padZero(milliseconds, 3));
  result = result.replace(/ss/g, padZero(seconds));
  result = result.replace(/s/g, String(seconds));
  result = result.replace(/mm/g, padZero(minutes));
  result = result.replace(/m/g, String(minutes));
  result = result.replace(/HH/g, padZero(hours));
  result = result.replace(/H/g, String(hours));
  result = result.replace(/D/g, String(days));

  return result;
}

const StatisticTimer = React.forwardRef(function StatisticTimer(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiStatisticTimer' });

  const {
    className,
    type,
    title,
    value,
    format = 'HH:mm:ss',
    prefix,
    suffix,
    onFinish,
    onChange,
    sx,
    ...other
  } = props;

  const [now, setNow] = React.useState(() => Date.now());
  const intervalRef = React.useRef(null);
  const finishedRef = React.useRef(false);

  const hasMilliseconds = format.includes('SSS');
  const intervalMs = hasMilliseconds ? 33 : 1000;

  React.useEffect(() => {
    finishedRef.current = false;
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalMs, value]);

  const diff = type === 'countdown' ? value - now : now - value;

  React.useEffect(() => {
    if (onChange) {
      onChange(diff);
    }
  });

  React.useEffect(() => {
    if (type === 'countdown' && diff <= 0 && !finishedRef.current) {
      finishedRef.current = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (onFinish) {
        onFinish();
      }
    }
  }, [diff, type, onFinish]);

  const displayDiff = type === 'countdown' && diff <= 0 ? 0 : diff;
  const formatted = formatDiff(displayDiff, format);

  const ownerState = { ...props };
  const classes = useUtilityClasses(ownerState);

  return (
    <TimerRoot
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      sx={sx}
      {...other}
    >
      <TimerContent className={classes.content} ownerState={ownerState}>
        {prefix != null && (
          <TimerPrefix className={classes.prefix} ownerState={ownerState}>
            {prefix}
          </TimerPrefix>
        )}
        <TimerValue className={classes.value} ownerState={ownerState}>
          {formatted}
        </TimerValue>
        {suffix != null && (
          <TimerSuffix className={classes.suffix} ownerState={ownerState}>
            {suffix}
          </TimerSuffix>
        )}
      </TimerContent>
      {title != null && (
        <TimerTitle className={classes.title} ownerState={ownerState}>
          {title}
        </TimerTitle>
      )}
    </TimerRoot>
  );
});

StatisticTimer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  format: PropTypes.string,
  onChange: PropTypes.func,
  onFinish: PropTypes.func,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.node,
  type: PropTypes.oneOf(['countdown', 'countup']),
  value: PropTypes.number,
};

export default StatisticTimer;
