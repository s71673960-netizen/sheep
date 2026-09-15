'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import TimeRangeField from '../TimeRangeField';
import DigitalClock from '../DigitalClock';
import Typography from '../Typography';
import { PickerPopper } from '../pickerInternals';
import usePickerState from '../pickerInternals/usePickerState';
import { DEFAULT_TIME_FORMAT } from '../pickerInternals/constants';
import { defaultLocale } from '../pickerInternals/pickerLocale';

const TimeRangePickerRoot = styled('div', {
  name: 'UiTimeRangePicker',
  slot: 'Root',
})({
  display: 'inline-flex',
  position: 'relative',
});

const TimeRangePickerContent = styled('div', {
  name: 'UiTimeRangePicker',
  slot: 'Content',
})({
  display: 'flex',
  gap: 8,
  padding: '8px',
});

const TimeRangePickerPanel = styled('div', {
  name: 'UiTimeRangePicker',
  slot: 'Panel',
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const TimePicker = React.forwardRef(function TimeRangePicker(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiTimeRangePicker' });
  const {
    value: valueProp,
    defaultValue,
    onChange,
    onAccept,
    format = DEFAULT_TIME_FORMAT,
    size = 'medium',
    disabled = false,
    readOnly = false,
    error = false,
    fullWidth = false,
    minTime,
    maxTime,
    timeStep = 30,
    open: openProp,
    onOpen,
    onClose,
    locale = defaultLocale,
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

  const [startValue, endValue] = value || [null, null];

  const handleStartChange = React.useCallback(
    (newStart) => {
      const newValue = [newStart, endValue];
      handleChange(newValue, { shouldClose: false });
    },
    [endValue, handleChange],
  );

  const handleEndChange = React.useCallback(
    (newEnd) => {
      const newValue = [startValue, newEnd];
      handleChange(newValue, { shouldClose: true });
    },
    [startValue, handleChange],
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
    <TimeRangePickerRoot ref={ref} sx={fullWidth ? { width: '100%' } : undefined} {...other}>
      <div ref={anchorRef} style={fullWidth ? { width: '100%' } : undefined}>
        <TimeRangeField
          value={value}
          onChange={handleFieldChange}
          format={format}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
          fullWidth={fullWidth}
          onIconClick={handleIconClick}
          locale={locale}
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
        <TimeRangePickerContent>
          <TimeRangePickerPanel>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
              {locale.startTime}
            </Typography>
            <DigitalClock
              value={startValue}
              onChange={handleStartChange}
              timeStep={timeStep}
              minTime={minTime}
              maxTime={maxTime}
              format={format}
            />
          </TimeRangePickerPanel>
          <TimeRangePickerPanel>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
              {locale.endTime}
            </Typography>
            <DigitalClock
              value={endValue}
              onChange={handleEndChange}
              timeStep={timeStep}
              minTime={minTime}
              maxTime={maxTime}
              format={format}
            />
          </TimeRangePickerPanel>
        </TimeRangePickerContent>
      </PickerPopper>
    </TimeRangePickerRoot>
  );
});

TimePicker.propTypes = {
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
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  timeStep: PropTypes.number,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  locale: PropTypes.object,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  slotProps: PropTypes.shape({
    field: PropTypes.object,
    popper: PropTypes.object,
  }),
};

export default TimePicker;
