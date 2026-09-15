export default function buildGaugeSeries(data, colors) {
  const dataset = data.datasets[0] || {};
  const value = dataset.values?.[0] || 0;
  const max = dataset.max || 100;

  const series = [
    {
      type: 'gauge',
      min: 0,
      max,
      detail: { formatter: '{value}', fontSize: 20 },
      data: [{ value, name: dataset.name || '' }],
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.5, colors[2] || '#E5E5E5'],
            [0.75, colors[1] || '#FFF9F1'],
            [1, colors[0]],
          ],
        },
      },
      pointer: { itemStyle: { color: colors[0] } },
      title: { show: true, offsetCenter: [0, '70%'] },
      ...(dataset.traceOptions || {}),
    },
  ];

  return { series, optionOverrides: {} };
}
