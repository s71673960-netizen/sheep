'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { keyframes, css, styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Fade from '../Fade';
import { getSpinUtilityClass } from './spinClasses';

const spinRotateKeyframe = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const rotateAnimation =
  typeof spinRotateKeyframe !== 'string'
    ? css`
        animation: ${spinRotateKeyframe} 0.8s linear infinite;
      `
    : null;

const breatheKeyframe = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

const breatheDotKeyframe = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;

const breatheAnimation =
  typeof breatheKeyframe !== 'string'
    ? css`
        animation: ${breatheKeyframe} 2s ease-in-out infinite;
      `
    : null;

const SpinSvg = styled('svg', {
  name: 'MuiSpin',
  slot: 'Svg',
})(
  rotateAnimation || {
    animation: `${spinRotateKeyframe} 0.8s linear infinite`,
  },
);

const WaitingSvg = styled('svg', {
  name: 'MuiSpin',
  slot: 'WaitingSvg',
})({
  display: 'block',
});

const WaitingRing = styled('circle', {
  name: 'MuiSpin',
  slot: 'WaitingRing',
})({
  ...(breatheAnimation || {
    animation: `${breatheKeyframe} 2s ease-in-out infinite`,
  }),
});

const breatheDotAnimation =
  typeof breatheDotKeyframe !== 'string'
    ? css`
        animation: ${breatheDotKeyframe} 2s ease-in-out infinite;
      `
    : null;

const WaitingDot = styled('circle', {
  name: 'MuiSpin',
  slot: 'WaitingDot',
})({
  ...(breatheDotAnimation || {
    animation: `${breatheDotKeyframe} 2s ease-in-out infinite`,
  }),
});

const useUtilityClasses = (ownerState) => {
  const { classes, spinning, nested, fullscreen, size } = ownerState;

  const slots = {
    root: [
      'root',
      spinning && 'spinning',
      nested && 'nested',
      fullscreen && 'fullscreen',
      `size${size.charAt(0).toUpperCase() + size.slice(1)}`,
    ],
    indicator: ['indicator'],
    description: ['description'],
    overlay: ['overlay'],
    content: ['content'],
  };

  return composeClasses(slots, getSpinUtilityClass, classes);
};

