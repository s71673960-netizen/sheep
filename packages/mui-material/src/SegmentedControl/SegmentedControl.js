'use client';
import * as React from 'react';
import AnimatedSelectionGroup from '../internal/AnimatedSelectionGroup';

/**
 * SegmentedControl — 方角分段选择器（带滑动动画）
 *
 * Props:
 *   value: string          — 当前选中值（受控）
 *   defaultValue: string   — 默认值（非受控）
 *   onChange: (value) => void
 *   options: Array<{ value: string, label: string, disabled?: boolean }>
 *   size: 'small' | 'medium' (default 'medium')
 *   sx: object             — 容器样式覆盖
 */
const SegmentedControl = React.forwardRef(function SegmentedControl(props, ref) {
  return (
    <AnimatedSelectionGroup
      ref={ref}
      itemAttribute="data-segment-item"
      getContainerSx={() => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        bgcolor: 'background.subtle',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        p: '1px 2px',
        gap: '4px',
      })}
      getIndicatorSx={() => ({
        position: 'absolute',
        top: '1px',
        height: 'calc(100% - 2px)',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '6px',
        transition:
          'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      })}
      getOptionSx={({ isSmall, option, selected }) => ({
        px: isSmall ? '8px' : '12px',
        py: isSmall ? '5px' : '6px',
        fontSize: 14,
        lineHeight: '16px',
        borderRadius: '8px',
        color: option.disabled ? 'text.disabled' : selected ? 'text.primary' : 'text.secondary',
        transition: 'color 0.2s ease',
        '&:hover': option.disabled || selected ? {} : { color: 'text.primary' },
      })}
      {...props}
    />
  );
});

export default SegmentedControl;
