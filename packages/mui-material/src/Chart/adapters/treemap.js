export default function buildTreemapSeries(data, colors) {
  const dataset = data.datasets[0] || {};
  const labels = data.labels || [];
  const parents = dataset.parents || [];
  const values = dataset.values || [];

  const nodeMap = new Map();
  labels.forEach((label, i) => {
    nodeMap.set(label, {
      name: label,
      value: values[i] || 0,
      children: [],
      itemStyle: { color: colors[i % colors.length] },
    });
  });

  const roots = [];
  labels.forEach((label, i) => {
    const parent = parents[i];
    const node = nodeMap.get(label);
    if (parent && nodeMap.has(parent)) {
      nodeMap.get(parent).children.push(node);
    } else {
      roots.push(node);
    }
  });

  const series = [
    {
      type: 'treemap',
      data: roots,
      label: { show: true, formatter: '{b}' },
      breadcrumb: { show: false },
      ...(dataset.traceOptions || {}),
    },
  ];

  return { series, optionOverrides: {} };
}
