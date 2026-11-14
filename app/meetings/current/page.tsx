import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';
import { getCurrentSundayDate } from '@/lib/date';

export default async function CurrentMeetingPage() {
  await connection();

  const sundayDate = getCurrentSundayDate(new Date());
  const [meeting] = getMeetings(sundayDate);

  if (!meeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meeting.id}`);
}