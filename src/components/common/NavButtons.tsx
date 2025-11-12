import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavButtonsProps {
  theme?: string;
  setTheme: Dispatch<SetStateAction<string>>;
  currentTheme?: string;
}

const NavButtons = ({ theme, setTheme, currentTheme }: NavButtonsProps) => {
  return (
    <div className="flex items-center gap-[12px]">
      <Link href="/search" aria-label="Search">
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/search-light.svg` : `/assets/icons/search.svg`}
          width={22}
          height={22}
          priority
          alt="검색페이지로 이동"
        />
      </Link>

      <Link href={process.env.NEXT_PUBLIC_BASE_URL!} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/github-light.svg` : `/assets/icons/github.svg`}
          width={22}
          height={22}
          priority
          alt="GitHub링크로 이동"
        />
      </Link>

      <Link href="mailto:nwbnwb@naver.com" aria-label="Email">
        <Image
          src={currentTheme === 'dark' ? `/assets/icons/mail-light.svg` : `/assets/icons/mail.svg`}
          width={26}
          height={26}
          priority
          alt="이메일보내기"
        />
      </Link>

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
