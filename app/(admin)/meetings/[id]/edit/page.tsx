import { Suspense } from 'react';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

async function EditMeetingContent({ params }: EditMeetingPageProps) {
  await connection();
  const { id: idParam } = await params;
  if (!/^\d+$/.test(idParam)) {
    notFound();
  }

  const id = Number(idParam);
  if (!Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  return (
    <main className="meeting-form-page">
      <header>
        <p className="agenda-eyebrow">Meeting administration · #{meeting.id}</p>
        <h1>Edit meeting</h1>
      </header>
      <MeetingForm
        action={updateMeeting.bind(null, id)}
        meeting={meeting}
        submitLabel="Save changes"
      />
    </main>
  );
}

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  return (
    <Suspense fallback={<p className="meeting-form-page">Loading meeting...</p>}>
      <EditMeetingContent params={params} />
    </Suspense>
  );
}
