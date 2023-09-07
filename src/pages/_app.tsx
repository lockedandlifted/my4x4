import { ChakraProvider } from '@chakra-ui/provider'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { TrackingHeadScript } from '@phntms/next-gtm'
import { HighlightInit } from '@highlight-run/next/highlight-init'
import { ErrorBoundary } from '@highlight-run/react'
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs'

import type { AppType } from 'next/app'
import type { Session } from 'next-auth'

import theme from '@utils/theme'
import { trpc } from '@utils/trpc'

import { AuthProvider } from '@contexts/auth'
import { ImageKitContextProvider } from '@contexts/imageKit'

import IdentifySessionUser from '@components/IdentifySessionUser'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/drag-drop/dist/style.min.css'
import '@uppy/file-input/dist/style.min.css'
import '@uppy/progress-bar/dist/style.min.css'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || ''
const HIGHLIGHT_PROJECT_ID = process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID || ''

const MyApp: AppType<{ session: Session | null }> = (props) => {
  const {
    Component,
    pageProps: { session, ...pageProps },
    router,
  } = props

  return (
    <AuthProvider session={session}>
      <ChakraProvider theme={theme}>
        <ImageKitContextProvider>
          <TrackingHeadScript id={GA_TRACKING_ID} />
          <HighlightInit
            projectId={HIGHLIGHT_PROJECT_ID}
            tracingOrigins
            networkRecording={{
              enabled: true,
              recordHeadersAndBody: true,
              urlBlocklist: [],
            }}
          />

          <ErrorBoundary>
            <IdentifySessionUser />
            <Component key={router.asPath} {...pageProps} />
          </ErrorBoundary>

          <ReactQueryDevtools initialIsOpen={false} />
        </ImageKitContextProvider>
        <Toaster />
        <Analytics />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default trpc.withTRPC(MyApp)
