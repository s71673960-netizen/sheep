'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import DateField from '../DateField';
import DateCalendar from '../DateCalendar';
import { PickerPopper } from '../pickerInternals';
import usePickerState from '../pickerInternals/usePickerState';
import { DEFAULT_DATE_FORMAT } from '../pickerInternals/constants';

const DatePickerRoot = styled('div', {
  name: 'UiDatePicker',
  slot: 'Root',
})({
  display: 'inline-flex',
  position: 'relative',
});

const DatePicker = React.forwardRef(function DatePicker(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDatePicker' });
  const {
    value: valueProp,
    defaultValue,
    onChange,
    onAccept,
    format = DEFAULT_DATE_FORMAT,
    label,
    placeholder,
    size = 'medium',
    disabled = false,
    readOnly = false,
    error = false,
    helperText,
    fullWidth = false,
    minDate,
    maxDate,
    disablePast = false,
    disableFuture = false,
    shouldDisableDate,
    views = ['year', 'month', 'day'],
    openTo = 'day',
    open: openProp,
    onOpen,
    onClose,
    closeOnSelect = true,
    sx,
    slotProps = {},
    ...other
  } = props;

  const anchorRef = React.useRef(null);

  const { value, open, handleOpen, handleClose, handleChange } = usePickerState({
    value: valueProp,
    defaultValue,
    onChange,
    onAccept,
    onOpen,
    onClose,
    open: openProp,
    closeOnSelect,
  });

  const handleDaySelect = React.useCallback(
    (day) => {
      handleChange(day, { shouldClose: true });
    },
    [handleChange],
  );

  const handleFieldChange = React.useCallback(
    (newValue) => {
      handleChange(newValue, { shouldClose: false });
    },
    [handleChange],
  );

  const handleIconClick = React.useCallback(() => {
    if (!disabled && !readOnly) {
      if (open) {
        handleClose();
      } else {
        handleOpen();
      }
    }
  }, [disabled, readOnly, open, handleOpen, handleClose]);

  return (
    <DatePickerRoot ref={ref} sx={fullWidth ? { width: '100%' } : undefined} {...other}>
      <div ref={anchorRef} style={fullWidth ? { width: '100%' } : undefined}>
        <DateField
          value={value}
          onChange={handleFieldChange}
          format={format}
          label={label}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
          helperText={helperText}
          fullWidth={fullWidth}
          onIconClick={handleIconClick}
          sx={sx}
          {...slotProps.field}
        />
      </div>
      <PickerPopper
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        {...slotProps.popper}
      >
        <DateCalendar
          value={value}
          onChange={handleDaySelect}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          shouldDisableDate={shouldDisableDate}
          views={views}
          openTo={openTo}
          {...slotProps.calendar}
        />
      </PickerPopper>
    </DatePickerRoot>
  );
});

DatePicker.propTypes = {
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  onAccept: PropTypes.func,
  format: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  fullWidth: PropTypes.bool,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  views: PropTypes.arrayOf(PropTypes.oneOf(['year', 'month', 'day'])),
  openTo: PropTypes.oneOf(['year', 'month', 'day']),
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  closeOnSelect: PropTypes.bool,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  slotProps: PropTypes.shape({
    field: PropTypes.object,
    popper: PropTypes.object,
    calendar: PropTypes.object,
  }),
};

export default DatePicker;
