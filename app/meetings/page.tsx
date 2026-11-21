import MeetingCard from '@/components/MeetingCard';
import { getApiUrl } from '@/lib/api-url';
import type { SacramentMeeting } from '@/lib/types';
import { connection } from 'next/server';

export default async function MeetingsPage() {
  await connection();

  const response = await fetch(await getApiUrl('/api/meetings'), {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Failed to load meetings: ${response.status} ${response.statusText}`);
  }

  const meetings: SacramentMeeting[] = await response.json();

  return (
    <main className="meetings-index">
      <header className="meetings-index-hero">
        <div>
          <p className="agenda-eyebrow">Fatima Ward · Weekly worship</p>
          <h1>Sacrament meetings</h1>
          <p>Gather, worship, and follow along with each week’s program.</p>
        </div>
      </header>
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
    </main>
  );
}