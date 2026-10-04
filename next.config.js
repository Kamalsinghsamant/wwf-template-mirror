/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "donate.wwfindia.org",
      "images.unsplash.com",
      "via.placeholder.com",
      "crowdera-platform.s3.ap-south-1.amazonaws.com",
      "wwfin.awsassets.panda.org",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*.php",
        destination: "/:path*",
      },
      {
        source: "/api/crowdera/:path*",
        destination: `${process.env.NEXT_PUBLIC_URL || "https://devapi.crowdera.com"}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
