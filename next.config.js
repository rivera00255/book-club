/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.aladin.co.kr",
        port: "",
        pathname: "/product/**",
      },
      {
        protocol: "https",
        hostname: "bookthumb-phinf.pstatic.net",
        port: "",
        pathname: "/cover/**",
      },
      {
        protocol: "http",
        hostname: "image.aladin.co.kr",
        port: "",
        pathname: "/product/**",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
