'use client';
import * as React from 'react';
import SvgIcon from '../../SvgIcon';

/**
 * @ignore - internal component.
 */
export default function IndeterminateCheckBox(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14">
      <rect width="14" height="14" rx="3" fill="currentColor" />
      <path d="M4 7H10" fill="none" stroke="var(--checkbox-mark-color, #fff)" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}
