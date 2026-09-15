const STACKED_BAR_COLORS = ['#196D44', '#038247', '#35B076', '#85CEAB', '#BEE8D5', '#DFF6EB'];

export default function buildStackedBarSeries(data, colors, themeColors = {}) {
  const stackColors = STACKED_BAR_COLORS;
  const series = data.datasets.map((dataset, i) => ({
    type: 'bar',
    name: dataset.name,
    data: dataset.values,
    stack: 'total',
    itemStyle: {
      color: stackColors[i % stackColors.length],
    },
    barWidth: 24,
    emphasis: { focus: 'series', itemStyle: { opacity: 0.85 } },
    ...(dataset.traceOptions || {}),
  }));

  const optionOverrides = {
    xAxis: { type: 'category', data: data.labels },
    yAxis: {
      type: 'value',
      min: 0,
      axisLine: { show: true, lineStyle: { color: themeColors.divider } },
      axisTick: { show: true, inside: true, length: 4, lineStyle: { color: themeColors.divider } },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: { color: themeColors.hover },
      },
    },
  };

  return { series, optionOverrides };
}
