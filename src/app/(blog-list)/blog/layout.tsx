import React from 'react';
import WaveBanner from '@/components/common/WaveBanner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WaveBanner
        title="Blog Archive"
        description="I've been writing blog posts since I became a front-end developer."
        type="blog"
      />
      {children}
    </>
  );
}
