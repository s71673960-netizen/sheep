import { SxProps, Theme } from '../styles';

export type ChartType =
  | 'bar'
  | 'line'
  | 'area'
  | 'scatter'
  | 'pie'
  | 'donut'
  | 'funnel'
  | 'radar'
  | 'heatmap'
  | 'candlestick'
  | 'waterfall'
  | 'treemap'
  | 'sankey'
  | 'gauge'
  | 'map';

export interface ChartDataset {
  name: string;
  values: number[];
  x?: number[] | string[];
  open?: number[];
  high?: number[];
  low?: number[];
  close?: number[];
  parents?: string[];
  source?: number[];
  target?: number[];
  measure?: string[];
  max?: number;
  threshold?: number;
  markerSize?: number;
  mapType?: string;
  locationmode?: string;
  traceOptions?: Record<string, any>;
}

export interface ChartData {
  labels?: string[];
  datasets: ChartDataset[];
}

export interface ChartEvent {
  type: 'click' | 'hover' | 'select';
  data: any;
}

export interface ChartProps {
  type?: ChartType;
  data?: ChartData;
  colorScheme?: string | string[];
  height?: number | string;
  width?: number | string;
  option?: Record<string, any>;
  onEvent?: (event: ChartEvent) => void;
  loading?: boolean;
  legend?: boolean;
  animation?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

export { default } from './Chart';
export { default as Chart } from './Chart';
export { default as chartClasses } from './chartClasses';
export * from './chartClasses';
