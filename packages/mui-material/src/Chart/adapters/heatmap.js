export default function buildHeatmapSeries(data, colors) {
  const yLabels = data.datasets.map((d) => d.name);
  const heatmapData = [];
  data.datasets.forEach((dataset, yi) => {
    (dataset.values || []).forEach((val, xi) => {
      heatmapData.push([xi, yi, val]);
    });
  });

  const allValues = data.datasets.flatMap((d) => d.values || []);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);

  const series = [
    {
      type: 'heatmap',
      data: heatmapData,
      label: { show: false },
      emphasis: { itemStyle: { shadowBlur: 10 } },
      ...(data.datasets[0]?.traceOptions || {}),
    },
  ];

  const optionOverrides = {
    xAxis: { type: 'category', data: data.labels },
    yAxis: { type: 'category', data: yLabels },
    visualMap: {
      min,
      max,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: [colors[0], colors[Math.min(colors.length - 1, 4)]] },
    },
    grid: { bottom: 60 },
  };

  return { series, optionOverrides };
}
