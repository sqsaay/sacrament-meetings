import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: LayoutProps<'/meetings'>) {
  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8 sm:px-10 lg:px-16">
      <nav className="meetings-navigation" aria-label="Meetings navigation">
        <Link href="/meetings">
          All meetings
        </Link>
        <Link href="/meetings/current">
          Current meeting
        </Link>
      </nav>
      {children}
    </div>
  );
}