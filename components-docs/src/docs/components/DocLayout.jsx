import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@ui/components/Box';
import CircularProgress from '@ui/components/CircularProgress';
import Sidebar from './Sidebar';
import Header from './Header';
import TableOfContents from './TableOfContents';
import { routes } from '../routes';

export default function DocLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', minWidth: 0 }}>
      <Sidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />
      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, md: '260px' },
          width: { xs: '100%', md: 'calc(100% - 260px)' },
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header onMenuOpen={() => setMobileNavOpen(true)} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flex: 1,
            width: '100%',
            minWidth: 0,
            px: { xs: 2, sm: 3, lg: 4 },
            py: { xs: 2, sm: 3 },
            gap: 3,
          }}
        >
          <Box
            id="doc-content"
            sx={{
              flex: 1,
              width: '100%',
              maxWidth: 900,
              minWidth: 0,
              overflowWrap: 'anywhere',
              '& h4': { fontSize: { xs: '1.75rem', sm: '2.125rem' }, lineHeight: 1.25 },
              '& h5': { fontSize: { xs: '1.25rem', sm: '1.5rem' }, lineHeight: 1.35 },
            }}
          >
            <Suspense fallback={<CircularProgress sx={{ mt: 8, mx: 'auto', display: 'block' }} />}>
              <Routes>
                {routes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
              </Routes>
            </Suspense>
          </Box>
          <TableOfContents />
        </Box>
      </Box>
    </Box>
  );
}
