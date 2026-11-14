import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idParam } = await params;

  if (!/^\d+$/.test(idParam)) {
    return Response.json({ error: 'Meeting ID must be a valid number.' }, { status: 400 });
  }

  const id = Number(idParam);
  if (!Number.isSafeInteger(id)) {
    return Response.json({ error: 'Meeting ID must be a valid number.' }, { status: 400 });
  }

  const meeting = getMeetingById(id);
  if (!meeting) {
    return Response.json({ error: 'Meeting not found.' }, { status: 404 });
  }

  return Response.json(meeting);
}
