'use client';
import * as React from 'react';
import Box from '../Box';

const AnimatedSelectionGroup = React.forwardRef(function AnimatedSelectionGroup(props, ref) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    options = [],
    size = 'medium',
    sx,
    itemAttribute,
    getContainerSx,
    getIndicatorSx,
    getOptionSx,
    ...other
  } = props;

  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? options[0]?.value ?? null,
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const isSmall = size === 'small';

  const containerRef = React.useRef(null);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 });

  const updateIndicator = React.useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const items = containerRef.current.querySelectorAll(`[${itemAttribute}]`);
    const activeIndex = options.findIndex((option) => option.value === value);
    const activeItem = items[activeIndex];

    if (activeItem) {
      setIndicator({ left: activeItem.offsetLeft, width: activeItem.offsetWidth });
    }
  }, [itemAttribute, options, value]);

  React.useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  React.useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(updateIndicator);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [updateIndicator]);

  const handleClick = (optionValue) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  return (
    <Box
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      sx={{
        ...getContainerSx({ isSmall }),
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          position: 'absolute',
          left: indicator.left,
          width: indicator.width,
          pointerEvents: 'none',
          ...getIndicatorSx({ isSmall }),
        }}
      />
      {options.map((option) => {
        const selected = option.value === value;
        const itemProps = { [itemAttribute]: '' };

        return (
          <Box
            key={option.value}
            {...itemProps}
            onClick={option.disabled ? undefined : () => handleClick(option.value)}
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: option.disabled ? 'default' : 'pointer',
              userSelect: 'none',
              opacity: option.disabled ? 0.4 : 1,
              ...getOptionSx({ isSmall, option, selected }),
            }}
          >
            {option.label}
          </Box>
        );
      })}
    </Box>
  );
});

export default AnimatedSelectionGroup;
