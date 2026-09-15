export default function buildAreaSeries(data, colors) {
  const series = data.datasets.map((dataset, i) => ({
    type: 'line',
    name: dataset.name,
    data: dataset.values,
    smooth: false,
    symbol: 'none',
    lineStyle: { width: 2 },
    itemStyle: { color: colors[i % colors.length] },
    areaStyle: { opacity: 0.2 },
    emphasis: { focus: 'series' },
    ...(dataset.traceOptions || {}),
  }));

  const optionOverrides = {
    xAxis: { type: 'category', data: data.labels },
    yAxis: { type: 'value' },
  };

  return { series, optionOverrides };
}
