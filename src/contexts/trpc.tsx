/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import React, { useRef } from 'react'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { HTTPHeaders, createTRPCReact } from '@trpc/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs'
import superjson from 'superjson'

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@server/trpc/router/_app'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>()

type TRPCProviderProps = {
  children: React.ReactNode,
}

export const TRPCProvider: React.FC<TRPCProviderProps> = ({ children }) => {
  // Kinde Auth
  const { getToken } = useKindeAuth()

  const authTokenRef = useRef<string>('')
  authTokenRef.current = process.env.NEXT_PUBLIC_AUTH_PROVIDER === 'kinde' ? getToken() : ''

  // Query Client
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }))

  // TRPC Client
  const [trpcClient] = React.useState(() => trpc.createClient({
    /**
       * Transformer used for data de-serialization from the server.
       *
       * @see https://trpc.io/docs/data-transformers
       */
    transformer: superjson,

    /**
       * Links used to determine request flow from client to server.
       *
       * @see https://trpc.io/docs/links
       */
    links: [
      loggerLink({
        enabled: opts => process.env.NODE_ENV === 'development'
            || (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        async headers() {
          return {
            Authorization: `Bearer ${authTokenRef.current}`,
          } as HTTPHeaders
        },
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
  }))

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>
