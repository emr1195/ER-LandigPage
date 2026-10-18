import {createTheme} from '@mui/material'

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#102A43',
      light: '#334E68',
      dark: '#082032',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#806015',
      contrastText: '#FFFFFF',
    },
    gradient: {
      main: 'linear-gradient(#102A43, #806015)',
    },
    yellow: {
      main: '#D4A93A',
    },
    orange: {
      main: '#FF5722',
    },
    blue: {
      main: '#072357',
    },
    red: {
      main: '#DA121A',
    },
    black: {
      main: '#102A43',
    },
    black75: {
      main: '#334E68',
    },
    black50: {
      main: '#486581',
    },
    black25: {
      main: '#8295AB',
    },
    black10: {
      main: '#D9E2EC',
    },
    black5: {
      main: '#E2E8F0',
    },
    light: {
      main: '#fff',
    },
    error: {
      main: '#B42318',
    },
    success: {main: '#216E39'},
    warning: {main: '#8A5B0A'},
    info: {main: '#0369A1'},
    text: {primary: '#102A43', secondary: '#486581'},
    background: {default: '#F1F5F9', paper: '#FFFFFF'},
    divider: '#CBD5E1',
    action: {hover: '#EEF2F7', selected: '#E2EAF3', focus: '#D9E2EC', disabled: '#64748B', disabledBackground: '#E2E8F0'},
  },

  components: {
    MuiCssBaseline: {styleOverrides: {
      ':root': {colorScheme: 'light'},
      '::selection': {background: '#DCE6F0', color: '#102A43'},
      ':where(a, button, input, textarea, select, [tabindex]):focus-visible': {outline: '3px solid #102A43', outlineOffset: '3px'},
    }},
    MuiPaper: {styleOverrides: {root: {backgroundImage: 'none'}}},
    MuiMenu: {styleOverrides: {paper: {border: '1px solid #D9E2EC', boxShadow: '0 8px 24px rgba(15,23,42,0.12)'}}},
    MuiDialog: {styleOverrides: {paper: {border: '1px solid #D9E2EC', boxShadow: '0 16px 48px rgba(15,23,42,0.18)'}}},
    MuiCard: {styleOverrides: {root: {border: '1px solid #D9E2EC', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)'}}},
    MuiOutlinedInput: {styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        '& .MuiOutlinedInput-notchedOutline': {borderColor: '#7B8FA5'},
        '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: '#486581'},
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#102A43', borderWidth: 2},
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {borderColor: '#B42318'},
      },
      input: {'&::placeholder': {color: '#64748B', opacity: 1}},
    }},
    MuiInputLabel: {styleOverrides: {root: {color: '#486581'}}},
    MuiFormHelperText: {styleOverrides: {root: {color: '#486581'}}},
    MuiButton: {styleOverrides: {root: {fontWeight: 600}, outlined: {borderColor: '#7B8FA5'}}},
    MuiButtonBase: {styleOverrides: {root: {'&.Mui-focusVisible': {outline: '2px solid #102A43', outlineOffset: 3, boxShadow: '0 0 0 2px #FFFFFF'}}}},
    MuiLink: {styleOverrides: {root: {textUnderlineOffset: '3px'}}},
    MuiListItemButton: {styleOverrides: {root: {
      borderLeft: '3px solid transparent',
      '&.Mui-selected': {backgroundColor: '#E2EAF3', color: '#102A43', borderLeftColor: '#806015', '& .MuiListItemText-primary': {fontWeight: 700}},
      '&.Mui-selected:hover': {backgroundColor: '#D6E2EF'},
    }}},
  },

  fonts: {
    size: {
      h1: '69px',
      h2: '55px',
      h3: '44px',
      h4: '35px',
      h5: '28px',
      h6: '23px',
      body: '18px',
      button: '14px',
      caption: '12px',
    },
    lineHeight: {
      h1: '120%',
      h2: '120%',
      h3: '120%',
      h4: '120%',
      h5: '120%',
      h6: '120%',
      body: '160%',
      button: '120%',
      caption: '120%',
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      specialTablet: 775,
      md: 900,
      lg: 1200,
      xl: 1536,
      laptop: 1150, //usually 1024
      tablet: 720, //usually 640
      lgMobile: 460, //personalizado
    },
  },
})
