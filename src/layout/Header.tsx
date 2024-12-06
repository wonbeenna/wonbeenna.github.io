'use client';

import React from 'react';
import Nav from '@/layout/Nav';
import dynamic from 'next/dynamic';

const ThemeButton = dynamic(() => import('@/components/ThemeButton'), {
  ssr: false
});

const SnowFall = dynamic(() => import('@/components/SnowFall'), {
  ssr: false
});

const Header = () => {
  return (
    <header className="sticky top-0 z-10 mx-auto my-0 h-[56px] border-b border-b-gray200 bg-white px-[24px] py-0 dark:bg-darkBg01">
      <section className="m-auto flex h-full max-w-[970px] items-center justify-between">
        <Nav />

        <SnowFall />

        <ThemeButton />
      </section>
    </header>
  );
};

export default Header;
