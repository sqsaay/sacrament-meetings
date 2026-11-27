import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query?.trim() ?? '';
  const pageParam = Number(searchParams?.page);
  const currentPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const totalPages = await getMeetingsTotalPages(query);
  const safePage = totalPages > 0
    ? Math.min(currentPage, totalPages)
    : 1;
  const meetings = await getMeetings(query, safePage);

  return (
    <main className="meetings-index">
      <header className="meetings-index-hero">
        <div>
          <p className="agenda-eyebrow">Fatima Ward+</p>
          <h1>Sacrament meetings</h1>
          <p>Follow along with each week&apos;s program.</p>
        </div>
      </header>
      <MeetingSearch key={query} />
      {meetings.length > 0 ? (
        <ul className="meeting-card-grid">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meeting={meeting} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="meetings-empty-state">No meetings are scheduled.</p>
      )}
      <Pagination totalPages={totalPages} />
    </main>
  );
}