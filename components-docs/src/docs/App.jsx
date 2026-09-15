import React, { useState, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@ui/components/styles';
import CssBaseline from '@ui/components/CssBaseline';
import { lightTheme, darkTheme } from './theme';
import DocLayout from './components/DocLayout';

export const ThemeContext = React.createContext({
  mode: 'dark',
  toggle: () => {},
});

export default function App() {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <DocLayout />
        </HashRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
