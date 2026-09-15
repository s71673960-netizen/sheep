export default function buildMapSeries(data, colors) {
  const dataset = data.datasets[0] || {};
  const mapName = dataset.mapType || 'world';
  const labels = data.labels || [];
  const values = dataset.values || [];

  const mapData = labels.map((label, i) => ({
    name: label,
    value: values[i] || 0,
  }));

  const allValues = values.filter((v) => v != null);
  const min = allValues.length ? Math.min(...allValues) : 0;
  const max = allValues.length ? Math.max(...allValues) : 100;

  const series = [
    {
      type: 'map',
      map: mapName,
      data: mapData,
      roam: true,
      emphasis: { label: { show: true } },
      ...(dataset.traceOptions || {}),
    },
  ];

  const optionOverrides = {
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
