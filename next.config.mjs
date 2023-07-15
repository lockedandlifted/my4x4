// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import { withSuperjson } from 'next-superjson'

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=60, stale-while-revalidate=3600',
          },
        ],
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: { esmExternals: true },
  images: {
    domains: ['ik.imagekit.io'],
  },
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

export default withSuperjson()(config)
