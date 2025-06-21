// next.config.js

import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io', 
      },
      {
        protocol: 'https',
        hostname: '*.ufs.sh', 
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com', }
    ],
  },
};

export default withFlowbiteReact(nextConfig);