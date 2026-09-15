'use client';
import * as React from 'react';
import AnimatedSelectionGroup from '../internal/AnimatedSelectionGroup';

/**
 * OutlinedTabs — 圆角描边风格 Tab 切换（带滑动动画）
 *
 * Props:
 *   value: string          — 当前选中值（受控）
 *   defaultValue: string   — 默认值（非受控）
 *   onChange: (value) => void
 *   options: Array<{ value: string, label: string, disabled?: boolean }>
 *   size: 'small' | 'medium' (default 'medium')
 */
const OutlinedTabs = React.forwardRef(function OutlinedTabs(props, ref) {
  return (
    <AnimatedSelectionGroup
      ref={ref}
      itemAttribute="data-outlined-tab"
      getContainerSx={({ isSmall }) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: isSmall ? '4px 0' : '8px 0',
        gap: isSmall ? '6px' : '8px',
        isolation: 'isolate',
      })}
      getIndicatorSx={({ isSmall }) => ({
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        height: isSmall ? 28 : 32,
        borderRadius: '50px',
        backgroundColor: 'primary.main',
        border: '1px solid',
        borderColor: 'primary.main',
        transition:
          'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      })}
      getOptionSx={({ isSmall, option, selected }) => ({
        boxSizing: 'border-box',
        height: isSmall ? 28 : 32,
        borderRadius: '50px',
        border: '1px solid',
        borderColor: selected ? 'transparent' : 'divider',
        backgroundColor: 'transparent',
        px: isSmall ? '12px' : '16px',
        fontSize: isSmall ? 12 : 14,
        fontWeight: 600,
        letterSpacing: '0.01em',
        lineHeight: '115%',
        color: option.disabled
          ? 'text.disabled'
          : selected
            ? 'primary.contrastText'
            : 'text.secondary',
        transition: 'color 0.25s ease, border-color 0.25s ease',
        '&:hover': option.disabled || selected ? {} : { borderColor: 'primary.main' },
      })}
      {...props}
    />
  );
});

export default OutlinedTabs;
