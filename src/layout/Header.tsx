import React from 'react';
import Nav from '@/layout/Nav';
import NavButtons from '@/components/common/NavButtons';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 mx-auto my-0 h-[56px] border-b border-b-gray200 bg-white px-[24px] py-0 dark:bg-darkBg01">
      <section className="m-auto flex h-full max-w-[970px] items-center justify-between">
        <Nav />
        <NavButtons />
      </section>
    </header>
  );
};

export default Header;
