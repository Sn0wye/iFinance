// @ts-check

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['img.clerk.com']
  }
};

export default config;
