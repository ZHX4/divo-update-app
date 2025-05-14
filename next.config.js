const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  exportPathMap: async function (defaultPathMap) {

    delete defaultPathMap['/notification-test'];
    delete defaultPathMap['/ar/notification-test'];
    delete defaultPathMap['/fr/notification-test'];
    return defaultPathMap;
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}

module.exports = nextConfig;