'use client';
import * as React from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';

function Lison(props, ref) {
  return (
    <SvgIcon ref={ref} viewBox="0 0 39 34" {...props}>
      <ellipse cx="19.1115" cy="19.8235" rx="15.3632" ry="12.9651" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M19.1128 6.94374V3.87109" stroke="currentColor" strokeWidth="1.6"/>
      <ellipse cx="19.1124" cy="2.54017" rx="1.74036" ry="1.74037" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M0.800049 15.7959L0.800049 23.0692" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M37.6724 15.7959L37.6724 23.0692" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M30.8145 20.0205C30.8145 26.1097 25.5763 28.2478 19.1147 28.2478C12.6532 28.2478 7.41504 26.3138 7.41504 20.0205C7.41504 15.4766 12.579 11.6728 19.1147 11.6728C25.9344 11.6728 30.8145 15.4766 30.8145 20.0205Z" stroke="currentColor" strokeWidth="1.6"/>
      <ellipse cx="13.8079" cy="20.0801" rx="2.14144" ry="2.83007" fill="currentColor"/>
      <ellipse cx="24.4224" cy="20.0801" rx="2.14144" ry="2.83007" fill="currentColor"/>
    </SvgIcon>
  );
}

Lison.muiName = SvgIcon.muiName;

export default React.memo(React.forwardRef(Lison));
