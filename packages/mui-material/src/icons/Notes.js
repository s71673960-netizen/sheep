'use client';
import * as React from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';

const Notes = React.memo(React.forwardRef(function NotesIcon(props, ref) {
  return (
    <SvgIcon ref={ref} viewBox="0 0 14 16" {...props}>
      <path d="M12.5 11.4C12.2 11.4 11.9 11.7 11.9 12V13.8C11.9 14.3 11.7 14.7 11.3 14.7H1.8C1.5 14.7 1.2 14.4 1.2 14V3C1.2 2.6 1.5 2.4 1.8 2.4H2.7C2.8 3 3.4 3.4 4 3.4H8.9C9.6 3.4 10.1 2.9 10.3 2.3H11.5C11.6 2.3 11.8 2.4 11.8 2.6V9C11.8 9.3 12.1 9.6 12.4 9.6C12.7 9.6 13 9.3 13 9V2.6C13 1.8 12.3 1.1 11.5 1.1H10.3C10.3 0.5 9.8 0 9.2 0H4C3.3 0 2.8 0.5 2.6 1.1H1.8C0.8 1.2 0 2 0 3V14.1C0 15.1 0.8 15.9 1.8 15.9H11.3C12.3 15.9 13.1 15 13.1 13.8V12C13.1 11.7 12.8 11.4 12.5 11.4ZM3.8 1.5C3.8 1.4 3.9 1.3 4 1.3H9C9.1 1.3 9.2 1.4 9.2 1.5V2C9.2 2.1 9.1 2.2 9 2.2H4C3.9 2.2 3.8 2.1 3.8 2V1.5Z" fill="currentColor"/>
    </SvgIcon>
  );
}));

Notes.muiName = SvgIcon.muiName;

export default Notes;
