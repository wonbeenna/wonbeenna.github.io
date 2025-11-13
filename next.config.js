const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactCompiler: true,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/my-image-loader.ts',
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  }
};

module.exports = withMDX(nextConfig);
