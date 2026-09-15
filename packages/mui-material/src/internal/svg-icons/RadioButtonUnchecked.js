'use client';
import * as React from 'react';
import SvgIcon from '../../SvgIcon';

/**
 * @ignore - internal component.
 */
export default function RadioButtonUnchecked(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14" sx={{ width: 14, height: 14 }}>
      <circle cx="7" cy="7" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </SvgIcon>
  );
}
