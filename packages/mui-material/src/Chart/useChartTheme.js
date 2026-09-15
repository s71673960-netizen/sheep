'use client';
import { useTheme } from '../styles';

export default function useChartTheme() {
  const theme = useTheme();
  const palette = theme.palette;
  const isDark = theme.palette.mode === 'dark';
  const tooltipShadow = isDark
    ? '0 12px 32px rgba(0,0,0,0.42)'
    : '0 2px 12px rgba(0,0,0,0.08)';

  return {
    backgroundColor: 'transparent',
    textStyle: {
      color: palette.text.primary,
      fontFamily: "'LiciumFont 2022', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      fontSize: 12,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: palette.background.paper,
      borderColor: palette.divider,
      borderWidth: 1,
      padding: 0,
      textStyle: { color: palette.text.primary, fontSize: 12 },
      extraCssText: `box-shadow: ${tooltipShadow}; border-radius: 8px; overflow: hidden;`,
      formatter: function (params) {
        if (!Array.isArray(params) || params.length === 0) return '';
        const title = params[0].axisValueLabel || params[0].name || '';
        let rows = '';
        params.forEach(function (item) {
          if (item.seriesName && item.value != null) {
            rows += '<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:6px 10px;">'
              + '<span style="display:inline-flex;align-items:center;gap:6px;">'
              + '<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:' + item.color + '"></span>'
              + `<span style="font-size:12px;color:${palette.text.primary}">` + item.seriesName + '</span>'
              + '</span>'
              + `<span style="font-size:12px;font-weight:600;color:${palette.text.primary}">` + item.value + '</span>'
              + '</div>';
          }
        });
        return `<div style="padding:6px 10px;font-size:12px;color:${palette.text.primary};background:${palette.background.soft};border-bottom:1px solid ${palette.divider}">` + title + '</div>' + rows;
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: palette.action.hover,
        },
      },
    },
    xAxis: {
      axisLine: { lineStyle: { color: palette.divider } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { color: palette.text.secondary },
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: theme.alpha(palette.divider, isDark ? 0.6 : 0.7) } },
      axisLabel: { color: palette.text.secondary },
    },
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    grid: { left: 50, right: 20, top: 20, bottom: 24, containLabel: true },
  };
}
