import {createTheme} from '@mui/material'
import {red} from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#5D50CB',
    },
    secondary: {
      // main: '#543884',
      main: '#F85E9F',
    },
    gradient: {
      main: 'linear-gradient(#5D50CB, #F85E9F)',
    },
    yellow: {
      main: '#FACD49',
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
      main: '#191825',
    },
    black75: {
      main: 'rgba(25, 24, 37, 0.75)',
    },
    black50: {
      main: 'rgba(25, 24, 37, 0.5)',
    },
    black25: {
      main: 'rgba(25, 24, 37, 0.25)',
    },
    black10: {
      main: 'rgba(25, 24, 37, 0.1)',
    },
    black5: {
      main: 'rgba(25, 24, 37, 0.05)',
    },
    light: {
      main: '#fff',
    },
    error: {
      main: red.A400,
    },
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
