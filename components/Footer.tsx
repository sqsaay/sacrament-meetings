import { Suspense } from 'react';
import { connection } from 'next/server';
import { getCurrentYear } from '../lib/date';

async function CurrentYear() {
  await connection();
  return <>{getCurrentYear()}</>;
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        &copy;{' '}
        <Suspense fallback="...">
          <CurrentYear />
        </Suspense>{' '}
        Samantha Salazar. All rights reserved.
      </p>
    </footer>
  );
}