import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <div className="flex items-center gap-[20px]">
      <Link href="/">
        <Image src={`/assets/icons/been-logo.svg`} width={60} height={56} alt="logo" />
      </Link>
      <div className="flex items-center gap-[20px]">
        <Link href="/about">About</Link>
      </div>
    </div>
  );
};

export default Nav;
