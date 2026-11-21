import { getFormattedDate } from '../lib/date';
import type { SacramentMeeting, SpeakerItem } from '../lib/types';
import AgendaPrintButton from './AgendaPrintButton';

interface MeetingDetailsProps {
  meeting: SacramentMeeting;
}

function HymnDetails({ hymn }: { hymn: SacramentMeeting['openingHymn'] }) {
  return (
    <>{hymn.number > 0 ? `#${hymn.number} ` : ''}{hymn.title || 'Not specified'}</>
  );
}

function SpeakerDetails({ item }: { item: SpeakerItem }) {
  return (
    <div className="agenda-person">
      <span className="agenda-person-type">
        {item.type === 'musical-number' ? 'Musical number' : 'Speaker'}
      </span>
      <p className="agenda-person-name">{item.name}</p>
      {item.topic && <p className="agenda-person-topic">{item.topic}</p>}
    </div>
  );
}

export default function MeetingDetails({ meeting }: MeetingDetailsProps) {
  const date = getFormattedDate(new Date(`${meeting.date}T00:00:00`));
  const announcements = meeting.announcements?.filter(Boolean) ?? [];
  const agendaItems = [
    { title: 'Opening hymn', detail: <HymnDetails hymn={meeting.openingHymn} /> },
    { title: 'Opening prayer', detail: meeting.openingPrayer || 'Not specified' },
    ...(meeting.wardBusiness.length > 0
      ? [{
          title: 'Ward business',
          detail: meeting.wardBusiness.map((item, index) => (
            <p key={`${index}-${item.description}`}>{item.description}</p>
          )),
        }]
      : []),
    ...(meeting.stakeBusiness
      ? [{ title: 'Stake business', detail: 'Stake business will be conducted.' }]
      : []),
    { title: 'Sacrament hymn', detail: <HymnDetails hymn={meeting.sacramentHymn} /> },
    ...(meeting.speakers.length > 0
      ? [{
          title: 'Speakers and musical numbers',
          detail: (
            <div className="agenda-people">
              {meeting.speakers.map((item, index) => (
                <SpeakerDetails key={`${index}-${item.name}`} item={item} />
              ))}
            </div>
          ),
        }]
      : []),
    { title: 'Closing hymn', detail: <HymnDetails hymn={meeting.closingHymn} /> },
    { title: 'Closing prayer', detail: meeting.closingPrayer || 'Not specified' },
  ];

  return (
    <article className="agenda-page">
      <header className="agenda-hero">
        <div className="agenda-hero-copy">
          <p className="agenda-eyebrow">Fatima Ward · Meeting program</p>
          <h1>{date}</h1>
          <p className="agenda-subtitle">
            {meeting.meetingType} sacrament meeting · Meeting #{meeting.id}
          </p>
        </div>
      </header>

      <div className="agenda-summary">
        <div className="agenda-summary-item">
          <span className="agenda-summary-icon" aria-hidden="true">◷</span>
          <div><span className="agenda-summary-label">Date</span><strong>{date}</strong></div>
        </div>
        <div className="agenda-summary-item">
          <span className="agenda-summary-icon" aria-hidden="true">⌂</span>
          <div><span className="agenda-summary-label">Meeting</span><strong>{meeting.meetingType}</strong></div>
        </div>
        <div className="agenda-summary-item">
          <span className="agenda-summary-icon" aria-hidden="true">♙</span>
          <div><span className="agenda-summary-label">Presiding</span><strong>{meeting.presiding}</strong></div>
        </div>
        <div className="agenda-summary-item">
          <span className="agenda-summary-icon" aria-hidden="true">♧</span>
          <div><span className="agenda-summary-label">Conducting</span><strong>{meeting.conducting}</strong></div>
        </div>
        <AgendaPrintButton />
      </div>

      <div className="agenda-columns">
        <aside className="agenda-sidebar">
          <section className="agenda-side-section">
            <h2>Meeting details</h2>
            <dl className="agenda-details-card">
              <div><dt>Presiding</dt><dd>{meeting.presiding}</dd></div>
              <div><dt>Conducting</dt><dd>{meeting.conducting}</dd></div>
            </dl>
          </section>

          {announcements.length > 0 && (
            <section className="agenda-side-section">
              <h2>Announcements</h2>
              <ul className="agenda-announcements">
                {announcements.map((announcement, index) => (
                  <li key={`${index}-${announcement}`}>{announcement}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="agenda-side-section">
            <h2>Hymns</h2>
            <dl className="agenda-details-card">
              <div><dt>Opening</dt><dd><HymnDetails hymn={meeting.openingHymn} /></dd></div>
              <div><dt>Sacrament</dt><dd><HymnDetails hymn={meeting.sacramentHymn} /></dd></div>
              <div><dt>Closing</dt><dd><HymnDetails hymn={meeting.closingHymn} /></dd></div>
            </dl>
          </section>
        </aside>

        <section className="agenda-program">
          <div className="agenda-section-heading">
            <div>
              <p className="agenda-eyebrow">Order of service</p>
              <h2>Today’s agenda</h2>
            </div>
            <span className="agenda-item-count">{agendaItems.length} parts</span>
          </div>
          <ol className="agenda-step-list">
            {agendaItems.map((item, index) => (
              <li className="agenda-step" key={item.title}>
                <span className="agenda-step-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="agenda-step-content">
                  <h3>{item.title}</h3>
                  <div className="agenda-step-detail">{item.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}