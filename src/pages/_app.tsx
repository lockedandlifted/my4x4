import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/provider'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import theme from '@utils/theme'
import { trpc } from '@utils/trpc'

import { ImageKitContextProvider } from '@contexts/imageKit'

import '@uppy/core/dist/style.min.css'
import '@uppy/drag-drop/dist/style.min.css'
import '@uppy/file-input/dist/style.min.css'
import '@uppy/progress-bar/dist/style.min.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <ChakraProvider theme={theme}>
      <ImageKitContextProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ImageKitContextProvider>
      <Toaster />
    </ChakraProvider>
  </SessionProvider>
)

export default trpc.withTRPC(MyApp)
