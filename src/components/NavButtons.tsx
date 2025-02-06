'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const NavButtons = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;

    setCurrentTheme(currentTheme);
  }, [theme]);

  return (
    <div className="flex items-center gap-[12px]">
      <Link href="/search">
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/search-light.svg` : `/assets/icons/search.svg`}
          width={22}
          height={22}
          priority
          alt="search"
        />
      </Link>
      <Link href={'https://github.com/wonbeenna'} target="_blank" rel="noopener noreferrer">
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/github-light.svg` : `/assets/icons/github.svg`}
          width={22}
          height={22}
          priority
          alt="github"
        />
      </Link>
      <Link href={'mailto:nwbnwb@naver.com'}>
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/mail-light.svg` : `/assets/icons/mail.svg`}
          width={26}
          height={26}
          priority
          alt="email"
        />
      </Link>
      <button onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}>
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/sun.svg` : `/assets/icons/moon.svg`}
          width={22}
          height={22}
          priority
          alt="theme"
        />
      </button>
    </div>
  );
};

export default NavButtons;
