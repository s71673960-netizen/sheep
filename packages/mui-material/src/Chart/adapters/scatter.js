export default function buildScatterSeries(data, colors) {
  const series = data.datasets.map((dataset, i) => ({
    type: 'scatter',
    name: dataset.name,
    data: Array.isArray(dataset.values[0])
      ? dataset.values
      : (dataset.x || data.labels || []).map((x, j) => [x, dataset.values[j]]),
    symbolSize: dataset.markerSize || 8,
    itemStyle: { color: colors[i % colors.length], opacity: 0.8 },
    emphasis: { scale: 1.5 },
    ...(dataset.traceOptions || {}),
  }));

  const optionOverrides = {
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
  };

  return { series, optionOverrides };
}
