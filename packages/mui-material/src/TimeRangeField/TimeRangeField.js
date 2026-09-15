'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import OutlinedInput from '../OutlinedInput';
import InputAdornment from '../InputAdornment';
import IconButton from '../IconButton';
import Typography from '../Typography';
import TimeIcon from '../icons/Time';
import usePickerField from '../pickerInternals/usePickerField';
import { DEFAULT_TIME_FORMAT } from '../pickerInternals/constants';
import { defaultLocale } from '../pickerInternals/pickerLocale';

const TimeRangeFieldRoot = styled('div', {
  name: 'UiTimeRangeField',
  slot: 'Root',
})({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
});

const TimeRangeField = React.forwardRef(function TimeRangeField(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiTimeRangeField' });
  const {
    value = [null, null],
    onChange,
    format = DEFAULT_TIME_FORMAT,
    size = 'medium',
    disabled = false,
    readOnly = false,
    error = false,
    fullWidth = false,
    onIconClick,
    locale = defaultLocale,
    sx,
    ...other
  } = props;

  const [startValue, endValue] = value;

  const startField = usePickerField({
    value: startValue,
    format,
    onChange: (newStart) => onChange?.([newStart, endValue]),
    readOnly,
    disabled,
  });

  const endField = usePickerField({
    value: endValue,
    format,
    onChange: (newEnd) => onChange?.([startValue, newEnd]),
    readOnly,
    disabled,
  });

  return (
    <TimeRangeFieldRoot ref={ref} sx={{ ...(fullWidth && { width: '100%' }), ...sx }} {...other}>
      <OutlinedInput
        value={startField.inputValue}
        onChange={startField.handleInputChange}
        onFocus={startField.handleFocus}
        onBlur={startField.handleBlur}
        onKeyDown={startField.handleKeyDown}
        placeholder={locale.startTime}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        error={error}
        sx={{ flex: 1 }}
      />
      <Typography variant="body2" color="text.secondary">
        {locale.separator}
      </Typography>
      <OutlinedInput
        value={endField.inputValue}
        onChange={endField.handleInputChange}
        onFocus={endField.handleFocus}
        onBlur={endField.handleBlur}
        onKeyDown={endField.handleKeyDown}
        placeholder={locale.endTime}
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        error={error}
        sx={{ flex: 1 }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              onClick={onIconClick}
              disabled={disabled}
              aria-label="open time range picker"
            >
              <TimeIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </TimeRangeFieldRoot>
  );
});

TimeRangeField.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  format: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onIconClick: PropTypes.func,
  locale: PropTypes.object,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TimeRangeField;
