import { getFormattedDate } from '../lib/date';
import type { SacramentMeeting, SpeakerItem } from '../lib/types';

interface MeetingDetailsProps {
  meeting: SacramentMeeting;
}

function HymnDetails({ hymn }: { hymn: SacramentMeeting['openingHymn'] }) {
  return (
    <p>
      {hymn.number > 0 ? `#${hymn.number} ` : ''}
      {hymn.title || 'Not specified'}
    </p>
  );
}

function SpeakerDetails({ item }: { item: SpeakerItem }) {
  return (
    <li>
      <p className="font-medium">{item.name}</p>
      {item.topic && <p>{item.topic}</p>}
      <p className="text-sm capitalize">{item.type === 'musical-number' ? 'Musical number' : 'Speaker'}</p>
    </li>
  );
}

export default function MeetingDetails({ meeting }: MeetingDetailsProps) {
  const date = getFormattedDate(new Date(`${meeting.date}T00:00:00`));
  const announcements = meeting.announcements?.filter(Boolean) ?? [];

  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{date}</h1>
        <p className="capitalize">{meeting.meetingType} meeting</p>
        <p className="text-sm">Meeting #{meeting.id}</p>
        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Presiding</dt>
            <dd>{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="font-semibold">Conducting</dt>
            <dd>{meeting.conducting}</dd>
          </div>
        </dl>
      </header>

      {announcements.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">Announcements</h2>
          <ul className="list-disc pl-6">
            {announcements.map((announcement, index) => (
              <li key={`${index}-${announcement}`}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">Opening</h2>
        <dl className="mt-2 grid gap-2">
          <div>
            <dt className="font-semibold">Opening hymn</dt>
            <dd><HymnDetails hymn={meeting.openingHymn} /></dd>
          </div>
          <div>
            <dt className="font-semibold">Opening prayer</dt>
            <dd>{meeting.openingPrayer}</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Ward business</h2>
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc pl-6">
            {meeting.wardBusiness.map((item, index) => (
              <li key={`${index}-${item.description}`}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p>None</p>
        )}
        <p className="mt-2">
          Stake business: {meeting.stakeBusiness ? 'Yes' : 'No'}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Sacrament</h2>
        <dl className="mt-2 grid gap-2">
          <div>
            <dt className="font-semibold">Sacrament hymn</dt>
            <dd><HymnDetails hymn={meeting.sacramentHymn} /></dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Speakers and musical numbers</h2>
        {meeting.speakers.length > 0 ? (
          <ul className="mt-2 space-y-3">
            {meeting.speakers.map((item, index) => (
              <SpeakerDetails key={`${index}-${item.name}`} item={item} />
            ))}
          </ul>
        ) : (
          <p>None</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Closing</h2>
        <dl className="mt-2 grid gap-2">
          <div>
            <dt className="font-semibold">Closing hymn</dt>
            <dd><HymnDetails hymn={meeting.closingHymn} /></dd>
          </div>
          <div>
            <dt className="font-semibold">Closing prayer</dt>
            <dd>{meeting.closingPrayer}</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}