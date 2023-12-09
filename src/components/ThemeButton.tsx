'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="flex items-center gap-[20px]">
      <Link href={'https://github.com/wonbeenna'} target="_blank" rel="noopener noreferrer">
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/github-light.svg` : `/assets/icons/github.svg`}
          width={30}
          height={30}
          alt="github"
        />
      </Link>
      <Link href={'mailto:nwbnwb@naver.com'}>
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/mail-light.svg` : `/assets/icons/mail.svg`}
          width={34}
          height={34}
          alt="email"
        />
      </Link>
      <button onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}>
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/sun.svg` : `/assets/icons/moon.svg`}
          width={34}
          height={34}
          alt="theme"
        />
      </button>
    </div>
  );
};

export default ThemeButton;
