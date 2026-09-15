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
import { defaultLocale } from '../pickerInternals/pickerLocale';

const DateRangeFieldRoot = styled('div', {
  name: 'UiDateRangeField',
  slot: 'Root',
})({
  display: 'inline-flex',
  position: 'relative',
});

const InnerInput = styled('input', {
  name: 'UiDateRangeField',
  slot: 'Input',
})(
  memoTheme(({ theme }) => ({
    border: 'none',
    outline: 'none',
    background: 'transparent',
    font: 'inherit',
    color: 'inherit',
    padding: 0,
    width: '11ch',
    textAlign: 'center',
    '&::placeholder': {
      color: (theme.vars || theme).palette.text.secondary,
      opacity: 1,
    },
  })),
);

const Separator = styled('span', {
  name: 'UiDateRangeField',
  slot: 'Separator',
})(
  memoTheme(({ theme }) => ({
    margin: '0 4px',
    color: (theme.vars || theme).palette.text.secondary,
    userSelect: 'none',
    flexShrink: 0,
  })),
);

const DateRangeField = React.forwardRef(function DateRangeField(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDateRangeField' });
  const {
    value = [null, null],
    onChange,
    format = DEFAULT_DATE_FORMAT,
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

  const handleRootClick = React.useCallback(
    (event) => {
      if (event.target.tagName === 'INPUT') return;
      onIconClick?.();
    },
    [onIconClick],
  );

  return (
    <DateRangeFieldRoot
      ref={ref}
      sx={{ ...(fullWidth && { width: '100%' }), ...sx }}
      {...other}
    >
      <OutlinedInput
        readOnly
        size={size}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        onClick={handleRootClick}
        sx={{ cursor: 'pointer', pr: 1.5, pl: 1.5 }}
        inputComponent="div"
        inputProps={{
          style: { display: 'flex', alignItems: 'center', padding: 0 },
          children: (
            <React.Fragment>
              <InnerInput
                value={startField.inputValue}
                onChange={startField.handleInputChange}
                onFocus={startField.handleFocus}
                onBlur={startField.handleBlur}
                onKeyDown={startField.handleKeyDown}
                placeholder={format}
                disabled={disabled}
                readOnly={readOnly}
                aria-label={locale.startDate}
              />
              <Separator>–</Separator>
              <InnerInput
                value={endField.inputValue}
                onChange={endField.handleInputChange}
                onFocus={endField.handleFocus}
                onBlur={endField.handleBlur}
                onKeyDown={endField.handleKeyDown}
                placeholder={format}
                disabled={disabled}
                readOnly={readOnly}
                aria-label={locale.endDate}
              />
            </React.Fragment>
          ),
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              edge="end"
              onClick={onIconClick}
              disabled={disabled}
              aria-label="open date range picker"
              sx={{
                transition: 'transform 0.15s ease',
                '&:active': { transform: 'scale(0.85)' },
              }}
            >
              <CalenderIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </InputAdornment>
        }
      />
    </DateRangeFieldRoot>
  );
});

DateRangeField.propTypes = {
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

export default DateRangeField;
