'use client';
import * as React from 'react';
import SvgIcon from '../../SvgIcon';

/**
 * @ignore - internal component.
 */
export default function RadioButtonChecked(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14 }}>
      <circle cx="7" cy="7" r="7" fill="currentColor" />
      <circle cx="7" cy="7" r="2.5" fill="var(--radio-mark-color, #fff)" />
    </SvgIcon>
  );
}
