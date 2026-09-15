export default function buildCandlestickSeries(data, colors) {
  const dataset = data.datasets[0] || {};
  const candleData = (data.labels || []).map((_, i) => [
    dataset.open?.[i],
    dataset.close?.[i],
    dataset.low?.[i],
    dataset.high?.[i],
  ]);

  const series = [
    {
      type: 'candlestick',
      data: candleData,
      itemStyle: {
        color: colors[0],
        color0: colors[1],
        borderColor: colors[0],
        borderColor0: colors[1],
      },
      ...(dataset.traceOptions || {}),
    },
  ];

  const optionOverrides = {
    xAxis: { type: 'category', data: data.labels },
    yAxis: { type: 'value', scale: true },
  };

  return { series, optionOverrides };
}
