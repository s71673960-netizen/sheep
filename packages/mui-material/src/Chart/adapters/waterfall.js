export default function buildWaterfallSeries(data, colors) {
  const dataset = data.datasets[0] || {};
  const values = dataset.values || [];
  const measure = dataset.measure || data.labels.map((_, i) =>
    i === 0 ? 'absolute' : i === data.labels.length - 1 ? 'total' : 'relative',
  );

  const baseData = [];
  const positiveData = [];
  const negativeData = [];
  let running = 0;

  values.forEach((val, i) => {
    if (measure[i] === 'absolute') {
      baseData.push(0);
      positiveData.push(val >= 0 ? val : '-');
      negativeData.push(val < 0 ? Math.abs(val) : '-');
      running = val;
    } else if (measure[i] === 'total') {
      baseData.push(0);
      positiveData.push(running >= 0 ? running : '-');
      negativeData.push(running < 0 ? Math.abs(running) : '-');
    } else {
      if (val >= 0) {
        baseData.push(running);
        positiveData.push(val);
        negativeData.push('-');
      } else {
        baseData.push(running + val);
        positiveData.push('-');
        negativeData.push(Math.abs(val));
      }
      running += val;
    }
  });

  const series = [
    {
      type: 'bar',
      name: 'base',
      stack: 'waterfall',
      data: baseData,
      itemStyle: { color: 'transparent' },
      emphasis: { itemStyle: { color: 'transparent' } },
      silent: true,
    },
    {
      type: 'bar',
      name: 'increase',
      stack: 'waterfall',
      data: positiveData,
      itemStyle: { color: colors[0] },
      ...(dataset.traceOptions || {}),
    },
    {
      type: 'bar',
      name: 'decrease',
      stack: 'waterfall',
      data: negativeData,
      itemStyle: { color: colors[1] },
    },
  ];

  const optionOverrides = {
    xAxis: { type: 'category', data: data.labels },
    yAxis: { type: 'value' },
  };

  return { series, optionOverrides };
}
