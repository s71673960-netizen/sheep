import React from 'react';
import Box from '@ui/components/Box';

export default function PropsTable({ data }) {
  const cellSx = {
    px: 2,
    py: 1.5,
    fontSize: '0.875rem',
    borderBottom: 1,
    borderColor: 'divider',
  };

  return (
    <Box
      role="region"
      aria-label="组件属性"
      tabIndex={0}
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
      }}
    >
      <Box
        component="table"
        sx={{
          width: '100%',
          minWidth: 640,
          borderCollapse: 'collapse',
          '& th, & td': cellSx,
          '& th': {
            textAlign: 'left',
            fontWeight: 500,
            color: 'text.secondary',
            bgcolor: 'background.soft',
          },
        }}
      >
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name}>
              <td>
                <Box component="code" sx={{ color: 'primary.main', fontSize: '0.8rem' }}>
                  {row.name}
                </Box>
              </td>
              <td>{row.description}</td>
              <td>
                <Box component="code" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                  {row.type}
                </Box>
              </td>
              <td>
                <Box component="code" sx={{ fontSize: '0.75rem' }}>
                  {row.default || '-'}
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}
