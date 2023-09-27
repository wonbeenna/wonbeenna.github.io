import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 mx-auto my-0 h-[56px] border-b-[1px] border-b-gray200 bg-white px-[24px] py-0">
      <section className="m-auto flex h-full max-w-[970px] items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <Link href="/">
            <Image src={`/assets/icons/been-logo.svg`} width={60} height={56} alt="logo" />
          </Link>
          <div className="flex items-center gap-[20px]">
            <Link href="/about">About</Link>
          </div>
        </div>

        <div className="flex items-center gap-[20px]">
          <Link href={'https://github.com/wonbeenna'} target="_blank" rel="noopener noreferrer">
            <Image src={`/assets/icons/github.svg`} width={30} height={30} alt="github" />
          </Link>
          <Link href={'mailto:nwbnwb@naver.com'}>
            <Image src={`/assets/icons/mail.svg`} width={34} height={34} alt="email" />
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
