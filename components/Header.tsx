import Link from 'next/link';
import { Suspense } from 'react';
import { connection } from 'next/server';
import { getFormattedDate } from '../lib/date';
import NavLinks, { NavLinksFallback } from './NavLinks';

async function CurrentDate() {
  await connection();
  return <>{getFormattedDate()}</>;
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="site-brand">
          <Link className="site-name" href="/">
            Fatima Ward
          </Link>
          <p className="site-date">
            <Suspense fallback="Loading date...">
              <CurrentDate />
            </Suspense>
          </p>
        </div>
        <Suspense fallback={<NavLinksFallback />}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}