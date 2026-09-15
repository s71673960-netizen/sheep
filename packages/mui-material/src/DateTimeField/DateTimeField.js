'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useDefaultProps } from '../DefaultPropsProvider';
import OutlinedInput from '../OutlinedInput';
import InputAdornment from '../InputAdornment';
import IconButton from '../IconButton';
import EventIcon from '../icons/Event';
import usePickerField from '../pickerInternals/usePickerField';
import { DEFAULT_DATETIME_FORMAT } from '../pickerInternals/constants';

const DateTimeField = React.forwardRef(function DateTimeField(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDateTimeField' });
  const {
    value = null,
    onChange,
    format = DEFAULT_DATETIME_FORMAT,
    label,
    placeholder,
    size = 'medium',
    disabled = false,
    readOnly = false,
    error = false,
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
            aria-label="open date time picker"
          >
            <EventIcon />
          </IconButton>
        </InputAdornment>
      }
      sx={sx}
      {...InputProps}
      {...other}
    />
  );
});

DateTimeField.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  format: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
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

export default DateTimeField;
