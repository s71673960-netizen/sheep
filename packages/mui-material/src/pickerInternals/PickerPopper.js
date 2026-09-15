'use client';
import * as React from 'react';
import Popper from '../Popper';
import Paper from '../Paper';
import Grow from '../Grow';
import ClickAwayListener from '../ClickAwayListener';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

const PickerPopperPaper = styled(Paper, {
  name: 'UiPickerPopper',
  slot: 'Paper',
})(
  memoTheme(({ theme }) => ({
    transformOrigin: 'top center',
    outline: 0,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 4,
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 12px 32px rgba(0, 0, 0, 0.42)'
        : '0px 0px 1px rgba(101, 94, 85, 0.26), 0px 8px 16px rgba(101, 94, 85, 0.08)',
  })),
);

export default function PickerPopper({
  open,
  anchorEl,
  onClose,
  children,
  placement = 'bottom-start',
  sx,
}) {
  const handleClickAway = React.useCallback(
    (event) => {
      if (anchorEl && anchorEl.contains(event.target)) {
        return;
      }
      onClose?.();
    },
    [anchorEl, onClose],
  );

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      sx={{ zIndex: (theme) => theme.zIndex.modal, ...sx }}
    >
      <Grow in={open} style={{ transformOrigin: '0 0 0' }}>
        <PickerPopperPaper>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>{children}</div>
          </ClickAwayListener>
        </PickerPopperPaper>
      </Grow>
    </Popper>
  );
}
