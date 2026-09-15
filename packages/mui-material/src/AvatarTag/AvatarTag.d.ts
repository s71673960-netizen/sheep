import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { AvatarTagClasses } from './avatarTagClasses';

export interface AvatarTagProps {
  /**
   * Image alt text.
   */
  alt?: string;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AvatarTagClasses>;
  /**
   * Display name shown next to the avatar.
   */
  name?: string;
  /**
   * Click handler.
   */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /**
   * The size of the tag.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * Avatar image source URL.
   */
  src?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

declare const AvatarTag: React.FC<AvatarTagProps>;

export default AvatarTag;
