'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Skeleton from '../Skeleton';
import { getStatisticUtilityClass } from './statisticClasses';
import StatisticTimer from './StatisticTimer';

const useUtilityClasses = (ownerState) => {
  const { classes, loading, variant } = ownerState;

  const slots = {
    root: ['root', loading && 'loading', variant && `variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    header: ['header'],
    title: ['title'],
    subtitle: ['subtitle'],
    content: ['content'],
    prefix: ['prefix'],
    value: ['value'],
    suffix: ['suffix'],
    trend: ['trend'],
  };

  return composeClasses(slots, getStatisticUtilityClass, classes);
};

const StatisticRoot = styled('div', {
  name: 'MuiStatistic',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      ownerState.loading && styles.loading,
      ownerState.variant === 'outlined' && styles.variantOutlined,
      ownerState.variant === 'filled' && styles.variantFilled,
    ];
  },
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
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          padding: 16,
          gap: 16,
          height: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          background: (theme.vars || theme).palette.background.paper,
          border: 'none',
          borderRadius: 16,
        },
      },
    ],
  })),
);

const StatisticTitle = styled('div', {
  name: 'MuiStatistic',
  slot: 'Title',
  overridesResolver: (props, styles) => styles.title,
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.tertiary,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '160%',
    letterSpacing: '-0.005em',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          color: (theme.vars || theme).palette.text.primary,
          fontSize: theme.typography.pxToRem(13),
          lineHeight: '115%',
          letterSpacing: '0.005em',
        },
      },
    ],
  })),
);

const StatisticSubtitle = styled('div', {
  name: 'MuiStatistic',
  slot: 'Subtitle',
  overridesResolver: (props, styles) => styles.subtitle,
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.tertiary,
    fontSize: theme.typography.pxToRem(10),
    lineHeight: '115%',
    letterSpacing: '0.08em',
    marginTop: 8,
  })),
);

const StatisticContent = styled('div', {
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
    alignItems: 'baseline',
    variants: [
      {
        props: { variant: 'outlined' },
        style: {
          fontSize: theme.typography.pxToRem(20),
          letterSpacing: '0.005em',
        },
      },
    ],
  })),
);

const StatisticTrend = styled('span', {
  name: 'MuiStatistic',
  slot: 'Trend',
  overridesResolver: (props, styles) => styles.trend,
})(
  memoTheme(({ theme }) => ({
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '115%',
    letterSpacing: '0.005em',
    fontWeight: 400,
    color: (theme.vars || theme).palette.success.main || '#038247',
    marginLeft: 8,
  })),
);

const StatisticPrefix = styled('span', {
  name: 'MuiStatistic',
  slot: 'Prefix',
  overridesResolver: (props, styles) => styles.prefix,
})({
  marginInlineEnd: 4,
  display: 'inline-flex',
  alignItems: 'center',
});

const StatisticValue = styled('span', {
  name: 'MuiStatistic',
  slot: 'Value',
  overridesResolver: (props, styles) => styles.value,
})({
  display: 'inline-block',
});

const StatisticSuffix = styled('span', {
  name: 'MuiStatistic',
  slot: 'Suffix',
  overridesResolver: (props, styles) => styles.suffix,
})({
  marginInlineStart: 4,
  display: 'inline-flex',
  alignItems: 'center',
});

function formatValue(value, { precision, groupSeparator, decimalSeparator }) {
  if (value === undefined || value === null) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  let str;
  if (precision !== undefined) {
    str = value.toFixed(precision);
  } else {
    str = String(value);
  }

  const [intPart, decPart] = str.split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

  if (decPart !== undefined) {
    return `${grouped}${decimalSeparator}${decPart}`;
  }
  return grouped;
}

const Statistic = React.forwardRef(function Statistic(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiStatistic' });

  const {
    className,
    component = 'div',
    title,
    subtitle,
    value,
    precision,
    prefix,
    suffix,
    trend,
    icon,
    align,
    variant = 'filled',
    groupSeparator = ',',
    decimalSeparator = '.',
    formatter,
    loading = false,
    sx,
    ...other
  } = props;

  const ownerState = { ...props, loading, variant, align };
  const classes = useUtilityClasses(ownerState);

  const formattedValue = formatter
    ? formatter(value)
    : formatValue(value, { precision, groupSeparator, decimalSeparator });

  const valueContent = (
    <StatisticContent className={classes.content} ownerState={ownerState}>
      {loading ? (
        <Skeleton variant="text" width="3em" />
      ) : (
        <React.Fragment>
          {prefix != null && (
            <StatisticPrefix className={classes.prefix} ownerState={ownerState}>
              {prefix}
            </StatisticPrefix>
          )}
          <StatisticValue className={classes.value} ownerState={ownerState}>
            {formattedValue}
          </StatisticValue>
          {suffix != null && (
            <StatisticSuffix className={classes.suffix} ownerState={ownerState}>
              {suffix}
            </StatisticSuffix>
          )}
          {trend != null && (
            <StatisticTrend className={classes.trend} ownerState={ownerState}>
              {trend}
            </StatisticTrend>
          )}
        </React.Fragment>
      )}
    </StatisticContent>
  );

  const titleContent = title != null ? (
    <StatisticTitle className={classes.title} ownerState={ownerState}>
      {title}
      {icon}
    </StatisticTitle>
  ) : null;

  const subtitleContent = subtitle != null ? (
    <StatisticSubtitle className={classes.subtitle} ownerState={ownerState}>
      {subtitle}
    </StatisticSubtitle>
  ) : null;

  if (variant === 'outlined') {
    return (
      <StatisticRoot
        as={component}
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        sx={sx}
        {...other}
      >
        <div style={align === 'center' ? { alignSelf: 'center' } : undefined}>
          {titleContent}
          {subtitleContent}
        </div>
        {valueContent}
      </StatisticRoot>
    );
  }

  return (
    <StatisticRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      sx={sx}
      {...other}
    >
      {valueContent}
      {titleContent}
    </StatisticRoot>
  );
});

Statistic.propTypes = {
  align: PropTypes.oneOf(['center', 'start']),
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
  component: PropTypes.elementType,
  decimalSeparator: PropTypes.string,
  formatter: PropTypes.func,
  groupSeparator: PropTypes.string,
  icon: PropTypes.node,
  loading: PropTypes.bool,
  precision: PropTypes.number,
  prefix: PropTypes.node,
  subtitle: PropTypes.node,
  suffix: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.node,
  trend: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.oneOf(['filled', 'outlined']),
};

Statistic.Timer = StatisticTimer;

export default Statistic;
