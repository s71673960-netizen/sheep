import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { StatisticClasses } from './statisticClasses';

export interface StatisticPropsVariantOverrides {}

export interface StatisticOwnProps {
  /**
   * The title of the statistic.
   */
  title?: React.ReactNode;
  /**
   * Subtitle text displayed below the title (outlined variant only).
   */
  subtitle?: React.ReactNode;
  /**
   * The value to display.
   */
  value?: string | number;
  /**
   * Decimal precision for formatting numeric values.
   */
  precision?: number;
  /**
   * Prefix content to display before the value.
   */
  prefix?: React.ReactNode;
  /**
   * Suffix content to display after the value.
   */
  suffix?: React.ReactNode;
  /**
   * Trend indicator displayed after the value (e.g. "↑100%").
   */
  trend?: React.ReactNode;
  /**
   * Icon displayed next to the title.
   */
  icon?: React.ReactNode;
  /**
   * Alignment of the content.
   * @default 'center' for filled, 'start' for outlined
   */
  align?: 'center' | 'start';
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined';
  /**
   * Custom thousands separator.
   * @default ','
   */
  groupSeparator?: string;
  /**
   * Custom decimal separator.
   * @default '.'
   */
  decimalSeparator?: string;
  /**
   * Custom formatter function for the value.
   * If provided, this takes precedence over default formatting.
   */
  formatter?: (value: string | number | undefined) => React.ReactNode;
  /**
   * If `true`, display loading state.
   * @default false
   */
  loading?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StatisticClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface StatisticTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & StatisticOwnProps;
  defaultComponent: RootComponent;
}

export type StatisticProps<
  RootComponent extends React.ElementType = StatisticTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<StatisticTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export interface StatisticTimerProps {
  /**
   * Timer type: countdown or countup.
   */
  type: 'countdown' | 'countup';
  /**
   * The title of the timer.
   */
  title?: React.ReactNode;
  /**
   * For countdown: target timestamp (ms). For countup: start timestamp (ms).
   */
  value: number;
  /**
   * Format string for the time display.
   * @default 'HH:mm:ss'
   */
  format?: string;
  /**
   * Prefix content.
   */
  prefix?: React.ReactNode;
  /**
   * Suffix content.
   */
  suffix?: React.ReactNode;
  /**
   * Callback when countdown finishes. Not applicable for countup.
   */
  onFinish?: () => void;
  /**
   * Callback when the time value changes.
   */
  onChange?: (value: number) => void;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StatisticClasses>;
  /**
   * CSS class name.
   */
  className?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 * Statistic.Timer component for countdown and countup displays.
 */
declare const StatisticTimer: React.FC<StatisticTimerProps>;

/**
 * Display statistic number values with optional formatting, prefix/suffix, and loading state.
 */
declare const Statistic: OverridableComponent<StatisticTypeMap> & {
  Timer: typeof StatisticTimer;
};

export { StatisticTimer };
export default Statistic;
