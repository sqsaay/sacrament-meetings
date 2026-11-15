import Link from 'next/link';
import { getFormattedDate } from '../lib/date';
import type { SacramentMeeting } from '../lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const date = getFormattedDate(new Date(`${meeting.date}T00:00:00`));

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block rounded-lg border border-white/30 bg-white/10 p-4 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <article>
        <h2 className="text-xl font-semibold">{date}</h2>
        <p className="mt-1 capitalize">{meeting.meetingType} meeting</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Presiding</dt>
            <dd>{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="font-semibold">Conducting</dt>
            <dd>{meeting.conducting}</dd>
          </div>
        </dl>
      </article>
    </Link>
  );
}