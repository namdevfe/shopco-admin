import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    // primary: {
    //   main: '#556cd6'
    // },
    // secondary: {
    //   main: '#19857b'
    // },
    // error: {
    //   main: red.A400
    // }
  }
})

export default theme
