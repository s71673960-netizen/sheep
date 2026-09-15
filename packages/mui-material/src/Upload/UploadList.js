'use client';
import * as React from 'react';
import Box from '../Box';
import Typography from '../Typography';
import IconButton from '../IconButton';
import LinearProgress from '../LinearProgress';
import DeleteIcon from '../icons/Delete';
import PreviewIcon from '../icons/Preview';
import FiletypeIcon from '../icons/Filetype';
import CheckIcon from '../icons/Check';
import ErrorCircleIcon from '../icons/ErrorCircle';
import AddIcon from '../icons/Add';
import { alpha } from '../styles';
import { isImageUrl, getFileUrl } from './utils';

function UploadListItem({ file, listType, onRemove, onPreview }) {
  const isImg = isImageUrl(file);
  const thumbUrl = isImg ? getFileUrl(file) : '';
  const isError = file.status === 'error';
  const isDone = file.status === 'done';
  const isUploading = file.status === 'uploading';

  if (listType === 'picture-card' || listType === 'picture-circle') {
    const isCircle = listType === 'picture-circle';
    return (
      <Box
        sx={(theme) => ({
          position: 'relative',
          width: 104,
          height: 104,
          borderRadius: isCircle ? '50%' : `${theme.shape.borderRadius * 2}px`,
          border: '1px solid',
          borderColor: isError ? 'error.main' : 'divider',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          '&:hover .upload-list-actions': { opacity: 1 },
        })}
      >
        {isImg && thumbUrl ? (
          <Box
            component="img"
            src={thumbUrl}
            alt={file.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box sx={{ textAlign: 'center', px: 1 }}>
            <FiletypeIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
            <Typography variant="caption" noWrap sx={{ display: 'block', maxWidth: 80 }}>
              {file.name}
            </Typography>
          </Box>
        )}
        {isUploading && (
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, px: 1, pb: 0.5 }}>
            <LinearProgress variant="determinate" value={file.percent || 0} sx={{ height: 2 }} />
          </Box>
        )}
        <Box
          className="upload-list-actions"
          sx={(theme) => ({
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            bgcolor: alpha(theme.palette.common.black, 0.45),
            opacity: 0,
            transition: 'opacity 200ms',
          })}
        >
          {onPreview && (
            <IconButton size="small" onClick={() => onPreview(file)} sx={{ color: '#fff' }}>
              <PreviewIcon fontSize="small" />
            </IconButton>
          )}
          {onRemove && (
            <IconButton size="small" onClick={() => onRemove(file)} sx={{ color: '#fff' }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    );
  }

  // text / picture list type
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1,
        px: 1.5,
        borderRadius: `${theme.shape.borderRadius}px`,
        transition: 'background-color 200ms',
        '&:hover': { bgcolor: 'action.hover' },
      })}
    >
      {listType === 'picture' && isImg && thumbUrl ? (
        <Box
          component="img"
          src={thumbUrl}
          alt={file.name}
          sx={(theme) => ({
            width: 40,
            height: 40,
            objectFit: 'cover',
            borderRadius: `${theme.shape.borderRadius}px`,
            border: '1px solid',
            borderColor: 'divider',
          })}
        />
      ) : (
        <FiletypeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          noWrap
          sx={{ color: isError ? 'error.main' : 'text.primary' }}
        >
          {file.name}
        </Typography>
        {isUploading && (
          <LinearProgress
            variant="determinate"
            value={file.percent || 0}
            sx={{ mt: 0.5, height: 2 }}
          />
        )}
      </Box>
      {isDone && <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />}
      {isError && <ErrorCircleIcon sx={{ fontSize: 16, color: 'error.main' }} />}
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {onPreview && isDone && (
          <IconButton size="small" onClick={() => onPreview(file)}>
            <PreviewIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
        {onRemove && (
          <IconButton
            size="small"
            onClick={() => onRemove(file)}
            sx={{ '&:hover': { color: 'error.main' } }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

function PictureCardButton({ onClick, disabled, isCircle }) {
  return (
    <Box
      onClick={disabled ? undefined : onClick}
      sx={(theme) => ({
        width: 104,
        height: 104,
        borderRadius: isCircle ? '50%' : `${theme.shape.borderRadius * 2}px`,
        border: '1px dashed',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'border-color 200ms, background-color 200ms',
        '&:hover': disabled
          ? {}
          : {
              borderColor: 'primary.main',
              bgcolor: (t) => alpha(t.palette.primary.main, 0.04),
            },
      })}
    >
      <AddIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
        上传
      </Typography>
    </Box>
  );
}

const UploadList = React.forwardRef(function UploadList(props, ref) {
  const { fileList = [], listType = 'text', showUploadList = true, onRemove, onPreview, disabled, maxCount, onTriggerClick } = props;

  if (!showUploadList && listType !== 'picture-card' && listType !== 'picture-circle') {
    return null;
  }

  const isPictureCard = listType === 'picture-card' || listType === 'picture-circle';
  const isCircle = listType === 'picture-circle';
  const showButton = isPictureCard && (!maxCount || fileList.length < maxCount);

  if (isPictureCard) {
    return (
      <Box ref={ref} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
        {fileList.map((file) => (
          <UploadListItem
            key={file.uid}
            file={file}
            listType={listType}
            onRemove={onRemove}
            onPreview={onPreview}
          />
        ))}
        {showButton && (
          <PictureCardButton onClick={onTriggerClick} disabled={disabled} isCircle={isCircle} />
        )}
      </Box>
    );
  }

  if (!showUploadList || fileList.length === 0) return null;

  return (
    <Box ref={ref} sx={{ mt: 1 }}>
      {fileList.map((file) => (
        <UploadListItem
          key={file.uid}
          file={file}
          listType={listType}
          onRemove={onRemove}
          onPreview={onPreview}
        />
      ))}
    </Box>
  );
});

export default UploadList;
