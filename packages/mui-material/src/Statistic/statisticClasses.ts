import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface StatisticClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the header element. */
  header: string;
  /** Styles applied to the title element. */
  title: string;
  /** Styles applied to the subtitle element. */
  subtitle: string;
  /** Styles applied to the content element. */
  content: string;
  /** Styles applied to the prefix element. */
  prefix: string;
  /** Styles applied to the value element. */
  value: string;
  /** Styles applied to the suffix element. */
  suffix: string;
  /** Styles applied to the trend element. */
  trend: string;
  /** Styles applied to the root element when loading. */
  loading: string;
  /** Styles applied to the root element when variant="filled". */
  variantFilled: string;
  /** Styles applied to the root element when variant="outlined". */
  variantOutlined: string;
}

export type StatisticClassKey = keyof StatisticClasses;

export function getStatisticUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStatistic', slot);
}

const statisticClasses: StatisticClasses = generateUtilityClasses('MuiStatistic', [
  'root',
  'header',
  'title',
  'subtitle',
  'content',
  'prefix',
  'value',
  'suffix',
  'trend',
  'loading',
  'variantFilled',
  'variantOutlined',
]);

export default statisticClasses;
