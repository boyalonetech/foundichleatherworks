/** @type {import('next').NextConfig} */
const nextConfig = {
  // strict mode
  reactStrictMode: false,

  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
