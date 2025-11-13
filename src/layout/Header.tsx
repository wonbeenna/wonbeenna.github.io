'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '@/layout/Nav';
import NavButtons from '@/layout/NavButtons';
import { cn } from '@/utils/cn';
import { useTheme } from 'next-themes';
import useBodyOverflowHidden from '@/hooks/useBodyOverflowHidden';
import useKeyDown from '@/hooks/useKeyDown';

const MOBILE_BREAKPOINT_PX = 640;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);

  useBodyOverflowHidden({ isOpen });

  useKeyDown({
    onEscape: () => {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    const resolved = theme === 'system' ? systemTheme : theme;
    setCurrentTheme(resolved);
  }, [theme, systemTheme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT_PX) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const el = menuRef.current;
    if (el) {
      if (isOpen) {
        el.removeAttribute('inert');
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.setAttribute('inert', '');
        el.setAttribute('aria-hidden', 'true');
      }
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 mx-auto my-0 h-[56px] border-b border-b-gray200 bg-white px-[24px] py-0 dark:bg-darkBg01">
      <section className="m-auto flex h-full max-w-[970px] items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Home">
            <Image className="size-[38px]" src="/assets/images/logo.png" width={38} height={38} priority alt="logo" />
          </Link>

          <div className="hidden sm:flex">
            <Nav />
          </div>
        </div>

        <div className="hidden sm:flex">
          <NavButtons theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="flex items-center justify-center rounded-md p-2 transition hover:bg-gray100 dark:hover:bg-darkGray01 sm:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <Image
            src={
              isOpen
                ? currentTheme === 'dark'
                  ? '/assets/icons/close-light.svg'
                  : '/assets/icons/close.svg'
                : currentTheme === 'dark'
                  ? '/assets/icons/menu-light.svg'
                  : '/assets/icons/menu.svg'
            }
            width={24}
            height={24}
            alt="menu"
            className={cn(currentTheme === 'dark' ? 'fill-white' : 'fill-black')}
          />
        </button>
      </section>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          'absolute left-0 right-0 top-[56px] flex flex-col items-center overflow-hidden border-b border-gray200 bg-white transition-all duration-300 dark:bg-darkBg01 sm:hidden',
          isOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <Nav mobile onNavigate={() => setIsOpen(false)} />
        <div className="my-3">
          <NavButtons
            theme={theme}
            setTheme={setTheme}
            currentTheme={currentTheme}
            onNavigate={() => setIsOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
