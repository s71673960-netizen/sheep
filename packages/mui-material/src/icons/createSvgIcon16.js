'use client';
import * as React from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';

export default function createSvgIcon16(path, displayName) {
  function Component(props, ref) {
    return (
      <SvgIcon ref={ref} viewBox="0 0 16 16" {...props}>
        {path}
      </SvgIcon>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = SvgIcon.muiName;

  return React.memo(React.forwardRef(Component));
}
