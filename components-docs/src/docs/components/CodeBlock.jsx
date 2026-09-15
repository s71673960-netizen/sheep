import React from 'react';
import Box from '@ui/components/Box';

export default function CodeBlock({ code }) {
  return (
    <Box
      component="pre"
      sx={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 1,
        fontSize: '0.8rem',
        lineHeight: 1.6,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        boxSizing: 'border-box',
        m: 0,
        bgcolor: 'background.subtle',
        color: 'text.primary',
      }}
    >
      <code>{code?.trim()}</code>
    </Box>
  );
}
