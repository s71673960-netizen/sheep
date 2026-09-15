'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import DateTimeRangeField from '../DateTimeRangeField';
import DateRangeCalendar from '../DateRangeCalendar';
import DigitalClock from '../DigitalClock';
import Typography from '../Typography';
import { PickerPopper } from '../pickerInternals';
import usePickerState from '../pickerInternals/usePickerState';
import { DEFAULT_DATETIME_FORMAT } from '../pickerInternals/constants';
import { dayjs } from '../pickerInternals/dateUtils';
import { defaultLocale } from '../pickerInternals/pickerLocale';

const DateTimeRangePickerRoot = styled('div', {
  name: 'UiDateTimeRangePicker',
  slot: 'Root',
})({
  display: 'inline-flex',
  position: 'relative',
});

const DateTimeRangePickerContent = styled('div', {
  name: 'UiDateTimeRangePicker',
  slot: 'Content',
})({
  display: 'flex',
  flexDirection: 'column',
});

const DateTimeRangePickerTimeRow = styled('div', {
  name: 'UiDateTimeRangePicker',
  slot: 'TimeRow',
})({
  display: 'flex',
  borderTop: '1px solid',
  borderColor: 'divider',
  gap: 8,
  padding: 8,
});

const TimePanel = styled('div', {
  name: 'UiDateTimeRangePicker',
  slot: 'TimePanel',
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const DateTimeRangePicker = React.forwardRef(function DateTimeRangePicker(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'UiDateTimeRangePicker' });
  const {
    value: valueProp,
    defaultValue,
    onChange,
    onAccept,
    format = DEFAULT_DATETIME_FORMAT,
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
    calendars = 2,
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

  const handleDateRangeChange = React.useCallback(
    (newDateRange) => {
      const [newStart, newEnd] = newDateRange;
      const start = newStart
        ? newStart.hour(startValue ? dayjs(startValue).hour() : 0).minute(startValue ? dayjs(startValue).minute() : 0)
        : null;
      const end = newEnd
        ? newEnd.hour(endValue ? dayjs(endValue).hour() : 23).minute(endValue ? dayjs(endValue).minute() : 59)
        : null;
      handleChange([start, end], { shouldClose: false });
    },
    [startValue, endValue, handleChange],
  );

  const handleStartTimeChange = React.useCallback(
    (newTime) => {
      const base = startValue ? dayjs(startValue) : dayjs();
      const newStart = base.hour(newTime.hour()).minute(newTime.minute());
      handleChange([newStart, endValue], { shouldClose: false });
    },
    [startValue, endValue, handleChange],
  );

  const handleEndTimeChange = React.useCallback(
    (newTime) => {
      const base = endValue ? dayjs(endValue) : dayjs();
      const newEnd = base.hour(newTime.hour()).minute(newTime.minute());
      handleChange([startValue, newEnd], { shouldClose: true });
    },
    [startValue, endValue, handleChange],
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
    <DateTimeRangePickerRoot ref={ref} sx={fullWidth ? { width: '100%' } : undefined} {...other}>
      <div ref={anchorRef} style={fullWidth ? { width: '100%' } : undefined}>
        <DateTimeRangeField
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
        <DateTimeRangePickerContent>
          <DateRangeCalendar
            value={[startValue, endValue]}
            onChange={handleDateRangeChange}
            calendars={calendars}
            minDate={minDate}
            maxDate={maxDate}
            disablePast={disablePast}
            disableFuture={disableFuture}
            shouldDisableDate={shouldDisableDate}
            locale={locale}
          />
          <DateTimeRangePickerTimeRow>
            <TimePanel>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                {locale.startTime}
              </Typography>
              <DigitalClock
                value={startValue}
                onChange={handleStartTimeChange}
                timeStep={timeStep}
                minTime={minTime}
                maxTime={maxTime}
              />
            </TimePanel>
            <TimePanel>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                {locale.endTime}
              </Typography>
              <DigitalClock
                value={endValue}
                onChange={handleEndTimeChange}
                timeStep={timeStep}
                minTime={minTime}
                maxTime={maxTime}
              />
            </TimePanel>
          </DateTimeRangePickerTimeRow>
        </DateTimeRangePickerContent>
      </PickerPopper>
    </DateTimeRangePickerRoot>
  );
});

DateTimeRangePicker.propTypes = {
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
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  calendars: PropTypes.oneOf([1, 2, 3]),
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

export default DateTimeRangePicker;
