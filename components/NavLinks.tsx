'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
];

export default function NavLinks() {
  const pathname = usePathname();
  return <NavigationMenu pathname={pathname} />;
}

export function NavLinksFallback() {
  return <NavigationMenu />;
}

function NavigationMenu({ pathname }: { pathname?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="site-navigation">
      <button
        type="button"
        className="site-nav-toggle"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="main-navigation"
        className={isOpen ? 'site-nav is-open' : 'site-nav'}
        aria-label="Main navigation"
      >
        {links.map(({ href, label }) => {
          const isActive =
            pathname !== undefined &&
            (href === '/'
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`));

          return (
            <Link
              key={href}
              href={href}
              className={isActive ? 'font-semibold underline underline-offset-4' : 'hover:underline'}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}