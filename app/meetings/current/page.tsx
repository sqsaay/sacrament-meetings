import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getMeetings } from '@/lib/meetings-db';
import { getCurrentSundayDate } from '@/lib/date';

async function CurrentMeetingRedirect(): Promise<never> {
  await connection();

  const sundayDate = getCurrentSundayDate(new Date());
  const [meeting] = getMeetings(sundayDate);

  if (!meeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meeting.id}`);
}

export default function CurrentMeetingPage() {
  return (
    <main className="current-meeting-loading">
      <Suspense fallback={<p>Finding the current meeting...</p>}>
        <CurrentMeetingRedirect />
      </Suspense>
    </main>
  );
}