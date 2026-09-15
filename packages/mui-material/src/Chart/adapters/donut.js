const PIE_COLORS = ['#038247', '#2FB8C8', '#47B881', '#94D5D9', '#B6AAF3', '#D8CFEF', '#F7C085', '#F9D9B7'];

export default function buildDonutSeries(data, colors, themeColors = {}) {
  const dataset = data.datasets[0] || {};
  const pieData = (data.labels || []).map((label, i) => ({
    name: label,
    value: dataset.values?.[i] || 0,
    itemStyle: { color: PIE_COLORS[i % PIE_COLORS.length] },
  }));

  const series = [
    {
      type: 'pie',
      radius: ['40%', '60%'],
      center: ['50%', '50%'],
      data: pieData,
      label: {
        show: true,
        formatter: '{b}（{c}）',
        fontSize: 12,
        color: themeColors.textSecondary,
      },
      labelLine: {
        show: true,
        length: 16,
        length2: 24,
        lineStyle: { color: themeColors.divider },
      },
      emphasis: { scaleSize: 5 },
      ...(dataset.traceOptions || {}),
    },
  ];

  return { series, optionOverrides: {} };
}
