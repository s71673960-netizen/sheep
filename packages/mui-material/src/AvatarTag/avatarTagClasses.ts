import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AvatarTagClasses {
  root: string;
  avatar: string;
  name: string;
  sizeSmall: string;
  sizeMedium: string;
}

export type AvatarTagClassKey = keyof AvatarTagClasses;

export function getAvatarTagUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAvatarTag', slot);
}

const avatarTagClasses: AvatarTagClasses = generateUtilityClasses('MuiAvatarTag', [
  'root',
  'avatar',
  'name',
  'sizeSmall',
  'sizeMedium',
]);

export default avatarTagClasses;
