import { headers } from 'next/headers';

export async function getApiUrl(path: string): Promise<URL> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get('x-forwarded-host')?.split(',')[0]?.trim() ??
    requestHeaders.get('host');
  const protocol =
    requestHeaders.get('x-forwarded-proto')?.split(',')[0]?.trim() ?? 'http';

  if (!host || (protocol !== 'http' && protocol !== 'https')) {
    throw new Error('Unable to determine the application origin for the API request.');
  }

  const origin = new URL(`${protocol}://${host}`);
  if (origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error('The request host is not a valid application origin.');
  }

  return new URL(path, origin);
}
