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
          '& .MuiInputLabel-root': {
            color: 'var(--text-secondary)',
          },

          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--accent-orange)',
          },

          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'var(--input-bg)',
            color: 'var(--text)',

            '& fieldset': {
              borderColor: 'var(--input-border)',
            },

            '&:hover fieldset': {
              borderColor: 'var(--input-border-hover)',
            },

            '&.Mui-focused fieldset': {
              borderColor: 'var(--accent-orange)',
            },

            '& .MuiSelect-icon': {
              color: 'var(--text)',
            },
          },

          '& input': {
            color: 'var(--text)',
          },
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: 'chip' },
          style: {
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            fontWeight: 500,
            borderRadius: '8px',
            '& .MuiChip-label': { color: 'var(--text)' },
          }
        },
        {
          props: { variant: 'chipActive' },
          style: {
            backgroundColor: 'var(--accent-orange)',
            color: 'var(--btn-primary-text)',
            fontWeight: 600,
            borderRadius: '8px',
            '& .MuiChip-label': { color: 'var(--btn-primary-text)' },
          }
        }
      ],
      styleOverrides: {
        root: {
          fontWeight: 500,
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--input-bg)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--input-border)',
          borderRadius: '8px',
          transition: 'all 0.15s ease',

          '&:hover': {
            backgroundColor: 'var(--input-border-hover)',
          },

          '&.Mui-selected': {
            backgroundColor: 'var(--accent-orange)',
            color: 'var(--btn-primary-text)',
            borderColor: 'var(--accent-orange)',
            '&:hover': {
              backgroundColor: 'var(--accent-orange-dark)',
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: 'var(--card-bg)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px var(--shadow-md)',
          border: '1px solid var(--border)',
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--card-bg)',
          color: 'var(--text)',
          fontWeight: 500,
          fontSize: '0.9rem',

          '&.Mui-selected': {
            backgroundColor: 'var(--accent-orange-bg-light)',
            color: 'var(--text)',
          },

          '&.Mui-selected:hover': {
            backgroundColor: 'var(--accent-orange-bg-light)',
          },

          '&:hover': {
            backgroundColor: 'var(--tile-bg)',
            color: 'var(--text)',
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: 'var(--text)',
          backgroundColor: 'var(--input-bg)',
        },
        icon: {
          color: 'var(--text)',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'var(--text-secondary)',
        },
        shrink: {
          color: 'var(--accent-orange)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: 'var(--input-bg)',
          color: 'var(--text)',

          '& fieldset': {
            borderColor: 'var(--input-border)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--input-border-hover)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--accent-orange)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'var(--text)',
        },
      },
    },
  },
});

export default theme;
