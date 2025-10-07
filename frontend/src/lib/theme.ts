// src/lib/theme.ts
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string
      secondary: string
      success: string
    }
    custom: {
      white: string
      black: string
      grey50: string
      grey100: string
      grey200: string
      grey300: string
      grey400: string
      grey500: string
      grey600: string
      grey700: string
      grey800: string
      grey900: string
    }
  }
  interface PaletteOptions {
    gradient?: {
      primary?: string
      secondary?: string
      success?: string
    }
    custom?: {
      white?: string
      black?: string
      grey50?: string
      grey100?: string
      grey200?: string
      grey300?: string
      grey400?: string
      grey500?: string
      grey600?: string
      grey700?: string
      grey800?: string
      grey900?: string
    }
  }

  interface TypographyVariants {
    display: React.CSSProperties
    title: React.CSSProperties
    subtitle: React.CSSProperties
    body: React.CSSProperties
    caption: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    display?: React.CSSProperties
    title?: React.CSSProperties
    subtitle?: React.CSSProperties
    body?: React.CSSProperties
    caption?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true
    title: true
    subtitle: true
    body: true
    caption: true
    h3: false
    h4: false
    h5: false
    h6: false
    subtitle1: false
    subtitle2: false
    body1: false
    body2: false
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true
    soft: true
  }
}

// Color palette
const colors = {
  // Primary brand colors
  primary: {
    50: '#f0f9f0',
    100: '#dcf2dc',
    200: '#bce4bc',
    300: '#88d088',
    400: '#5cba5c',
    500: '#219653', // Main brand color
    600: '#1a7e43',
    700: '#166538',
    800: '#14532d',
    900: '#104523',
  },
  // Neutral colors
  grey: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  // Semantic colors
  success: {
    main: '#10b981',
    light: '#d1fae5',
    dark: '#047857',
  },
  warning: {
    main: '#f59e0b',
    light: '#fef3c7',
    dark: '#d97706',
  },
  error: {
    main: '#ef4444',
    light: '#fee2e2',
    dark: '#dc2626',
  },
  info: {
    main: '#3b82f6',
    light: '#dbeafe',
    dark: '#1d4ed8',
  },
}

const theme = createTheme({
  // Color system
  palette: {
    primary: {
      main: colors.primary[500],
      light: colors.primary[400],
      dark: colors.primary[600],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.grey[700],
      light: colors.grey[500],
      dark: colors.grey[900],
      contrastText: '#ffffff',
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
    },
    background: {
      default: colors.grey[50],
      paper: '#ffffff',
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
      disabled: colors.grey[400],
    },
    divider: colors.grey[200],
    // Custom colors
    gradient: {
      primary: 'linear-gradient(135deg, #219653 0%, #1a7e43 100%)',
      secondary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    custom: {
      white: '#ffffff',
      black: '#000000',
      grey50: colors.grey[50],
      grey100: colors.grey[100],
      grey200: colors.grey[200],
      grey300: colors.grey[300],
      grey400: colors.grey[400],
      grey500: colors.grey[500],
      grey600: colors.grey[600],
      grey700: colors.grey[700],
      grey800: colors.grey[800],
      grey900: colors.grey[900],
    },
  },

  // Typography system
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    
    // Custom typography scale
    display: {
      fontSize: '3.5rem', // 56px
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h1: {
      fontSize: '3rem', // 48px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem', // 36px
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.875rem', // 30px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    title: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.5,
      color: colors.grey[600],
    },
    body: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.5,
      color: colors.grey[500],
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },

  // Spacing system (8px base)
  spacing: 8,

  // Border radius system
  shape: {
    borderRadius: 12,
  },

  // Component customizations
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariantNumeric: 'tabular-nums',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    
    MuiButton: {
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 14px 0 rgba(33, 150, 83, 0.3)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 20px rgba(33, 150, 83, 0.4)',
              background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
        },
        {
          props: { variant: 'soft' },
          style: {
            backgroundColor: colors.primary[50],
            color: colors.primary[700],
            border: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: colors.primary[100],
              boxShadow: '0 2px 8px rgba(33, 150, 83, 0.1)',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          transition: 'all 0.2s ease-in-out',
          '&:focus-visible': {
            outline: `2px solid ${colors.primary[200]}`,
            outlineOffset: '2px',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: colors.primary[50],
          },
        },
        sizeSmall: {
          padding: '8px 16px',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1rem',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
        elevation3: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: colors.grey[900],
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${colors.grey[200]}`,
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.06)',
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: colors.primary[50],
            color: colors.primary[700],
            '&:hover': {
              backgroundColor: colors.primary[100],
            },
          },
          '&:hover': {
            backgroundColor: colors.grey[100],
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${colors.grey[200]}`,
          overflow: 'hidden',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.grey[400],
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary[500],
              borderWidth: '2px',
            },
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        filled: {
          '&.MuiChip-colorPrimary': {
            backgroundColor: colors.primary[50],
            color: colors.primary[700],
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: colors.success.light,
            color: colors.success.dark,
          },
          '&.MuiChip-colorError': {
            backgroundColor: colors.error.light,
            color: colors.error.dark,
          },
        },
      },
    },
  },

  // Breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
})

// Extended theme for dark mode
export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    primary: theme.palette.primary,
    background: {
      default: colors.grey[900],
      paper: colors.grey[800],
    },
    text: {
      primary: colors.grey[50],
      secondary: colors.grey[300],
      disabled: colors.grey[500],
    },
    divider: colors.grey[700],
    gradient: theme.palette.gradient,
    custom: theme.palette.custom,
  },
})

export default theme