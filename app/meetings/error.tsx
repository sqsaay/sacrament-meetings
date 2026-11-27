'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <main className="meeting-error-page">
      <section className="meeting-error-card" role="alert">
        <p className="agenda-eyebrow">Meetings</p>
        <h1>We couldn&apos;t load the meetings</h1>
        <p>
          Something went wrong while loading this page. Try again, or return to
          the meetings list.
        </p>
        <div className="meeting-error-actions">
          <button type="button" onClick={reset}>
            Try Again
          </button>
          <Link href="/meetings">Back to meetings</Link>
        </div>
      </section>
    </main>
  );
}
