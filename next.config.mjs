/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["tw", "en"],
    defaultLocale: "tw",
    localeDetection: false,
    domains: [
      {
        domain: "example.en",
        defaultLocale: "en",
      },
      {
        domain: "example.com",
        defaultLocale: "tw",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
