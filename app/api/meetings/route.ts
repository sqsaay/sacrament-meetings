import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');
  const query = url.searchParams.get('query') ?? '';
  const pageParam = Number(url.searchParams.get('page'));
  const currentPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  if (date) {
    const dateParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!dateParts) {
      return Response.json(
        { error: 'Date must use the YYYY-MM-DD format.' },
        { status: 400 },
      );
    }

    const [, year, month, day] = dateParts;
    const parsed = new Date(`${year}-${month}-${day}T00:00:00Z`);
    if (
      Number.isNaN(parsed.getTime())
      || parsed.getUTCFullYear() !== Number(year)
      || parsed.getUTCMonth() + 1 !== Number(month)
      || parsed.getUTCDate() !== Number(day)
    ) {
      return Response.json(
        { error: 'Date must be a valid calendar date.' },
        { status: 400 },
      );
    }
  }

  return Response.json(await getMeetings(date ?? query, currentPage));
}