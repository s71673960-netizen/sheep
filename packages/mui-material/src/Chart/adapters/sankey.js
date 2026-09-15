export default function buildSankeySeries(data, colors) {
  const dataset = data.datasets[0] || {};
  const labels = data.labels || [];

  const nodes = labels.map((label, i) => ({
    name: label,
    itemStyle: { color: colors[i % colors.length] },
  }));

  const source = dataset.source || [];
  const target = dataset.target || [];
  const linkValues = dataset.values || [];

  const links = source.map((s, i) => ({
    source: labels[s] || String(s),
    target: labels[target[i]] || String(target[i]),
    value: linkValues[i] || 0,
  }));

  const series = [
    {
      type: 'sankey',
      data: nodes,
      links,
      orient: 'horizontal',
      nodeGap: 15,
      nodeWidth: 20,
      emphasis: { focus: 'adjacency' },
      ...(dataset.traceOptions || {}),
    },
  ];

  return { series, optionOverrides: {} };
}
