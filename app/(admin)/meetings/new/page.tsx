import { createMeeting } from '@/lib/actions';
import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <main className="meeting-form-page">
      <header>
        <p className="agenda-eyebrow">Meeting administration</p>
        <h1>Create a meeting</h1>
      </header>
      <MeetingForm action={createMeeting} submitLabel="Create meeting" />
    </main>
  );
}
