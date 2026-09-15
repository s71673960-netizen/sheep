'use client';
import * as React from 'react';
import ReactECharts from 'echarts-for-react';

const ChartCore = React.forwardRef(function ChartCore(props, ref) {
  const { option, style, onEvent, loading, ...other } = props;
  const chartRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    getEchartsInstance: () => chartRef.current?.getEchartsInstance(),
  }));

  const onEvents = React.useMemo(() => {
    if (!onEvent) return undefined;
    return {
      click: (params) => onEvent({ type: 'click', data: params }),
      mouseover: (params) => onEvent({ type: 'hover', data: params }),
      selectchanged: (params) => onEvent({ type: 'select', data: params }),
    };
  }, [onEvent]);

  return (
    <ReactECharts
      ref={chartRef}
      option={option}
      style={style}
      onEvents={onEvents}
      showLoading={loading}
      notMerge
      lazyUpdate
      {...other}
    />
  );
});

export default ChartCore;
