"use client";
import {ChakraProvider, ColorModeScript, useColorMode} from '@chakra-ui/react'
import theme from '../utils/theme'

export default function App({Component, pageProps}) {
    return (
        <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Component {...pageProps}/>
        </ChakraProvider>
    )
}