const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  ...nextTranslate({
    reactStrictMode: true,
    webpack: (config) => config,
  }),
};

module.exports = nextConfig;
