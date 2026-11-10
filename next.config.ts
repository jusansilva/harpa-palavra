import type { NextConfig } from "next";
const nextConfig:NextConfig={output:"export",distDir:process.env.NEXT_BUILD_DIR||".next",images:{unoptimized:true}};
export default nextConfig;
