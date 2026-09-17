import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#17634b', dark: '#153e32' },
    background: { default: '#f3f5f1', paper: '#ffffff' },
    text: { primary: '#223c35', secondary: '#61776b' },
    divider: '#d9e2db',
    error: { main: '#a63838' },
    success: { main: '#17634b' },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, "Noto Sans JP", sans-serif',
    fontSize: 14,
    h4: { fontSize: '1.6rem', fontWeight: 700 },
    h5: { fontSize: '1.3125rem', fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 9 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { minHeight: 44, padding: '10px 16px' } },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { rounded: { borderRadius: 15 } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#ffffff' },
        notchedOutline: { borderColor: '#becfc3' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { padding: '13px 12px', borderBottom: '1px solid #e5ebe5', whiteSpace: 'nowrap' },
        head: { fontSize: 12, fontWeight: 600, color: '#65796d' },
      },
    },
    MuiCssBaseline: {
      styleOverrides: { ':focus-visible': { outline: '3px solid #deaf50', outlineOffset: 2 } },
    },
  },
});
