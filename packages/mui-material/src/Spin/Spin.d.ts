import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { SpinClasses } from './spinClasses';

export interface SpinProps {
  /**
   * The content to wrap with loading state.
   * When provided, Spin works in wrapper mode.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SpinClasses>;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Delay showing the spinner (in ms) to prevent flash.
   */
  delay?: number;
  /**
   * Custom description text shown below the spinner.
   */
  description?: React.ReactNode;
  /**
   * If `true`, shows a fullscreen overlay with the spinner.
   * @default false
   */
  fullscreen?: boolean;
  /**
   * Custom indicator element to replace the default CircularProgress.
   */
  indicator?: React.ReactNode;
  /**
   * Progress percentage. When set, shows a determinate spinner.
   * Use `'auto'` for an estimated progress that never completes.
   */
  percent?: number | 'auto';
  /**
   * The size of the spinner.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether the component is in spinning (loading) state.
   * @default true
   */
  spinning?: boolean;
  /**
   * The variant of the spinner.
   * - `spin`: rotating arc (default)
   * - `waiting`: solid dot with breathing ring
   * @default 'spin'
   */
  variant?: 'spin' | 'waiting';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 * Spin component for page and container loading states.
 */
declare const Spin: React.FC<SpinProps>;

export default Spin;
