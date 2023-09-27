import React from 'react';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mx-auto my-0 max-w-[970px] p-[16px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
