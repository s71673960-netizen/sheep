'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import TimeField from '../TimeField';
import DigitalClock from '../DigitalClock';
import TimeClock from '../TimeClock';
import { PickerPopper } from '../pickerInternals';
import usePickerState from '../pickerInternals/usePickerState';
import { DEFAULT_TIME_FORMAT } from '../pickerInternals/constants';

const TimePickerRoot = styled('div', {
  name: 'UiTimePicker',
  slot: 'Root',
})({
  display: 'inline-flex',
  position: 'relative',
});

const TimePicker = React.forwardRef(function TimePicker(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiTimePicker' });
  const {
    value: valueProp,
    defaultValue,
    onChange,
    onAccept,
    format = DEFAULT_TIME_FORMAT,
    label,
    placeholder,
    size = 'medium',
    disabled = false,
    readOnly = false,
    error = false,
    fullWidth = false,
    minTime,
    maxTime,
    timeStep = 30,
    clockType = 'digital',
    ampm = false,
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

  const handleTimeSelect = React.useCallback(
    (newValue) => {
      handleChange(newValue, { shouldClose: clockType === 'digital' });
    },
    [handleChange, clockType],
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
    <TimePickerRoot ref={ref} sx={fullWidth ? { width: '100%' } : undefined} {...other}>
      <div ref={anchorRef} style={fullWidth ? { width: '100%' } : undefined}>
        <TimeField
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
        {clockType === 'digital' ? (
          <DigitalClock
            value={value}
            onChange={handleTimeSelect}
            timeStep={timeStep}
            minTime={minTime}
            maxTime={maxTime}
            format={format}
            {...slotProps.clock}
          />
        ) : (
          <TimeClock
            value={value}
            onChange={handleTimeSelect}
            ampm={ampm}
            {...slotProps.clock}
          />
        )}
      </PickerPopper>
    </TimePickerRoot>
  );
});

TimePicker.propTypes = {
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
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  timeStep: PropTypes.number,
  clockType: PropTypes.oneOf(['digital', 'analog']),
  ampm: PropTypes.bool,
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
    clock: PropTypes.object,
  }),
};

export default TimePicker;
