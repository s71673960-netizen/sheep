export default function buildRadarSeries(data, colors) {
  const indicator = (data.labels || []).map((label) => ({ name: label }));

  const seriesData = data.datasets.map((dataset, i) => ({
    name: dataset.name,
    value: dataset.values,
    areaStyle: { opacity: 0.2 },
    lineStyle: { color: colors[i % colors.length] },
    itemStyle: { color: colors[i % colors.length] },
    ...(dataset.traceOptions || {}),
  }));

  const series = [
    {
      type: 'radar',
      data: seriesData,
      emphasis: { focus: 'self' },
    },
  ];

  const optionOverrides = {
    radar: { indicator },
  };

  return { series, optionOverrides };
}
