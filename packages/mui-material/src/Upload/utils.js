'use client';

let uid = 0;

export function getUid() {
  uid += 1;
  return `upload-${Date.now()}-${uid}`;
}

export function isImageUrl(file) {
  if (file.type) {
    return file.type.indexOf('image/') === 0;
  }
  const ext = (file.name || '').split('.').pop().toLowerCase();
  return ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg', 'ico', 'avif'].includes(ext);
}

export function getFileUrl(file) {
  if (file.thumbUrl) return file.thumbUrl;
  if (file.url) return file.url;
  if (file.originFileObj) {
    try {
      return URL.createObjectURL(file.originFileObj);
    } catch {
      return '';
    }
  }
  return '';
}

export function getFileIcon(file) {
  if (isImageUrl(file)) return 'image';
  const ext = (file.name || '').split('.').pop().toLowerCase();
  if (['pdf'].includes(ext)) return 'pdf';
  if (['doc', 'docx'].includes(ext)) return 'doc';
  if (['xls', 'xlsx'].includes(ext)) return 'xls';
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'zip';
  return 'file';
}

export function attrAccept(file, acceptedFiles) {
  if (!acceptedFiles || !acceptedFiles.length) return true;
  const acceptList = acceptedFiles.split(',').map((s) => s.trim()).filter(Boolean);
  const fileName = file.name || '';
  const mimeType = file.type || '';
  const baseMimeType = mimeType.split('/')[0];

  return acceptList.some((type) => {
    if (type.startsWith('.')) {
      return fileName.toLowerCase().endsWith(type.toLowerCase());
    }
    if (type.endsWith('/*')) {
      return baseMimeType === type.split('/')[0];
    }
    return mimeType === type;
  });
}

export function fileToObject(file) {
  return {
    uid: file.uid || getUid(),
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    percent: 0,
    status: 'uploading',
    originFileObj: file,
  };
}

export function updateFileList(file, fileList) {
  const next = [...fileList];
  const idx = next.findIndex((f) => f.uid === file.uid);
  if (idx === -1) {
    next.push(file);
  } else {
    next[idx] = file;
  }
  return next;
}

export function removeFileFromList(file, fileList) {
  return fileList.filter((f) => f.uid !== file.uid);
}
