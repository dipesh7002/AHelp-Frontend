import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      images: {remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',        // include port if needed
        pathname: '/media/**', // allow all paths under /media
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',        // include port if needed
        pathname: '/media/**', // allow all paths under /media
        
      }
    ],

}};

export default nextConfig;
