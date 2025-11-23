'use client';

import { createTheme } from '@mui/material/styles';

// Final color system (Gold + Soft Orange)
export const colors = {
  primary: {
    main: '#FF8C42',
    light: '#FFB675',
    dark: '#E67529',
  },
  secondary: {
    main: '#C8A951',
    light: '#E7CF8B',
    dark: '#B0923A',
  },
  gold: {
    base: '#C8A951',
    medium: '#D4B969',
    light: '#E7CF8B',
  },
  neutral: {
    charcoal: '#1A1A1A',
    darkGray: '#2A2A2A',
    lightGray: '#E4E4E4',
    offWhite: '#F6F6F6',
  },
  gradients: {
    orangeToGold: 'linear-gradient(90deg, #FF8C42 0%, #C89A2F 100%)',
    orangeToGoldHover: 'linear-gradient(90deg, #E57A32 0%, #B78A27 100%)',
    goldToAmber: 'linear-gradient(135deg, #C8A951 0%, #D4B969 50%, #E7CF8B 100%)',
    darkOverlay: 'linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(42, 42, 42, 0.85) 100%)',
  },
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
    },
    background: {
      default: '#F6F6F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: colors.neutral.charcoal,
      secondary: colors.neutral.darkGray,
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: colors.gradients.orangeToGold,
          color: '#1A1A1A',
          '&:hover': {
            background: colors.gradients.orangeToGoldHover,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '14px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
        filled: {
          background: colors.gradients.goldToAmber,
          color: colors.neutral.charcoal,
        },
      },
    },
  },
});

export default theme;
