'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import DateRangeField from '../DateRangeField';
import DateRangeCalendar from '../DateRangeCalendar';
import { PickerPopper } from '../pickerInternals';
import usePickerState from '../pickerInternals/usePickerState';
import { DEFAULT_DATE_FORMAT } from '../pickerInternals/constants';
import { isSameDay } from '../pickerInternals/dateUtils';

const DateRangePickerRoot = styled('div', {
  name: 'UiDateRangePicker',
  slot: 'Root',
})({
  display: 'inline-flex',
  position: 'relative',
});

const DateRangePicker = React.forwardRef(function DateRangePicker(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDateRangePicker' });
  const {
    value: valueProp,
    defaultValue,
    onChange,
    onAccept,
    format = DEFAULT_DATE_FORMAT,
    size = 'medium',
    disabled = false,
    readOnly = false,
    error = false,
    fullWidth = false,
    minDate,
    maxDate,
    disablePast = false,
    disableFuture = false,
    shouldDisableDate,
    calendars = 2,
    open: openProp,
    onOpen,
    onClose,
    sx,
    slotProps = {},
    ...other
  } = props;

  const anchorRef = React.useRef(null);

  const { value, open, handleOpen, handleClose, handleChange } = usePickerState({
    value: valueProp,
    defaultValue: defaultValue || [null, null],
    onChange,
    onAccept,
    onOpen,
    onClose,
    open: openProp,
    closeOnSelect: false,
  });

  const handleRangeChange = React.useCallback(
    (newValue) => {
      handleChange(newValue, { shouldClose: false });
      const [start, end] = newValue;
      if (start && end) {
        handleChange(newValue, { shouldClose: true });
      }
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
    <DateRangePickerRoot ref={ref} sx={fullWidth ? { width: '100%' } : undefined} {...other}>
      <div ref={anchorRef} style={fullWidth ? { width: '100%' } : undefined}>
        <DateRangeField
          value={value}
          onChange={handleFieldChange}
          format={format}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
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
        <DateRangeCalendar
          value={value}
          onChange={handleRangeChange}
          calendars={calendars}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          shouldDisableDate={shouldDisableDate}
          {...slotProps.calendar}
        />
      </PickerPopper>
    </DateRangePickerRoot>
  );
});

DateRangePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  defaultValue: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  onAccept: PropTypes.func,
  format: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  calendars: PropTypes.oneOf([1, 2, 3]),
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
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

export default DateRangePicker;
