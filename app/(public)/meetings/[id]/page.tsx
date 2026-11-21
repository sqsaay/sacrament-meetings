import MeetingDetails from '@/components/MeetingDetails';
import { getApiUrl } from '@/lib/api-url';
import type { SacramentMeeting } from '@/lib/types';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  await connection();

  const response = await fetch(
    await getApiUrl(`/api/meetings/${encodeURIComponent(idParam)}`),
    { cache: 'no-store' },
  );
  if (response.status === 400 || response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error(
      `Failed to load meeting ${idParam}: ${response.status} ${response.statusText}`,
    );
  }

  const meeting: SacramentMeeting = await response.json();

  return (
    <main>
      <MeetingDetails meeting={meeting} />
    </main>
  );
}
