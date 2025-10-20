import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <div className="flex items-center gap-[20px]">
      <Link href="/">
        <Image className="size-[38px]" src={`/assets/icons/logo.png`} width={38} height={38} priority alt="logo" />
      </Link>
      <div className="flex items-center gap-[20px]">
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
};

export default Nav;
