'use client';
import * as React from 'react';
import Box from '../Box';
import Typography from '../Typography';
import Button from '../Button';
import Avatar from '../Avatar';
import IclawIcon from '../icons/Iclaw';
import { alpha } from '../styles';

function getInitials(name) {
  if (!name) return '';
  return name.slice(0, 2);
}

/**
 * ProductionCalendar
 *
 * 支持受控和非受控两种模式：
 *
 * 非受控模式：
 *   - defaultCalendar: 初始数据
 *   - 组件内部管理 days 状态，toggle 时自动重算 productionCount/restCount
 *   - onConfirm(calendar) 回调携带完整当前状态
 *
 * 受控模式（父组件管理状态时使用）：
 *   - calendar: 受控 prop
 *   - onToggle(dayId, triggerId): 父组件负责更新状态
 *   - onConfirm(): 父组件自行决定提交内容
 */
const ProductionCalendar = React.forwardRef(function ProductionCalendar(props, ref) {
  const {
    calendar: calendarProp,
    defaultCalendar,
    executor,
    avatar,
    loading = false,
    onToggle,
    onConfirm,
    actions,
    footerText,
    footerLinkText,
    onFooterLink,
    ...other
  } = props;

  // 非受控模式的内部状态
  const [internalCalendar, setInternalCalendar] = React.useState(defaultCalendar ?? null);

  const isControlled = calendarProp !== undefined;
  const calendar = isControlled ? calendarProp : internalCalendar;

  // defaultCalendar 变化时同步内部状态
  const prevDefaultJson = React.useRef(JSON.stringify(defaultCalendar));
  React.useEffect(() => {
    if (isControlled) return;
    const json = JSON.stringify(defaultCalendar);
    if (json !== prevDefaultJson.current) {
      prevDefaultJson.current = json;
      setInternalCalendar(defaultCalendar ?? null);
    }
  }, [defaultCalendar, isControlled]);

  const calendarDays = React.useMemo(
    () =>
      (calendar?.days ?? []).map((item, idx) => {
        if (item.length === 4) {
          const [id, date, weekday, isProduction] = item;
          return { id, date, weekday, isProduction };
        }
        const [date, weekday, isProduction] = item;
        return { id: idx + 1, date, weekday, isProduction };
      }),
    [calendar],
  );

  // 暴露 getCalendar() 给父组件（用于外部直接读取最终状态）
  React.useImperativeHandle(ref, () => ({
    getCalendar: () => calendar,
  }));

  // ── 拖拽框选 ──────────────────────────────────────────────────────────
  const isDragging = React.useRef(false);
  const dragTargetState = React.useRef(false);
  const touched = React.useRef(new Set());

  function toggleDay(day) {
    if (!isControlled) {
      // 非受控模式下切换日期并同步重算数量
      setInternalCalendar((prev) => {
        const newDays = (prev?.days ?? []).map((d) =>
          d[0] === day.id ? [d[0], d[1], d[2], !d[3]] : d,
        );
        return {
          days: newDays,
          productionCount: newDays.filter((d) => d[3]).length,
          restCount: newDays.filter((d) => !d[3]).length,
        };
      });
    }
    onToggle?.(day.id, `calendar_day_${day.id}`);
  }

  function startDrag(day) {
    isDragging.current = true;
    dragTargetState.current = !day.isProduction;
    touched.current.clear();
    touched.current.add(day.id);
    toggleDay(day);
  }

  function onEnter(day) {
    if (!isDragging.current) return;
    if (touched.current.has(day.id)) return;
    if (day.isProduction !== dragTargetState.current) {
      touched.current.add(day.id);
      toggleDay(day);
    }
  }

  function endDrag() {
    isDragging.current = false;
    touched.current.clear();
  }

  function handleConfirm() {
    // 携带完整的当前状态回传
    onConfirm?.(calendar);
  }

  return (
    <Box
      ref={isControlled ? ref : undefined}
      sx={{
        borderRadius: '20px',
        bgcolor: 'background.paper',
        p: 5,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 12px 32px rgba(0,0,0,0.28)'
            : '0 12px 24px rgba(0,0,0,0.04)',
      }}
      {...other}
    >
      {/* Header：头像胶囊 + 描述文字同一行 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        {executor && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'background.soft',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 100,
              py: 0.25,
              pl: 0.25,
              pr: 1,
              gap: 0.75,
              flexShrink: 0,
            }}
          >
            {avatar || (
              <Avatar sx={{ width: 22, height: 22, fontSize: 10, flexShrink: 0 }}>
                {getInitials(executor.name)}
              </Avatar>
            )}
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {executor.name}
            </Typography>
          </Box>
        )}
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {calendar?.title || '请选择日期'}，共
          <Box component="span" sx={{ fontWeight: 600, mx: 0.25 }}>
            {calendar?.productionCount}
          </Box>
          个启用项、
          <Box component="span" sx={{ fontWeight: 600, mx: 0.25 }}>
            {calendar?.restCount}
          </Box>
          个停用项
        </Typography>
      </Box>

      {/* 日历格子 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          userSelect: 'none',
          mb: 4,
        }}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        {calendarDays.map((day) => (
          <Box
            key={day.id}
            sx={(theme) => ({
              minHeight: 64,
              borderRadius: '12px',
              py: 1,
              px: 1,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'dark' || !day.isProduction
                  ? 'transparent'
                  : theme.palette.divider,
              bgcolor: day.isProduction
                ? theme.palette.background.soft
                : theme.palette.background.default,
              cursor: 'pointer',
              transition: 'all 200ms ease-in-out',
              '&:hover': {
                transform: 'translateY(-1px)',
                borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.divider,
                bgcolor: theme.palette.background.soft,
              },
            })}
            onMouseDown={(e) => {
              e.preventDefault();
              startDrag(day);
            }}
            onMouseEnter={() => onEnter(day)}
            onClick={(e) => e.preventDefault()}
          >
            <Typography
              variant="overline"
              sx={{ color: day.isProduction ? 'text.primary' : 'text.disabled' }}
            >
              {day.weekday}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: day.isProduction ? 'text.primary' : 'text.disabled' }}
            >
              {day.date}
            </Typography>
            <Typography
              variant="overline"
              sx={{ color: day.isProduction ? 'success.main' : 'warning.main' }}
            >
              {day.isProduction ? '启用' : '停用'}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Actions */}
      {actions || (
        <React.Fragment>
          <Button
            variant="contained"
            color="success"
            loading={loading}
            onClick={handleConfirm}
            sx={{
              height: 32,
              borderRadius: '6px',
              mb: 3,
              bgcolor: 'success.main',
              color: 'success.contrastText',
              '&:hover': { bgcolor: 'success.dark' },
            }}
          >
            确认选择
          </Button>

          {(footerText || footerLinkText) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IclawIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="overline" sx={{ color: 'text.primary' }}>
                {footerText || '有其他疑问？'}
              </Typography>
              {footerLinkText && (
                <Typography
                  variant="overline"
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                  onClick={onFooterLink}
                >
                  {footerLinkText}
                </Typography>
              )}
            </Box>
          )}
        </React.Fragment>
      )}
    </Box>
  );
});

export default ProductionCalendar;
