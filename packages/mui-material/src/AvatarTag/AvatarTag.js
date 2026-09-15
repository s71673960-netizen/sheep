'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Avatar from '../Avatar';
import { getAvatarTagUtilityClass } from './avatarTagClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, size } = ownerState;

  const slots = {
    root: ['root', `size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    avatar: ['avatar'],
    name: ['name'],
  };

  return composeClasses(slots, getAvatarTagUtilityClass, classes);
};

const AvatarTagRoot = styled('span', {
  name: 'MuiAvatarTag',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.root,
      styles[`size${ownerState.size.charAt(0).toUpperCase() + ownerState.size.slice(1)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    borderRadius: 100,
    gap: 4,
    variants: [
      {
        props: { size: 'medium' },
        style: {
          height: 28,
          padding: '2px 6px 2px 2px',
          background: (theme.vars || theme).palette.background.soft,
        },
      },
      {
        props: { size: 'small' },
        style: {
          height: 20,
          padding: '2px',
          background: (theme.vars || theme).palette.background.subtle,
        },
      },
    ],
  })),
);

const AvatarTagAvatar = styled(Avatar, {
  name: 'MuiAvatarTag',
  slot: 'Avatar',
})({
  variants: [
    {
      props: { size: 'medium' },
      style: {
        width: 24,
        height: 24,
        fontSize: 12,
      },
    },
    {
      props: { size: 'small' },
      style: {
        width: 16,
        height: 16,
        fontSize: 10,
      },
    },
  ],
});

const AvatarTagName = styled('span', {
  name: 'MuiAvatarTag',
  slot: 'Name',
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.primary,
    lineHeight: 1.15,
    whiteSpace: 'nowrap',
    variants: [
      {
        props: { size: 'medium' },
        style: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.005em',
        },
      },
      {
        props: { size: 'small' },
        style: {
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: '0.01em',
        },
      },
    ],
  })),
);

const AvatarTag = React.forwardRef(function AvatarTag(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiAvatarTag' });
  const {
    className,
    src,
    alt,
    name,
    size = 'medium',
    sx,
    onClick,
    ...other
  } = props;

  const ownerState = { ...props, size };
  const classes = useUtilityClasses(ownerState);

  return (
    <AvatarTagRoot
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      onClick={onClick}
      sx={sx}
      {...other}
    >
      <AvatarTagAvatar
        src={src}
        alt={alt || name}
        className={classes.avatar}
        ownerState={ownerState}
      />
      {name && (
        <AvatarTagName className={classes.name} ownerState={ownerState}>
          {name}
        </AvatarTagName>
      )}
    </AvatarTagRoot>
  );
});

AvatarTag.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object,
  name: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  src: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default AvatarTag;
