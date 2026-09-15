import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export function getChartUtilityClass(slot: string) {
  return generateUtilityClass('MuiChart', slot);
}

const chartClasses = generateUtilityClasses('MuiChart', ['root']);

export default chartClasses;
