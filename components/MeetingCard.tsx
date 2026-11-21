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
      className="meeting-card"
    >
      <article className="meeting-card-content">
        <div className="meeting-card-topline">
          <span className="meeting-type-pill">{meeting.meetingType}</span>
          <span className="meeting-card-arrow" aria-hidden="true">↗</span>
        </div>
        <h2>{date}</h2>
        <p className="meeting-card-caption">Sacrament meeting</p>
        <dl className="meeting-card-details">
          <div><dt>Presiding</dt><dd>{meeting.presiding}</dd></div>
          <div><dt>Conducting</dt><dd>{meeting.conducting}</dd></div>
        </dl>
      </article>
    </Link>
  );
}