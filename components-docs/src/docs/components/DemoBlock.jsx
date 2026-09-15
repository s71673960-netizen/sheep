import React, { useState } from 'react';
import Box from '@ui/components/Box';
import Typography from '@ui/components/Typography';
import CodeBlock from './CodeBlock';

export default function DemoBlock({ title, description, code, children }) {
  const [showCode, setShowCode] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        mb: { xs: 3, sm: 4 },
        borderRadius: '8px',
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      {title && (
        <Box sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 2.5 }, pb: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
      )}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          p: { xs: 2, sm: 3 },
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          overflowX: 'auto',
          boxSizing: 'border-box',
          WebkitOverflowScrolling: 'touch',
          '& > *': { maxWidth: '100%' },
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          borderTop: (theme) => (theme.palette.mode === 'dark' ? 0 : 1),
          borderColor: 'divider',
          py: 0.75,
        }}
      >
        <Typography
          variant="caption"
          onClick={() => setShowCode(!showCode)}
          sx={{ fontSize: 11, color: 'text.disabled', cursor: 'pointer' }}
        >
          {showCode ? '收起' : '代码'}
        </Typography>
        <Typography
          variant="caption"
          onClick={handleCopy}
          sx={{ fontSize: 11, color: 'text.disabled', cursor: 'pointer' }}
        >
          复制
        </Typography>
      </Box>
      {showCode && (
        <Box
          sx={{
            borderTop: (theme) => (theme.palette.mode === 'dark' ? 0 : 1),
            borderColor: 'divider',
          }}
        >
          <CodeBlock code={code} />
        </Box>
      )}
    </Box>
  );
}
