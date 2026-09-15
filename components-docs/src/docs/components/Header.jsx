import React, { useContext } from 'react';
import Box from '@ui/components/Box';
import Button from '@ui/components/Button';
import IconButton from '@ui/components/IconButton';
import Switch from '@ui/components/Switch';
import Typography from '@ui/components/Typography';
import MenuIcon from '@ui/components/icons/Menu';
import { ThemeContext } from '../App';

export default function Header({ onMenuOpen }) {
  const { mode, toggle } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1.5, sm: 3 },
        py: 1.5,
        minHeight: 56,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, gap: 1 }}>
        <IconButton
          aria-label="打开组件导航"
          onClick={onMenuOpen}
          sx={{ display: { xs: 'inline-flex', md: 'none' }, flexShrink: 0 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle2" color="text.secondary" noWrap>
          UI Components
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
        <Button
          component="a"
          href="https://github.com/s71673960-netizen/sheep"
          target="_blank"
          rel="noreferrer"
          variant="text"
          size="small"
          sx={{ minWidth: 0, px: { xs: 1, sm: 1.5 }, color: 'text.secondary' }}
        >
          GitHub
        </Button>
        <Switch
          checked={mode === 'dark'}
          onChange={toggle}
          size="small"
          slotProps={{ input: { 'aria-label': '切换深色模式' } }}
        />
      </Box>
    </Box>
  );
}
