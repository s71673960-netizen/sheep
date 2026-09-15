import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import localeData from 'dayjs/plugin/localeData.js';
import weekday from 'dayjs/plugin/weekday.js';
import 'dayjs/locale/zh-cn.js';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.locale('zh-cn');

export { dayjs };

export function formatDate(date, format) {
  if (!date) return '';
  return dayjs(date).format(format);
}

export function parseDate(str, format) {
  if (!str) return null;
  const parsed = dayjs(str, format, true);
  return parsed.isValid() ? parsed : null;
}

export function isValidDate(date) {
  return date != null && dayjs(date).isValid();
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return dayjs(a).isSame(dayjs(b), 'day');
}

export function isSameMonth(a, b) {
  if (!a || !b) return false;
  return dayjs(a).isSame(dayjs(b), 'month');
}

export function isBefore(a, b, unit = 'day') {
  return dayjs(a).isBefore(dayjs(b), unit);
}

export function isAfter(a, b, unit = 'day') {
  return dayjs(a).isAfter(dayjs(b), unit);
}

export function isDateBetween(date, start, end) {
  if (!date || !start || !end) return false;
  return dayjs(date).isBetween(dayjs(start), dayjs(end), 'day', '[]');
}

export function startOfMonth(date) {
  return dayjs(date).startOf('month');
}

export function endOfMonth(date) {
  return dayjs(date).endOf('month');
}

export function getDaysInMonth(date) {
  return dayjs(date).daysInMonth();
}

export function addMonths(date, amount) {
  return dayjs(date).add(amount, 'month');
}

export function addYears(date, amount) {
  return dayjs(date).add(amount, 'year');
}

export function getWeekArray(date) {
  const start = dayjs(date).startOf('month').startOf('week');
  const end = dayjs(date).endOf('month').endOf('week');
  const weeks = [];
  let current = start;

  while (current.isBefore(end) || current.isSame(end, 'day')) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(current);
      current = current.add(1, 'day');
    }
    weeks.push(week);
  }
  return weeks;
}

export function getYearsRange(minDate, maxDate) {
  const min = minDate ? dayjs(minDate).year() : dayjs().year() - 100;
  const max = maxDate ? dayjs(maxDate).year() : dayjs().year() + 100;
  const years = [];
  for (let y = min; y <= max; y++) {
    years.push(y);
  }
  return years;
}

export function isDateDisabled(date, { minDate, maxDate, disablePast, disableFuture, shouldDisableDate }) {
  if (!date) return false;
  const d = dayjs(date);
  const today = dayjs().startOf('day');

  if (disablePast && d.isBefore(today, 'day')) return true;
  if (disableFuture && d.isAfter(today, 'day')) return true;
  if (minDate && d.isBefore(dayjs(minDate), 'day')) return true;
  if (maxDate && d.isAfter(dayjs(maxDate), 'day')) return true;
  if (shouldDisableDate && shouldDisableDate(d)) return true;
  return false;
}

export function isTimeDisabled(date, { minTime, maxTime }) {
  if (!date || (!minTime && !maxTime)) return false;
  const d = dayjs(date);
  const timeValue = d.hour() * 60 + d.minute();

  if (minTime) {
    const min = dayjs(minTime);
    const minValue = min.hour() * 60 + min.minute();
    if (timeValue < minValue) return true;
  }
  if (maxTime) {
    const max = dayjs(maxTime);
    const maxValue = max.hour() * 60 + max.minute();
    if (timeValue > maxValue) return true;
  }
  return false;
}
