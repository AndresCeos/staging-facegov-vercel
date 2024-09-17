/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    MEDIA_URL: process.env.MEDIA_URL,
  },
};

module.exports = nextConfig;
