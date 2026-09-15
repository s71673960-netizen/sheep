'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import OutlinedInput from '../OutlinedInput';
import InputAdornment from '../InputAdornment';
import IconButton from '../IconButton';
import CalenderIcon from '../icons/Calender';
import usePickerField from '../pickerInternals/usePickerField';
import { DEFAULT_DATE_FORMAT } from '../pickerInternals/constants';

const DateField = React.forwardRef(function DateField(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDateField' });
  const {
    value = null,
    onChange,
    format = DEFAULT_DATE_FORMAT,
    label,
    placeholder,
    size = 'medium',
    disabled = false,
    readOnly = false,
    error = false,
    helperText,
    fullWidth = false,
    onIconClick,
    sx,
    InputProps,
    inputRef,
    ...other
  } = props;

  const { inputValue, handleInputChange, handleFocus, handleBlur, handleKeyDown } = usePickerField({
    value,
    format,
    onChange,
    readOnly,
    disabled,
  });

  return (
    <OutlinedInput
      ref={ref}
      inputRef={inputRef}
      value={inputValue}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder || format}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      fullWidth={fullWidth}
      label={label}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            size="small"
            edge="end"
            onClick={onIconClick}
            disabled={disabled}
            aria-label="open calendar"
            sx={{
              transition: 'transform 0.15s ease',
              '&:active': { transform: 'scale(0.85)' },
            }}
          >
            <CalenderIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </InputAdornment>
      }
      sx={sx}
      {...InputProps}
      {...other}
    />
  );
});

DateField.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  format: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  fullWidth: PropTypes.bool,
  onIconClick: PropTypes.func,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  InputProps: PropTypes.object,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};

export default DateField;
