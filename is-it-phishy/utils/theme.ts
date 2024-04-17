"use client"

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import "@fontsource/hanken-grotesk";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/400-italic.css";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config,
  fonts: {
    heading: `'hanken-grotesk', sans-serif`,
    body: `'hanken-grotesk', sans-serif`,
  }
})

export default theme