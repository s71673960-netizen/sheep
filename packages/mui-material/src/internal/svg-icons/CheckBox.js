'use client';
import * as React from 'react';
import SvgIcon from '../../SvgIcon';

/**
 * @ignore - internal component.
 */
export default function CheckBox(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14">
      <rect width="14" height="14" rx="3" fill="currentColor" />
      <path d="M3.5 7.2L5.8 9.5L10.5 4.5" fill="none" stroke="var(--checkbox-mark-color, #fff)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}
