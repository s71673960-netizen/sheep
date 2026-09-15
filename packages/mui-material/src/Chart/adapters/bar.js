export default function buildBarSeries(data, colors, themeColors = {}) {
  const series = data.datasets.map((dataset, i) => ({
    type: 'bar',
    name: dataset.name,
    data: dataset.values,
    itemStyle: {
      color: colors[i % colors.length],
      borderRadius: [4, 4, 0, 0],
    },
    barWidth: 24,
    barGap: '50%',
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
