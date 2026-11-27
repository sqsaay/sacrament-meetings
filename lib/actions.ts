'use server';

import { revalidatePath } from 'next/cache';
import {
  addMeeting,
  deleteMeeting as deleteMeetingRecord,
  updateMeeting as updateMeetingRecord,
} from '@/lib/meetings-db';
import type { SacramentMeeting } from '@/lib/types';
import { redirect } from 'next/navigation';
import { z } from 'zod';

function isISODate(value: string): boolean {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!parts) {
    return false;
  }

  const [, year, month, day] = parts;
  const parsed = new Date(`${year}-${month}-${day}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime())
    && parsed.getUTCFullYear() === Number(year)
    && parsed.getUTCMonth() + 1 === Number(month)
    && parsed.getUTCDate() === Number(day);
}

function parseJson(value: unknown): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

const HymnSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().trim().min(1),
});

const MeetingFormSchema = z.object({
  date: z.string().refine(isISODate, {
    message: 'Meeting date must be a valid date in YYYY-MM-DD format.',
  }),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
  presiding: z.string().trim().min(1),
  conducting: z.string().trim().min(1),
  announcements: z.array(z.string()).transform((items) =>
    items.flatMap((item) => item.split(/\r?\n/).map((line) => line.trim()))
      .filter(Boolean)),
  openingHymn: z.preprocess(parseJson, HymnSchema),
  openingPrayer: z.string().trim().min(1),
  wardBusiness: z.preprocess(
    parseJson,
    z.array(z.object({ description: z.string() })),
  ),
  stakeBusiness: z
    .union([z.literal('on'), z.literal('true'), z.literal('false'), z.null()])
    .transform((value) => value === 'on' || value === 'true'),
  sacramentHymn: z.preprocess(parseJson, HymnSchema),
  speakers: z.preprocess(
    parseJson,
    z.array(z.object({
      name: z.string(),
      topic: z.string(),
      type: z.enum(['speaker', 'musical-number']),
    })),
  ),
  closingHymn: z.preprocess(parseJson, HymnSchema),
  closingPrayer: z.string().trim().min(1),
});

type MeetingFormField =
  | 'date'
  | 'meetingType'
  | 'presiding'
  | 'conducting'
  | 'announcements'
  | 'openingHymn'
  | 'openingPrayer'
  | 'wardBusiness'
  | 'stakeBusiness'
  | 'sacramentHymn'
  | 'speakers'
  | 'closingHymn'
  | 'closingPrayer';

export type MeetingFormState = {
  errors?: Partial<Record<MeetingFormField, string[]>>;
  message?: string | null;
  values?: Partial<Record<MeetingFormField, string>>;
  revision?: number;
};

function getRawMeetingFormData(formData: FormData) {
  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.getAll('announcements'),
    openingHymn: formData.get('openingHymn'),
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness'),
    sacramentHymn: formData.get('sacramentHymn'),
    speakers: formData.get('speakers'),
    closingHymn: formData.get('closingHymn'),
    closingPrayer: formData.get('closingPrayer'),
  };
}

function getMeetingFormValues(
  formData: FormData,
): Partial<Record<MeetingFormField, string>> {
  const announcements = formData.getAll('announcements')
    .filter((value): value is string => typeof value === 'string')
    .join('\n');

  const textValue = (name: MeetingFormField) => {
    const value = formData.get(name);
    return typeof value === 'string' ? value : '';
  };

  return {
    date: textValue('date'),
    meetingType: textValue('meetingType'),
    presiding: textValue('presiding'),
    conducting: textValue('conducting'),
    announcements,
    openingHymn: textValue('openingHymn'),
    openingPrayer: textValue('openingPrayer'),
    wardBusiness: textValue('wardBusiness'),
    stakeBusiness: formData.has('stakeBusiness') ? 'on' : 'false',
    sacramentHymn: textValue('sacramentHymn'),
    speakers: textValue('speakers'),
    closingHymn: textValue('closingHymn'),
    closingPrayer: textValue('closingPrayer'),
  };
}

function validateId(id: number): void {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error('Meeting ID must be a positive safe integer.');
  }
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse(getRawMeetingFormData(formData));
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Please correct the highlighted fields.',
      values: getMeetingFormValues(formData),
      revision: (prevState.revision ?? 0) + 1,
    };
  }

  try {
    await addMeeting(parsed.data);
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw new Error('Failed to create meeting. Please try again later.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  validateId(id);
  const parsed = MeetingFormSchema.safeParse(getRawMeetingFormData(formData));
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Please correct the highlighted fields.',
      values: getMeetingFormValues(formData),
      revision: (prevState.revision ?? 0) + 1,
    };
  }

  let meeting: SacramentMeeting | null;
  try {
    meeting = await updateMeetingRecord(id, parsed.data);
  } catch (error) {
    console.error(`Error updating meeting ${id}:`, error);
    throw new Error('Failed to update meeting. Please try again later.');
  }

  if (!meeting) {
    throw new Error(`Meeting ${id} was not found.`);
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  revalidatePath(`/meetings/${id}/edit`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  validateId(id);
  let deleted: boolean;
  try {
    deleted = await deleteMeetingRecord(id);
  } catch (error) {
    console.error(`Error deleting meeting ${id}:`, error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }

  if (!deleted) {
    throw new Error(`Meeting ${id} was not found.`);
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}
