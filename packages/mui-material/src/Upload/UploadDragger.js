'use client';
import * as React from 'react';
import Box from '../Box';
import Typography from '../Typography';
import CloudUploadIcon from '../icons/CloudUpload';
import { alpha } from '../styles';
import Upload from './Upload';

const UploadDragger = React.forwardRef(function UploadDragger(props, ref) {
  const { children, disabled, hint, sx, ...uploadProps } = props;
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    setIsDragOver(false);
  };

  const draggerContent = children || (
    <Box sx={{ textAlign: 'center', py: 6, px: 3 }}>
      <CloudUploadIcon sx={{ fontSize: 48, color: 'text.tertiary', mb: 2 }} />
      <Typography variant="body1" sx={{ color: 'text.tertiary' }}>
        将文件拖在此处，或{' '}
        <Typography component="span" sx={{ color: 'success.main', fontWeight: 600, cursor: 'pointer' }}>
          点击上传
        </Typography>
      </Typography>
    </Box>
  );

  return (
    <Upload
      ref={ref}
      disabled={disabled}
      block
      onDrop={(...args) => {
        handleDrop(args[0]);
        uploadProps.onDrop?.(...args);
      }}
      {...uploadProps}
    >
      <Box
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        sx={(theme) => ({
          border: '1px dashed',
          borderColor: isDragOver ? 'primary.main' : 'divider',
          borderRadius: `${theme.shape.borderRadius * 3}px`,
          bgcolor: isDragOver
            ? alpha(theme.palette.primary.main, 0.04)
            : theme.palette.background.soft || theme.palette.background.default,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'border-color 200ms, background-color 200ms',
          '&:hover': disabled
            ? {}
            : {
                borderColor: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.04),
              },
          ...sx,
        })}
      >
        {draggerContent}
      </Box>
      {hint && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, display: 'block' }}>
          {hint}
        </Typography>
      )}
    </Upload>
  );
});

export default UploadDragger;
