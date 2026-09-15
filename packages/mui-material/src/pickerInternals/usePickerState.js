'use client';
import * as React from 'react';

export default function usePickerState({
  value: valueProp,
  defaultValue,
  onChange,
  onAccept,
  onOpen,
  onClose,
  open: openProp,
  closeOnSelect = true,
}) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? null);
  const value = isControlled ? valueProp : internalValue;

  const [draftValue, setDraftValue] = React.useState(value);
  const [open, setOpenState] = React.useState(false);
  const isOpenControlled = openProp !== undefined;
  const isOpen = isOpenControlled ? openProp : open;

  React.useEffect(() => {
    setDraftValue(value);
  }, [value]);

  const setOpen = React.useCallback(
    (newOpen) => {
      if (!isOpenControlled) {
        setOpenState(newOpen);
      }
      if (newOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    },
    [isOpenControlled, onOpen, onClose],
  );

  const handleOpen = React.useCallback(() => setOpen(true), [setOpen]);
  const handleClose = React.useCallback(() => setOpen(false), [setOpen]);

  const handleChange = React.useCallback(
    (newValue, options = {}) => {
      setDraftValue(newValue);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      if (options.shouldClose && closeOnSelect) {
        setOpen(false);
        onAccept?.(newValue);
      }
    },
    [isControlled, onChange, onAccept, closeOnSelect, setOpen],
  );

  const handleAccept = React.useCallback(
    (newValue) => {
      const val = newValue !== undefined ? newValue : draftValue;
      if (!isControlled) {
        setInternalValue(val);
      }
      onChange?.(val);
      onAccept?.(val);
      setOpen(false);
    },
    [draftValue, isControlled, onChange, onAccept, setOpen],
  );

  const handleClear = React.useCallback(() => {
    handleChange(null, { shouldClose: true });
  }, [handleChange]);

  return {
    value,
    draftValue,
    open: isOpen,
    setOpen,
    handleOpen,
    handleClose,
    handleChange,
    handleAccept,
    handleClear,
    setDraftValue,
  };
}
