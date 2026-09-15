'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import DateTimeField from '../DateTimeField';
import DateCalendar from '../DateCalendar';
import DigitalClock from '../DigitalClock';
import { PickerPopper } from '../pickerInternals';
import usePickerState from '../pickerInternals/usePickerState';
import { DEFAULT_DATETIME_FORMAT } from '../pickerInternals/constants';
import { dayjs } from '../pickerInternals/dateUtils';

const DateTimePickerRoot = styled('div', {
  name: 'UiDateTimePicker',
  slot: 'Root',
})({
  display: 'inline-flex',
  position: 'relative',
});

const DateTimePickerContent = styled('div', {
  name: 'UiDateTimePicker',
  slot: 'Content',
})({
  display: 'flex',
});

const DateTimePicker = React.forwardRef(function DateTimePicker(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDateTimePicker' });
  const {
    value: valueProp,
    defaultValue,
    onChange,
    onAccept,
    format = DEFAULT_DATETIME_FORMAT,
    label,
    placeholder,
    size = 'medium',
    disabled = false,
    readOnly = false,
    error = false,
    fullWidth = false,
    minDate,
    maxDate,
    minTime,
    maxTime,
    disablePast = false,
    disableFuture = false,
    shouldDisableDate,
    timeStep = 30,
    views = ['year', 'month', 'day'],
    openTo = 'day',
    open: openProp,
    onOpen,
    onClose,
    closeOnSelect = false,
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
      const current = value ? dayjs(value) : dayjs();
      const newValue = day.hour(current.hour()).minute(current.minute());
      handleChange(newValue, { shouldClose: false });
    },
    [value, handleChange],
  );

  const handleTimeSelect = React.useCallback(
    (newValue) => {
      handleChange(newValue, { shouldClose: true });
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
    <DateTimePickerRoot ref={ref} sx={fullWidth ? { width: '100%' } : undefined} {...other}>
      <div ref={anchorRef} style={fullWidth ? { width: '100%' } : undefined}>
        <DateTimeField
          value={value}
          onChange={handleFieldChange}
          format={format}
          label={label}
          placeholder={placeholder}
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
        <DateTimePickerContent>
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
          <DigitalClock
            value={value}
            onChange={handleTimeSelect}
            timeStep={timeStep}
            minTime={minTime}
            maxTime={maxTime}
            {...slotProps.clock}
          />
        </DateTimePickerContent>
      </PickerPopper>
    </DateTimePickerRoot>
  );
});

DateTimePicker.propTypes = {
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
  fullWidth: PropTypes.bool,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  timeStep: PropTypes.number,
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
    clock: PropTypes.object,
  }),
};

export default DateTimePicker;
