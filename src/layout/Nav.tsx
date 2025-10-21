'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

interface NavProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const Nav = ({ mobile = false, onNavigate }: NavProps) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/photo', label: 'Photo' }
  ];

  return (
    <nav className={cn('flex items-center', mobile && 'flex-col gap-3 py-4')} aria-label="Primary navigation">
      {navItems.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'rounded-md px-3 py-1.5 text-lg transition-colors md:text-base',
              isActive
                ? 'bg-primaryColor/10 font-semibold text-primaryColor'
                : 'text-gray-700 dark:text-gray-300 hover:text-primaryColor'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
