'use client';
import * as React from 'react';
import AnimatedSelectionGroup from '../internal/AnimatedSelectionGroup';

/**
 * CapsuleTabs — 胶囊风格 Tab 切换（带滑动动画）
 *
 * Props:
 *   value: string          — 当前选中值（受控）
 *   defaultValue: string   — 默认值（非受控）
 *   onChange: (value) => void
 *   options: Array<{ value: string, label: string, disabled?: boolean }>
 *   size: 'small' | 'medium' (default 'medium')
 */
const CapsuleTabs = React.forwardRef(function CapsuleTabs(props, ref) {
  return (
    <AnimatedSelectionGroup
      ref={ref}
      itemAttribute="data-capsule-tab"
      getContainerSx={({ isSmall }) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: isSmall ? '8px 0' : '12px 0',
      })}
      getIndicatorSx={({ isSmall }) => ({
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        height: isSmall ? 22 : 24,
        borderRadius: '50px',
        backgroundColor: 'action.selected',
        border: '1px solid',
        borderColor: 'divider',
        transition:
          'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      })}
      getOptionSx={({ isSmall, option, selected }) => ({
        height: isSmall ? 22 : 24,
        borderRadius: '50px',
        px: '8px',
        py: '4px',
        fontSize: isSmall ? 11 : 12,
        fontWeight: selected ? 600 : 400,
        lineHeight: '16px',
        color: option.disabled ? 'text.disabled' : selected ? 'text.primary' : 'text.tertiary',
        transition: 'color 0.25s ease',
        '&:hover': option.disabled || selected ? {} : { color: 'text.secondary' },
      })}
      {...props}
    />
  );
});

export default CapsuleTabs;
