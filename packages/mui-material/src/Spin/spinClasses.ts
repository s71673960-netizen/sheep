import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SpinClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when spinning. */
  spinning: string;
  /** Styles applied to the root element when it has children (wrapper mode). */
  nested: string;
  /** Styles applied to the root element when fullscreen. */
  fullscreen: string;
  /** Styles applied to the indicator wrapper. */
  indicator: string;
  /** Styles applied to the description element. */
  description: string;
  /** Styles applied to the overlay element in wrapper mode. */
  overlay: string;
  /** Styles applied to the content wrapper element. */
  content: string;
  /** Styles applied when size="small". */
  sizeSmall: string;
  /** Styles applied when size="medium". */
  sizeMedium: string;
  /** Styles applied when size="large". */
  sizeLarge: string;
}

export type SpinClassKey = keyof SpinClasses;

export function getSpinUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSpin', slot);
}

const spinClasses: SpinClasses = generateUtilityClasses('MuiSpin', [
  'root',
  'spinning',
  'nested',
  'fullscreen',
  'indicator',
  'description',
  'overlay',
  'content',
  'sizeSmall',
  'sizeMedium',
  'sizeLarge',
]);

export default spinClasses;
