import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/provider'
import { Toaster } from 'react-hot-toast'
import { IKContext } from 'imagekitio-react'

import theme from '@utils/theme'

import { trpc } from '@utils/trpc'

import '@uppy/core/dist/style.min.css'
import '@uppy/drag-drop/dist/style.min.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <ChakraProvider theme={theme}>
      <IKContext urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL}>
        <Component {...pageProps} />
      </IKContext>
      <Toaster />
    </ChakraProvider>
  </SessionProvider>
)

export default trpc.withTRPC(MyApp)
