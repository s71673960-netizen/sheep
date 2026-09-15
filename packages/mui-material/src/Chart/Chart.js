'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '../zero-styled';
import { useTheme } from '../styles';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import composeClasses from '@mui/utils/composeClasses';
import { getChartUtilityClass } from './chartClasses';
import { COLOR_SCHEMES, DEFAULT_COLOR_SCHEME } from './constants';
import { mergeDeep, getColors } from './helpers';
import useChartTheme from './useChartTheme';
import adapters from './adapters';
import ChartCore from './ChartCore';
import ChartLegend from './ChartLegend';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;
  const slots = { root: ['root'] };
  return composeClasses(slots, getChartUtilityClass, classes);
};

const ChartRoot = styled('div', {
  name: 'MuiChart',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    width: '100%',
    position: 'relative',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    color: (theme.vars || theme).palette.text.primary,
    borderRadius: 12,
    padding: 16,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  })),
);

const ChartStatus = styled('div', {
  name: 'MuiChart',
  slot: 'Status',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: (theme.vars || theme).palette.text.secondary,
  })),
);

const ChartTitle = styled('div', {
  name: 'MuiChart',
  slot: 'Title',
})(
  memoTheme(({ theme }) => ({
    fontSize: 16,
    fontWeight: 600,
    color: (theme.vars || theme).palette.text.primary,
    letterSpacing: 0.48,
    lineHeight: '24px',
  })),
);

const SELF_LABELED_TYPES = ['pie', 'donut', 'gauge', 'funnel', 'treemap', 'sankey'];
const NO_AXIS_TYPES = ['pie', 'donut', 'gauge', 'funnel', 'treemap', 'sankey'];

const Chart = React.forwardRef(function Chart(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiChart' });
  const {
    type,
    data,
    colorScheme = DEFAULT_COLOR_SCHEME,
    height = 400,
    width = '100%',
    title,
    option: userOption,
    onEvent,
    loading = false,
    legend = true,
    animation = true,
    className,
    sx,
    ...other
  } = props;

  const ownerState = { ...props };
  const classes = useUtilityClasses(ownerState);
  const theme = useTheme();
  const themeOption = useChartTheme();
  const [hiddenIndices, setHiddenIndices] = React.useState(new Set());
  const chartRef = React.useRef(null);

  const resolvedSeries = React.useMemo(() => {
    if (!type || !data) return { series: [], optionOverrides: {} };
    const adapter = adapters[type];
    if (!adapter) return { series: [], optionOverrides: {} };
    const colors = getColors(colorScheme, COLOR_SCHEMES);
    return adapter(data, colors, {
      textPrimary: theme.palette.text.primary,
      textSecondary: theme.palette.text.secondary,
      divider: theme.palette.divider,
      hover: theme.palette.action.hover,
    });
  }, [type, data, colorScheme, theme]);

  const shouldShowLegend = React.useMemo(() => {
    if (!legend) return false;
    if (SELF_LABELED_TYPES.includes(type)) return false;
    return true;
  }, [legend, type]);

  const visibleSeries = React.useMemo(() => {
    if (hiddenIndices.size === 0) return resolvedSeries.series;
    return resolvedSeries.series.map((s, i) => {
      if (s.name === 'base') return s;
      return hiddenIndices.has(i) ? { ...s, show: false, data: [] } : s;
    });
  }, [resolvedSeries.series, hiddenIndices]);

  const finalOption = React.useMemo(() => {
    const base = mergeDeep(
      {},
      themeOption,
      resolvedSeries.optionOverrides,
      { series: visibleSeries },
      { animation },
    );

    if (NO_AXIS_TYPES.includes(type)) {
      base.xAxis = { show: false, axisLine: { show: false }, splitLine: { show: false } };
      base.yAxis = { show: false, axisLine: { show: false }, splitLine: { show: false } };
      delete base.grid;
    }

    if (!animation) {
      base.animationDuration = 0;
    }

    if (userOption) {
      const { series: userSeries, ...restUserOption } = userOption;
      mergeDeep(base, restUserOption);
      if (Array.isArray(userSeries) && Array.isArray(base.series)) {
        base.series = base.series.map((s, i) => {
          if (userSeries[i]) {
            return { ...s, ...userSeries[i] };
          }
          return s;
        });
      }
      return base;
    }
    return base;
  }, [themeOption, resolvedSeries.optionOverrides, visibleSeries, animation, userOption, type]);

  const handleToggleLegend = React.useCallback((index) => {
    setHiddenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (loading) {
    return (
      <ChartRoot
        ref={ref}
        className={clsx(classes.root, className)}
        sx={sx}
        style={containerStyle}
        {...other}
      >
        <ChartStatus>Loading...</ChartStatus>
      </ChartRoot>
    );
  }

  return (
    <ChartRoot
      ref={ref}
      className={clsx(classes.root, className)}
      sx={sx}
      {...other}
    >
      {title && (
        <ChartTitle>{title}</ChartTitle>
      )}
      <ChartCore
        ref={chartRef}
        option={finalOption}
        onEvent={onEvent}
        loading={false}
        style={containerStyle}
      />
      {shouldShowLegend && (
        <ChartLegend
          series={resolvedSeries.series}
          hiddenIndices={hiddenIndices}
          onToggle={handleToggleLegend}
          chartType={type}
        />
      )}
    </ChartRoot>
  );
});

Chart.propTypes = {
  animation: PropTypes.bool,
  className: PropTypes.string,
  colorScheme: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  data: PropTypes.shape({
    datasets: PropTypes.arrayOf(PropTypes.object),
    labels: PropTypes.arrayOf(PropTypes.string),
  }),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  legend: PropTypes.bool,
  loading: PropTypes.bool,
  onEvent: PropTypes.func,
  option: PropTypes.object,
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.func, PropTypes.object]),
  type: PropTypes.oneOf([
    'area',
    'bar',
    'candlestick',
    'donut',
    'funnel',
    'gauge',
    'heatmap',
    'line',
    'map',
    'pie',
    'radar',
    'sankey',
    'scatter',
    'stackedBar',
    'treemap',
    'waterfall',
  ]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Chart;
