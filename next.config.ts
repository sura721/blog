import withFlowbiteReact from "flowbite-react/plugin/nextjs";
import type { NextConfig } from 'next'; 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'utfs.io' },
      { protocol: 'https', hostname: '*.ufs.sh' },
      { protocol: 'https', hostname: 'img.clerk.com' },
        { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default withFlowbiteReact(nextConfig);