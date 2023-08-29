// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { withSuperjson } from 'next-superjson'
import nextBuildId from 'next-build-id'
import { withHighlightConfig } from '@highlight-run/next'

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import("next").NextConfig} */
const config = {
  async redirects() {
    return [
      {
        source: '/users/login',
        destination: '/api/auth/login',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/sitemap.txt',
        destination: '/api/sitemap',
      },
    ]
  },
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true,
    instrumentationHook: true,
  },
  images: {
    domains: ['ik.imagekit.io'],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withHighlightConfig(withSuperjson()(config))
