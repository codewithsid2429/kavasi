import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow the local network IP to load JavaScript chunks so the Hero 3D model loads
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  allowedDevOrigins: ['172.33.2.155', 'localhost'],
};

export default nextConfig;
