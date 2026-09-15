import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@ui/components/Box';
import Drawer from '@ui/components/Drawer';
import IconButton from '@ui/components/IconButton';
import TextField from '@ui/components/TextField';
import Typography from '@ui/components/Typography';
import InputAdornment from '@ui/components/InputAdornment';
import Scrollbar from '@ui/components/Scrollbar';
import CloseIcon from '@ui/components/icons/Close';
import SearchIcon from '@ui/components/icons/Search';
import { categories } from '../data/navigation';

const sidebarWidth = 260;

export default function Sidebar({ mobileOpen = false, onMobileClose }) {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query) return categories;
    const q = query.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        children: cat.children.filter(
          (item) => item.label.toLowerCase().includes(q) || item.key.includes(q),
        ),
      }))
      .filter((cat) => cat.children.length > 0);
  }, [query]);

  const sidebarContent = (mobile = false) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', minHeight: 0 }}>
      <Box sx={{ p: 2, pb: 1 }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography variant="h5" sx={{ minWidth: 0, fontWeight: 700 }}>
            UI Components
          </Typography>
          {mobile && (
            <IconButton aria-label="关闭组件导航" onClick={onMobileClose} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <TextField
          size="small"
          placeholder="搜索组件..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{
            '& .MuiInputBase-root': {
              height: 32,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#0F1011' : 'transparent',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#454545' : theme.palette.divider,
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#454545' : theme.palette.primary.main,
            },
            '& .MuiInputBase-input::placeholder, & .MuiInputAdornment-root, & .MuiSvgIcon-root': {
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#898E98' : theme.palette.text.secondary,
              opacity: 1,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Scrollbar sx={{ flex: 1, minHeight: 0, overflowY: 'auto', px: 2, pb: 2, pt: 1 }}>
        <Box
          onClick={() => {
            navigate('/');
            onMobileClose?.();
          }}
          sx={{
            mb: 2,
            py: 1,
            px: 1.5,
            borderRadius: 1,
            cursor: 'pointer',
            bgcolor: location.pathname === '/' ? 'action.selected' : 'transparent',
            '&:hover': { bgcolor: 'action.hover' },
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: '0.85rem', fontWeight: location.pathname === '/' ? 600 : 400 }}
          >
            组件总览
          </Typography>
        </Box>
        {filtered.map((cat) => (
          <Box key={cat.key} sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                py: 0.75,
                color: 'text.secondary',
                fontWeight: 500,
                fontSize: '0.8rem',
                borderBottom: (theme) =>
                  theme.palette.mode === 'dark' ? 'none' : '1px solid',
                borderColor: 'divider',
                mb: 0.5,
              }}
            >
              {cat.label}
            </Typography>
            {cat.children.map((item) => {
              const selected = location.pathname === item.path;
              return (
                <Box
                  key={item.key}
                  onClick={() => {
                    navigate(item.path);
                    onMobileClose?.();
                  }}
                  sx={{
                    py: 1,
                    px: 1.5,
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    bgcolor: (theme) =>
                      selected
                        ? theme.palette.mode === 'dark'
                          ? '#1B1B1B'
                          : theme.palette.action.selected
                        : 'transparent',
                    '&:hover': {
                      bgcolor: (theme) =>
                        selected
                          ? theme.palette.mode === 'dark'
                            ? '#1B1B1B'
                            : theme.palette.action.selected
                          : theme.palette.action.hover,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.85rem',
                      fontWeight: selected ? 600 : 400,
                      color: (theme) =>
                        selected || theme.palette.mode === 'light'
                          ? theme.palette.text.primary
                          : '#898E98',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ))}
      </Scrollbar>
    </Box>
  );

  return (
    <>
      <Box
        component="aside"
        sx={{
          width: sidebarWidth,
          height: '100dvh',
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.drawer,
          top: 0,
          left: 0,
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#151617' : theme.palette.background.subtle,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
        }}
      >
        {sidebarContent()}
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.56)' },
          },
          paper: {
            sx: {
              width: 'min(86vw, 320px)',
              maxWidth: '100%',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#151617' : theme.palette.background.subtle,
            },
          },
        }}
      >
        {sidebarContent(true)}
      </Drawer>
    </>
  );
}
