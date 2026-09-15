'use client';

function getError(action, xhr) {
  const msg = `cannot ${xhr.responseText ? 'upload' : 'connect'} ${action} (${xhr.status})`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) return text;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export default function upload(options) {
  const {
    action,
    data,
    file,
    filename = 'file',
    headers = {},
    method = 'post',
    onError,
    onProgress,
    onSuccess,
    withCredentials = false,
  } = options;

  const xhr = new XMLHttpRequest();

  if (onProgress && xhr.upload) {
    xhr.upload.onprogress = (e) => {
      if (e.total > 0) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress({ percent }, file);
      }
    };
  }

  const formData = new FormData();

  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });
  }

  formData.append(filename, file);

  xhr.onerror = () => {
    onError?.(getError(action, xhr), getBody(xhr));
  };

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      onError?.(getError(action, xhr), getBody(xhr));
      return;
    }
    onSuccess?.(getBody(xhr), xhr);
  };

  xhr.open(method, action, true);

  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  Object.keys(headers).forEach((h) => {
    if (headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  });

  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
}
