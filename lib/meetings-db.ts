import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
    {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Osorio',
    conducting: 'Brother Marroquin',
    openingHymn: { number: 10, title: 'Come, Sing to the Lord' },
    openingPrayer: 'Sister Garcia',
    wardBusiness: [{ description: 'Sustaining Secretary of Sunday School' }],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: "While of These Emblems We Partake" },
    speakers: [
      { name: 'All Members', topic: 'Testimony', type: 'speaker' }
    ],
    closingHymn: { number: 25, title: "Now We'll Sing with One Accord" },
    closingPrayer: 'Brother Lopez',
    announcements: ['Family Home Evening: May 15']
  }, 
    {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Osorio',
    conducting: 'Brother Mena',
    openingHymn: { number: 210, title: 'Come, Let Us Anew' },
    openingPrayer: 'Sister Samayoa',
    wardBusiness: [{ description: 'Releasing counselor of Young Women' }],
    stakeBusiness: false,
    sacramentHymn: { number: 170, title: "God, Our Father, Hear Us Pray" },
    speakers: [
      { name: 'Elvi Lopez', topic: 'Increase your faith in the Lord', type: 'speaker' },
       { name: 'Sebastian Davila', topic: 'Working through your weaknesses', type: 'speaker' }
    ],
    closingHymn: { number: 47, title: 'We will sing of Zion' },
    closingPrayer: 'Brother Ibañez',
    announcements: ['']
  }, 
  {
    id: 4,
    date: '2026-05-21',
    meetingType: 'stake',
    presiding: 'President Rodriguez',
    conducting: 'President Beteta',
    openingHymn: { number: 57, title: "We're Not Ashamed to Own Our Lord" },
    openingPrayer: 'Sister Cabrera',
    wardBusiness: [{ description: 'Releasing President of Young Men' }],
    stakeBusiness: true,
    sacramentHymn: { number: 0, title: "" },
    speakers: [
      { name: 'President Hernandez', topic: 'Committed with your Covenants', type: 'speaker' },
       { name: 'President Beteta', topic: 'Helping other through Christ', type: 'speaker' }
    ],
    closingHymn: { number: 33, title: 'Our Mountain Home So Dear' },
    closingPrayer: 'Brother Aguilar',
    announcements: ['']
  }, 
  {
    id: 5,
    date: '2026-05-28',
    meetingType: 'general',
    presiding: 'President Oaks',
    conducting: 'President Eyring',
    openingHymn: { number: 13, title: "An Angel from on High" },
    openingPrayer: 'Sister Johnson',
    wardBusiness: [{ description: 'Releasing General President of Sunday School' }],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: "" },
    speakers: [
      { name: 'President Eyring', topic: 'Committed with your Covenants', type: 'speaker' },
       { name: 'President Oaks', topic: 'Helping other through Christ', type: 'speaker' }, 
       { name: 'Tabernacle Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 7, title: 'Israel, Israel, God Is Calling' },
    closingPrayer: 'Brother Carter',
    announcements: ['']
  }, 
  {
   id: 6,
    date: '2026-11-15',
    meetingType: 'regular',
    presiding: 'President Oaks',
    conducting: 'President Eyring',
    openingHymn: { number: 13, title: "An Angel from on High" },
    openingPrayer: 'Sister Johnson',
    wardBusiness: [{ description: 'Releasing General President of Sunday School' }],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: "" },
    speakers: [
      { name: 'President Eyring', topic: 'Committed with your Covenants', type: 'speaker' },
       { name: 'President Oaks', topic: 'Helping other through Christ', type: 'speaker' }, 
       { name: 'Tabernacle Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 7, title: 'Israel, Israel, God Is Calling' },
    closingPrayer: 'Brother Carter',
    announcements: ['']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}