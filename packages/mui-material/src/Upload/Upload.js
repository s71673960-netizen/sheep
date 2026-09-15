'use client';
import * as React from 'react';
import Box from '../Box';
import { fileToObject, updateFileList, removeFileFromList, attrAccept, getUid } from './utils';
import defaultUpload from './request';
import UploadList from './UploadList';

const Upload = React.forwardRef(function Upload(props, ref) {
  const {
    accept,
    action,
    beforeUpload,
    customRequest,
    defaultFileList,
    fileList: fileListProp,
    disabled = false,
    directory = false,
    multiple = false,
    maxCount,
    listType = 'text',
    name: fileName = 'file',
    headers,
    data,
    method = 'post',
    withCredentials = false,
    showUploadList = true,
    block = false,
    onChange,
    onRemove,
    onPreview,
    onDrop,
    children,
    sx,
    ...other
  } = props;

  const isControlled = fileListProp !== undefined;
  const [internalFileList, setInternalFileList] = React.useState(defaultFileList || []);
  const fileList = isControlled ? fileListProp : internalFileList;

  const inputRef = React.useRef(null);
  const requestsRef = React.useRef({});

  const mergedFileList = React.useMemo(
    () => fileList.map((f) => ({ ...f, uid: f.uid || getUid() })),
    [fileList],
  );

  const triggerChange = React.useCallback(
    (info) => {
      if (!isControlled) {
        setInternalFileList(info.fileList);
      }
      onChange?.(info);
    },
    [isControlled, onChange],
  );

  const doUpload = React.useCallback(
    (file, currentFileList) => {
      const uploadFn = customRequest || defaultUpload;

      const resolvedAction = typeof action === 'function' ? action(file.originFileObj) : Promise.resolve(action);
      const resolvedData = typeof data === 'function' ? data(file.originFileObj) : data;

      Promise.resolve(resolvedAction).then((resolvedUrl) => {
        const req = uploadFn({
          action: resolvedUrl || '',
          file: file.originFileObj,
          filename: fileName,
          headers,
          data: resolvedData,
          method,
          withCredentials,
          onProgress: (e) => {
            const updatedFile = { ...file, percent: e.percent, status: 'uploading' };
            const updatedList = updateFileList(updatedFile, currentFileList);
            triggerChange({ file: updatedFile, fileList: updatedList, event: e });
            currentFileList = updatedList;
          },
          onSuccess: (response) => {
            const updatedFile = { ...file, status: 'done', response, percent: 100 };
            const updatedList = updateFileList(updatedFile, currentFileList);
            triggerChange({ file: updatedFile, fileList: updatedList });
            currentFileList = updatedList;
            delete requestsRef.current[file.uid];
          },
          onError: (error) => {
            const updatedFile = { ...file, status: 'error', error, response: error };
            const updatedList = updateFileList(updatedFile, currentFileList);
            triggerChange({ file: updatedFile, fileList: updatedList });
            currentFileList = updatedList;
            delete requestsRef.current[file.uid];
          },
        });

        requestsRef.current[file.uid] = req;
      });
    },
    [action, customRequest, data, fileName, headers, method, triggerChange, withCredentials],
  );

  const processFile = React.useCallback(
    (rawFile, rawFileList) => {
      const file = fileToObject(rawFile);

      if (maxCount && mergedFileList.length >= maxCount) {
        if (maxCount === 1) {
          // Replace current file
        } else {
          return;
        }
      }

      let currentFileList;
      if (maxCount === 1) {
        currentFileList = [file];
      } else {
        currentFileList = [...mergedFileList, file];
      }

      triggerChange({ file, fileList: currentFileList });

      if (!beforeUpload) {
        doUpload(file, currentFileList);
        return;
      }

      const result = beforeUpload(rawFile, rawFileList);

      if (result === false) {
        return;
      }

      if (result && typeof result.then === 'function') {
        result
          .then((processedFile) => {
            if (processedFile === false) return;
            const actualFile =
              processedFile instanceof File
                ? { ...file, originFileObj: processedFile, name: processedFile.name }
                : file;
            const updatedList = updateFileList(actualFile, currentFileList);
            triggerChange({ file: actualFile, fileList: updatedList });
            doUpload(actualFile, updatedList);
          })
          .catch(() => {
            const updatedFile = { ...file, status: 'error' };
            const updatedList = updateFileList(updatedFile, currentFileList);
            triggerChange({ file: updatedFile, fileList: updatedList });
          });
      } else {
        doUpload(file, currentFileList);
      }
    },
    [beforeUpload, doUpload, maxCount, mergedFileList, triggerChange],
  );

  const handleFileChange = React.useCallback(
    (e) => {
      const files = Array.from(e.target.files || []);
      const accepted = files.filter((f) => attrAccept(f, accept));
      accepted.forEach((rawFile) => processFile(rawFile, accepted));
      // Reset input so selecting same file triggers change
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [accept, processFile],
  );

  const handleRemove = React.useCallback(
    (file) => {
      const doRemove = () => {
        const req = requestsRef.current[file.uid];
        if (req) {
          req.abort();
          delete requestsRef.current[file.uid];
        }
        const updatedList = removeFileFromList(file, mergedFileList);
        const removedFile = { ...file, status: 'removed' };
        triggerChange({ file: removedFile, fileList: updatedList });
      };

      if (!onRemove) {
        doRemove();
        return;
      }

      const result = onRemove(file);
      if (result === false) return;
      if (result && typeof result.then === 'function') {
        result.then((res) => {
          if (res !== false) doRemove();
        });
      } else {
        doRemove();
      }
    },
    [mergedFileList, onRemove, triggerChange],
  );

  const handleTriggerClick = React.useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const handleDrop = React.useCallback(
    (e) => {
      e.preventDefault();
      if (disabled) return;
      onDrop?.(e);
      const files = Array.from(e.dataTransfer.files || []);
      const accepted = files.filter((f) => attrAccept(f, accept));
      accepted.forEach((rawFile) => processFile(rawFile, accepted));
    },
    [accept, disabled, onDrop, processFile],
  );

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      Object.values(requestsRef.current).forEach((req) => req?.abort?.());
    };
  }, []);

  const isPictureCard = listType === 'picture-card' || listType === 'picture-circle';

  const inputElement = (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={handleFileChange}
      style={{ display: 'none' }}
      {...(directory ? { directory: '', webkitdirectory: '' } : {})}
    />
  );

  return (
    <Box ref={ref} sx={sx} {...other}>
      {inputElement}
      {!isPictureCard && children && (
        <Box
          onClick={handleTriggerClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          sx={{ display: block ? 'block' : 'inline-block', cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          {children}
        </Box>
      )}
      <UploadList
        fileList={mergedFileList}
        listType={listType}
        showUploadList={showUploadList}
        onRemove={handleRemove}
        onPreview={onPreview}
        disabled={disabled}
        maxCount={maxCount}
        onTriggerClick={handleTriggerClick}
      />
    </Box>
  );
});

export default Upload;
