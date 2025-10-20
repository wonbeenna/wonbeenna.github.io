'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn'; // cn 함수 있으면 병합용으로 사용

const Nav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' }
  ];

  return (
    <div className="flex items-center gap-5">
      <Link href="/">
        <Image className="size-[38px]" src="/assets/icons/logo.png" width={38} height={38} priority alt="logo" />
      </Link>

      <nav className="flex items-center gap-5">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-1.5 transition-colors',
                isActive
                  ? 'bg-primaryColor/10 font-semibold text-primaryColor'
                  : 'text-gray-700 dark:text-gray-300 hover:text-primaryColor'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