const SpinRoot = styled('div', {
  name: 'MuiSpin',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      ownerState.spinning && styles.spinning,
      ownerState.nested && styles.nested,
      ownerState.fullscreen && styles.fullscreen,
      styles[`size${ownerState.size.charAt(0).toUpperCase() + ownerState.size.slice(1)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.spacing(1),
    '--spin-color': (theme.vars || theme).palette.primary.main,
    '--spin-track': (theme.vars || theme).palette.action.disabledBackground,
    '--spin-waiting-dot': (theme.vars || theme).palette.primary.main,
    '--spin-waiting-ring': (theme.vars || theme).palette.primary.light,
    variants: [
      {
        props: { nested: true },
        style: {
          position: 'relative',
          display: 'block',
        },
      },
      {
        props: { fullscreen: true },
        style: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: theme.spacing(1),
          backgroundColor: theme.alpha(
            (theme.vars || theme).palette.background.default,
            theme.palette.mode === 'dark' ? 0.88 : 0.72,
          ),
          zIndex: (theme.vars || theme).zIndex.modal,
        },
      },
    ],
  })),
);

const SpinIndicator = styled('div', {
  name: 'MuiSpin',
  slot: 'Indicator',
})({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SpinDescription = styled('span', {
  name: 'MuiSpin',
  slot: 'Description',
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.primary.main,
    fontSize: theme.typography.pxToRem(14),
    variants: [
      {
        props: { variant: 'waiting' },
        style: {
          color: (theme.vars || theme).palette.primary.main,
        },
      },
    ],
  })),
);

const SpinOverlay = styled('div', {
  name: 'MuiSpin',
  slot: 'Overlay',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 8,
    backgroundColor: theme.alpha(
      (theme.vars || theme).palette.background.paper,
      theme.palette.mode === 'dark' ? 0.88 : 0.72,
    ),
    borderRadius: 'inherit',
    zIndex: 1,
    transition: 'opacity 0.3s',
  })),
);

const SpinContent = styled('div', {
  name: 'MuiSpin',
  slot: 'Content',
})(
  memoTheme(() => ({
    transition: 'opacity 0.3s',
    variants: [
      {
        props: { spinning: true },
        style: {
          opacity: 0.5,
          pointerEvents: 'none',
          userSelect: 'none',
        },
      },
    ],
  })),
);

const sizeMap = {
  small: 16,
  medium: 32,
  large: 44,
};

function useDelayedSpinning(spinning, delay) {
  const [shouldRender, setShouldRender] = React.useState(() => {
    return delay ? false : spinning;
  });

  React.useEffect(() => {
    if (spinning) {
      if (delay) {
        const timer = setTimeout(() => setShouldRender(true), delay);
        return () => clearTimeout(timer);
      }
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
    return undefined;
  }, [spinning, delay]);

  return shouldRender;
}

const Spin = React.forwardRef(function Spin(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSpin' });
  const {
    children,
    className,
    spinning = true,
    size = 'medium',
    variant = 'spin',
    delay,
    description,
    fullscreen = false,
    indicator,
    percent,
    sx,
    ...other
  } = props;

  const delayedSpinning = useDelayedSpinning(spinning, delay);
  const nested = Boolean(children) && !fullscreen;

  const ownerState = {
    ...props,
    spinning: delayedSpinning,
    size,
    variant,
    nested,
    fullscreen,
  };

  const classes = useUtilityClasses(ownerState);

  const progressSize = sizeMap[size] || sizeMap.medium;
  const viewBoxSize = 44;

  let spinnerElement;
  if (indicator) {
    spinnerElement = indicator;
  } else if (variant === 'waiting') {
    const dotRadius = viewBoxSize * 0.25;
    const ringRadius = viewBoxSize * 0.47;
    spinnerElement = (
      <WaitingSvg
        width={progressSize}
        height={progressSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <WaitingRing
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={ringRadius}
          fill="var(--spin-waiting-ring, #E8F4EE)"
          stroke="none"
        />
        <WaitingDot
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={dotRadius}
          fill="var(--spin-waiting-dot, #038247)"
          stroke="none"
        />
      </WaitingSvg>
    );
  } else {
    const thickness = 4;
    const radius = (viewBoxSize - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const arcLength = typeof percent === 'number'
      ? (Math.min(100, Math.max(0, percent)) / 100) * circumference
      : circumference * 0.75;
    spinnerElement = (
      <SpinSvg
        width={progressSize}
        height={progressSize}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          stroke="var(--spin-track, #F2F3F7)"
          strokeWidth={thickness}
        />
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          stroke="var(--spin-color, #4D6C95)"
          strokeWidth={thickness}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${viewBoxSize / 2} ${viewBoxSize / 2})`}
        />
      </SpinSvg>
    );
  }

  const indicatorContent = (
    <React.Fragment>
      <SpinIndicator className={classes.indicator}>{spinnerElement}</SpinIndicator>
      {description && (
        <SpinDescription className={classes.description}>{description}</SpinDescription>
      )}
    </React.Fragment>
  );

  if (nested) {
    return (
      <SpinRoot
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        sx={sx}
        {...other}
      >
        <Fade in={delayedSpinning}>
          <SpinOverlay className={classes.overlay}>{indicatorContent}</SpinOverlay>
        </Fade>
        <SpinContent className={classes.content} ownerState={ownerState}>
          {children}
        </SpinContent>
      </SpinRoot>
    );
  }

  if (fullscreen) {
    if (!delayedSpinning) {
      return null;
    }
    return (
      <SpinRoot
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        sx={sx}
        {...other}
      >
        {indicatorContent}
      </SpinRoot>
    );
  }

  if (!delayedSpinning) {
    return null;
  }

  return (
    <SpinRoot
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      sx={sx}
      {...other}
    >
      {indicatorContent}
    </SpinRoot>
  );
});

Spin.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
  delay: PropTypes.number,
  description: PropTypes.node,
  fullscreen: PropTypes.bool,
  indicator: PropTypes.node,
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  spinning: PropTypes.bool,
  variant: PropTypes.oneOf(['spin', 'waiting']),
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Spin;
