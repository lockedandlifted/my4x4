import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  cssVarPrefix: 'my4x4',
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    heading: '"Dosis", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
})

export default theme
