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
  webpack(config, { isServer }) {
    // 禁用 Webpack 缓存
    config.cache = false;

    // 如果你希望更具体的缓存配置，可以使用以下配置
    // config.cache = {
    //   type: 'filesystem',
    //   buildDependencies: {
    //     config: [__filename],
    //   },
    // };

    return config;
  },
};

export default nextConfig;
