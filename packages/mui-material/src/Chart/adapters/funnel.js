export default function buildFunnelSeries(data, colors) {
  const dataset = data.datasets[0] || {};
  const funnelData = (data.labels || []).map((label, i) => ({
    name: label,
    value: dataset.values?.[i] || 0,
    itemStyle: { color: colors[i % colors.length] },
  }));

  const series = [
    {
      type: 'funnel',
      data: funnelData,
      label: { show: true, position: 'inside', formatter: '{b}: {c}' },
      emphasis: { focus: 'self' },
      ...(dataset.traceOptions || {}),
    },
  ];

  return { series, optionOverrides: {} };
}
