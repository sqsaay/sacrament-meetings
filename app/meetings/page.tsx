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
    <main className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Sacrament meetings</h1>
        <p>Browse agendas for all scheduled meetings.</p>
      </header>
      {meetings.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meeting={meeting} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No meetings are scheduled.</p>
      )}
    </main>
  );
}