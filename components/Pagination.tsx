'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page'));
  const requestedPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const currentPage = totalPages > 0
    ? Math.min(requestedPage, totalPages)
    : 1;

  if (totalPages <= 0) {
    return null;
  }

  function createPageHref(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      className="mt-6 flex flex-wrap items-center justify-center gap-3"
      aria-label="Pagination"
    >
      {currentPage > 1 ? (
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d6ccbe] bg-white px-4 py-2 text-sm font-bold text-[#29251f] no-underline transition-colors hover:border-[#bd4d21] hover:text-[#963b19] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#bd4d21]"
          href={createPageHref(currentPage - 1)}
          rel="prev"
        >
          Previous
        </Link>
      ) : (
        <span
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ece6dc] bg-[#f1ede6] px-4 py-2 text-sm font-bold text-[#9a9388]"
          aria-disabled="true"
        >
          Previous
        </span>
      )}

      <span
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f5e9dd] px-4 py-2 text-sm font-bold text-[#794126]"
        aria-current="page"
      >
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d6ccbe] bg-white px-4 py-2 text-sm font-bold text-[#29251f] no-underline transition-colors hover:border-[#bd4d21] hover:text-[#963b19] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#bd4d21]"
          href={createPageHref(currentPage + 1)}
          rel="next"
        >
          Next
        </Link>
      ) : (
        <span
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ece6dc] bg-[#f1ede6] px-4 py-2 text-sm font-bold text-[#9a9388]"
          aria-disabled="true"
        >
          Next
        </span>
      )}
    </nav>
  );
}
