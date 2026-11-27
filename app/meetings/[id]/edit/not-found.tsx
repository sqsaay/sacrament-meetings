import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <main className="meeting-error-page">
      <section className="meeting-error-card">
        <p className="agenda-eyebrow">Meeting administration</p>
        <h1>Meeting not found</h1>
        <p>The meeting you are trying to edit does not exist.</p>
        <div className="meeting-error-actions">
          <Link href="/meetings">Back to meetings</Link>
        </div>
      </section>
    </main>
  );
}
