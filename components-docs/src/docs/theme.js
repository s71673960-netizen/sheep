import { createTheme } from '@ui/components/styles';

const componentOverrides = {
  MuiButtonBase: {
    defaultProps: { disableRipple: true, disableTouchRipple: true },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
  },
  MuiSnackbarContent: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
      },
    },
  },
  UiDateRangeField: {
    styleOverrides: {
      input: ({ theme }) => ({
        '&::placeholder': {
          color: (theme.vars || theme).palette.text.hint,
          opacity: 1,
        },
      }),
      separator: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.hint,
      }),
    },
  },
  UiTimeRangeField: {
    styleOverrides: {
      input: ({ theme }) => ({
        '&::placeholder': {
          color: (theme.vars || theme).palette.text.hint,
          opacity: 1,
        },
      }),
      separator: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.hint,
      }),
    },
  },
};

export const lightTheme = createTheme({
  palette: { mode: 'light' },
  components: componentOverrides,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0F1011',
      paper: '#151515',
      subtle: '#151617',
      soft: '#1B1B1B',
    },
    divider: '#454545',
    text: {
      primary: '#F5F7FA',
      secondary: '#898E98',
      tertiary: '#898E98',
      disabled: '#5F636B',
      hint: '#898E98',
    },
    action: {
      active: '#C6CAD2',
      hover: '#1B1B1B',
      selected: '#1B1B1B',
      disabled: '#5F636B',
      disabledBackground: '#2A2A2A',
      focus: '#252627',
    },
  },
  components: {
    ...componentOverrides,
    MuiCssBaseline: {
      styleOverrides: {
        '.component-import': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: 'fit-content',
          maxWidth: '100%',
          minHeight: '35px',
          padding: '10px 12px',
          columnGap: '4px',
          borderRadius: '8px',
          backgroundColor: '#1B1B1B',
          color: '#898E98',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '15px',
          boxSizing: 'border-box',
          '& code': {
            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            overflowWrap: 'anywhere',
          },
          '& .component-import-code': {
            display: 'inline',
          },
          '& .component-import-keyword': {
            color: '#E879C7',
          },
          '& .component-import-value': {
            color: '#F1B37A',
          },
        },
        '.component-import + .MuiDivider-root': {
          borderColor: 'transparent',
        },
      },
    },
  },
});
