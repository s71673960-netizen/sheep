import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ResponsiveStyleValue, SxProps } from '../styleFunctionSx';
import { Theme } from '../createTheme';

export interface StackBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'> | undefined;
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<number | string> | undefined;
  /**
   * Add an element between each child.
   */
  divider?: React.ReactNode;
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the theme's default props configuration.
   * @default false
   */
  useFlexGap?: boolean | undefined;
  /**
   * Defines the `align-items` style property.
   */
  alignItems?: React.CSSProperties['alignItems'] | undefined;
  /**
   * Defines the `justify-content` style property.
   */
  justifyContent?: React.CSSProperties['justifyContent'] | undefined;
  // Common system props accepted as direct props for convenience
  m?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mx?: number | string;
  my?: number | string;
  p?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  px?: number | string;
  py?: number | string;
  gap?: number | string;
  flex?: number | string;
  flexGrow?: number;
  flexShrink?: number;
  width?: number | string;
  height?: number | string;
  overflow?: string;
}
export interface StackTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps &
    StackBaseProps & {
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme> | undefined;
    };
  defaultComponent: DefaultComponent;
}

export type StackProps<
  RootComponent extends React.ElementType = StackTypeMap['defaultComponent'],
  AdditionalProps = {
    component?: React.ElementType | undefined;
  },
> = OverrideProps<StackTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export interface StackOwnerState {
  direction: StackProps['direction'];
  spacing: StackProps['spacing'];
  useFlexGap: boolean;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
}
