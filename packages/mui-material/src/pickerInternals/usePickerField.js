'use client';
import * as React from 'react';
import { dayjs, formatDate, parseDate } from './dateUtils';

export default function usePickerField({ value, format, onChange, readOnly, disabled }) {
  const [inputValue, setInputValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    if (!isFocused) {
      setInputValue(value ? formatDate(value, format) : '');
    }
  }, [value, format, isFocused]);

  const handleInputChange = React.useCallback(
    (event) => {
      if (readOnly || disabled) return;
      const newInput = event.target.value;
      setInputValue(newInput);
    },
    [readOnly, disabled],
  );

  const handleFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = React.useCallback(() => {
    setIsFocused(false);
    if (inputValue === '') {
      onChange?.(null);
      return;
    }
    const parsed = parseDate(inputValue, format);
    if (parsed) {
      onChange?.(parsed);
    } else {
      setInputValue(value ? formatDate(value, format) : '');
    }
  }, [inputValue, format, onChange, value]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === 'Enter') {
        const parsed = parseDate(inputValue, format);
        if (parsed) {
          onChange?.(parsed);
          setIsFocused(false);
        }
      }
    },
    [inputValue, format, onChange],
  );

  return {
    inputValue,
    setInputValue,
    isFocused,
    handleInputChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
  };
}
