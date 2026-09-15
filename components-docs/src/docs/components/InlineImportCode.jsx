import React from 'react';

export default function InlineImportCode({ code }) {
  const match = code.trim().match(/^import\s+(.+?)\s+from\s+(['"])(.+)\2;?$/);

  if (!match) {
    return <code className="component-import-code">{code}</code>;
  }

  const [, importedName, quote, source] = match;

  return (
    <code className="component-import-code">
      <span className="component-import-keyword">import</span>{' '}
      <span className="component-import-value">{importedName}</span>{' '}
      <span className="component-import-keyword">from</span>{' '}
      <span className="component-import-value">
        {quote}
        {source}
        {quote}
      </span>
    </code>
  );
}
