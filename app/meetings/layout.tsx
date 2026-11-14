import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: LayoutProps<'/meetings'>) {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8 sm:px-10 lg:px-16">
      <nav className="flex flex-wrap gap-4" aria-label="Meetings navigation">
        <Link className="underline underline-offset-4" href="/meetings">
          All meetings
        </Link>
        <Link className="underline underline-offset-4" href="/meetings/current">
          Current meeting
        </Link>
      </nav>
      {children}
    </div>
  );
}