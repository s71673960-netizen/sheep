const LINE_COLORS = ['#038247', '#2FB8C8', '#B6AAF3', '#F7C085'];

export default function buildLineSeries(data, colors, themeColors = {}) {
  const lineColors = LINE_COLORS;
  const series = data.datasets.map((dataset, i) => ({
    type: 'line',
    name: dataset.name,
    data: dataset.values,
    smooth: false,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: { width: 2 },
    itemStyle: { color: lineColors[i % lineColors.length], borderWidth: 0 },
    emphasis: { scale: true, focus: 'series' },
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
  };

  return { series, optionOverrides };
}
