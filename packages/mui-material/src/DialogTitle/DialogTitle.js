'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import Typography from '../Typography';
import IconButton from '../IconButton';
import CloseIcon from '../internal/svg-icons/Close';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getDialogTitleUtilityClass } from './dialogTitleClasses';
import DialogContext from '../Dialog/DialogContext';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};

const DialogTitleRoot = styled(Typography, {
  name: 'MuiDialogTitle',
  slot: 'Root',
})({
  padding: '24px 24px 24px',
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const DialogTitle = React.forwardRef(function DialogTitle(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDialogTitle',
  });

  const { className, id: idProp, children, onClose, ...other } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const { titleId = idProp } = React.useContext(DialogContext);

  return (
    <DialogTitleRoot
      component="h2"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      variant="subtitle1"
      id={idProp ?? titleId}
      {...other}
    >
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary', ml: 2 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </DialogTitleRoot>
  );
});

DialogTitle.propTypes /* remove-proptypes */ = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string,
  onClose: PropTypes.func,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default DialogTitle;
