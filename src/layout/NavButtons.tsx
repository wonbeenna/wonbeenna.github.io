import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  {
    href: '/search',
    label: 'Search',
    iconLight: '/assets/icons/search.svg',
    iconDark: '/assets/icons/search-light.svg'
  },
  {
    href: 'https://github.com/wonbeenna',
    label: 'GitHub',
    target: '_blank',
    rel: 'noopener noreferrer',
    iconLight: '/assets/icons/github.svg',
    iconDark: '/assets/icons/github-light.svg'
  },
  {
    href: 'mailto:nwbnwb@naver.com',
    label: 'Email',
    iconLight: '/assets/icons/mail.svg',
    iconDark: '/assets/icons/mail-light.svg'
  }
];

interface NavButtonsProps {
  theme?: string;
  setTheme: Dispatch<SetStateAction<string>>;
  currentTheme?: string;
  onNavigate?: () => void;
}

const NavButtons = ({ theme, setTheme, currentTheme, onNavigate }: NavButtonsProps) => {
  return (
    <div className="flex items-center gap-[12px]">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          target={item.target}
          rel={item.rel}
          aria-label={item.label}
          onClick={onNavigate}
        >
          <Image
            src={currentTheme === 'dark' ? item.iconDark : item.iconLight}
            width={24}
            height={24}
            priority
            alt={`${item.label}로 이동`}
          />
        </Link>
      ))}

      <button
        type="button"
        onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
        aria-label="Toggle theme"
        className="rounded-md p-1 transition hover:bg-gray100 dark:hover:bg-darkGray01"
      >
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/sun.svg` : `/assets/icons/moon.svg`}
          width={22}
          height={22}
          priority
          alt={currentTheme === 'dark' ? '라이트모드로 변경하는 버튼' : '다크모드로 변경하는 버튼'}
        />
      </button>
    </div>
  );
};

export default NavButtons;
