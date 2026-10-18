import {getContrastRatio} from '@mui/material/styles'
import {lightTheme} from './lightTheme'

const {palette} = lightTheme

test.each(['#FFFFFF', '#F1F5F9', '#EEF2F7', '#FCFDFE', '#E2EAF3'])('el texto principal y secundario mantienen contraste en %s', (background) => {
  for (const color of [palette.text.primary, palette.text.secondary, palette.black50.main, palette.secondary.main]) {
    expect(getContrastRatio(color, background)).toBeGreaterThanOrEqual(4.5)
  }
})

test('las acciones, mensajes de error y bordes de campos son distinguibles', () => {
  expect(getContrastRatio(palette.primary.contrastText, palette.primary.main)).toBeGreaterThanOrEqual(4.5)
  expect(getContrastRatio(palette.secondary.contrastText, palette.secondary.main)).toBeGreaterThanOrEqual(4.5)
  expect(getContrastRatio(palette.error.main, palette.background.paper)).toBeGreaterThanOrEqual(4.5)
  const outline = lightTheme.components.MuiOutlinedInput.styleOverrides.root['& .MuiOutlinedInput-notchedOutline'].borderColor
  expect(getContrastRatio(outline, palette.background.paper)).toBeGreaterThanOrEqual(3)
})
