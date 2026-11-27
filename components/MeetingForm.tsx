'use client';

import { useActionState } from 'react';
import type { MeetingFormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

type MeetingFormAction = (
  previousState: MeetingFormState,
  formData: FormData,
) => Promise<MeetingFormState>;

const initialState: MeetingFormState = {
  errors: {},
  message: null,
  revision: 0,
};

function FieldError({
  id,
  messages,
}: {
  id: string;
  messages?: string[];
}) {
  return (
    <div
      id={id}
      className="meeting-field-error"
      aria-live="polite"
      aria-atomic="true"
    >
      {messages?.map((message) => <p key={message}>{message}</p>)}
    </div>
  );
}

export default function MeetingForm({
  action,
  meeting,
  submitLabel,
}: {
  action: MeetingFormAction;
  meeting?: SacramentMeeting;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form key={state.revision} action={formAction} className="meeting-form">
      <div className="meeting-form-grid">
        <div>
          <label htmlFor="meeting-date">Date</label>
          <input
            id="meeting-date"
            type="date"
            name="date"
            defaultValue={state.values?.date ?? meeting?.date ?? ''}
            aria-describedby="meeting-date-error"
            required
          />
          <FieldError id="meeting-date-error" messages={state.errors?.date} />
        </div>
        <div>
          <label htmlFor="meeting-type">Meeting type</label>
          <select
            id="meeting-type"
            name="meetingType"
            defaultValue={state.values?.meetingType ?? meeting?.meetingType ?? 'regular'}
            aria-describedby="meeting-type-error"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldError
            id="meeting-type-error"
            messages={state.errors?.meetingType}
          />
        </div>
        <div>
          <label htmlFor="meeting-presiding">Presiding</label>
          <input
            id="meeting-presiding"
            name="presiding"
            defaultValue={state.values?.presiding ?? meeting?.presiding ?? ''}
            aria-describedby="meeting-presiding-error"
            required
          />
          <FieldError
            id="meeting-presiding-error"
            messages={state.errors?.presiding}
          />
        </div>
        <div>
          <label htmlFor="meeting-conducting">Conducting</label>
          <input
            id="meeting-conducting"
            name="conducting"
            defaultValue={state.values?.conducting ?? meeting?.conducting ?? ''}
            aria-describedby="meeting-conducting-error"
            required
          />
          <FieldError
            id="meeting-conducting-error"
            messages={state.errors?.conducting}
          />
        </div>
      </div>

      <div>
        <label htmlFor="meeting-announcements">Announcements</label>
        <textarea
          id="meeting-announcements"
          name="announcements"
          defaultValue={state.values?.announcements ?? meeting?.announcements?.join('\n') ?? ''}
          aria-describedby="meeting-announcements-error meeting-announcements-help"
          rows={3}
        />
        <FieldError
          id="meeting-announcements-error"
          messages={state.errors?.announcements}
        />
        <span id="meeting-announcements-help" className="meeting-form-help">
          Enter one announcement per line.
        </span>
      </div>

      <div className="meeting-form-grid">
        <div>
          <label htmlFor="meeting-opening-hymn">Opening hymn (JSON)</label>
          <textarea
            id="meeting-opening-hymn"
            name="openingHymn"
            defaultValue={state.values?.openingHymn ?? JSON.stringify(meeting?.openingHymn ?? { number: 1, title: '' }, null, 2)}
            aria-describedby="meeting-opening-hymn-error meeting-opening-hymn-help"
            rows={3}
            required
          />
          <FieldError
            id="meeting-opening-hymn-error"
            messages={state.errors?.openingHymn}
          />
          <span id="meeting-opening-hymn-help" className="meeting-form-help">
            {'Example: {"number": 1, "title": "The Morning Breaks"}'}
          </span>
        </div>
        <div>
          <label htmlFor="meeting-opening-prayer">Opening prayer</label>
          <input
            id="meeting-opening-prayer"
            name="openingPrayer"
            defaultValue={state.values?.openingPrayer ?? meeting?.openingPrayer ?? ''}
            aria-describedby="meeting-opening-prayer-error"
            required
          />
          <FieldError
            id="meeting-opening-prayer-error"
            messages={state.errors?.openingPrayer}
          />
        </div>
        <div>
          <label htmlFor="meeting-ward-business">Ward business (JSON)</label>
          <textarea
            id="meeting-ward-business"
            name="wardBusiness"
            defaultValue={state.values?.wardBusiness ?? JSON.stringify(meeting?.wardBusiness ?? [], null, 2)}
            aria-describedby="meeting-ward-business-error meeting-ward-business-help"
            rows={4}
            required
          />
          <FieldError
            id="meeting-ward-business-error"
            messages={state.errors?.wardBusiness}
          />
          <span id="meeting-ward-business-help" className="meeting-form-help">
            {'Example: [{"description": "Welcome new members"}]'}
          </span>
        </div>
        <div>
          <label htmlFor="meeting-stake-business" className="meeting-form-checkbox">
            <input
              id="meeting-stake-business"
              type="checkbox"
              name="stakeBusiness"
              defaultChecked={
                state.values?.stakeBusiness !== undefined
                  ? state.values.stakeBusiness === 'on' || state.values.stakeBusiness === 'true'
                  : meeting?.stakeBusiness ?? false
              }
              aria-describedby="meeting-stake-business-error"
            />
            Stake business will be conducted
          </label>
          <FieldError
            id="meeting-stake-business-error"
            messages={state.errors?.stakeBusiness}
          />
        </div>
        <div>
          <label htmlFor="meeting-sacrament-hymn">Sacrament hymn (JSON)</label>
          <textarea
            id="meeting-sacrament-hymn"
            name="sacramentHymn"
            defaultValue={state.values?.sacramentHymn ?? JSON.stringify(meeting?.sacramentHymn ?? { number: 1, title: '' }, null, 2)}
            aria-describedby="meeting-sacrament-hymn-error meeting-sacrament-hymn-help"
            rows={3}
            required
          />
          <FieldError
            id="meeting-sacrament-hymn-error"
            messages={state.errors?.sacramentHymn}
          />
          <span id="meeting-sacrament-hymn-help" className="meeting-form-help">
            {'Example: {"number": 1, "title": "The Morning Breaks"}'}
          </span>
        </div>
        <div>
          <label htmlFor="meeting-speakers">Speakers and musical numbers (JSON)</label>
          <textarea
            id="meeting-speakers"
            name="speakers"
            defaultValue={state.values?.speakers ?? JSON.stringify(meeting?.speakers ?? [], null, 2)}
            aria-describedby="meeting-speakers-error meeting-speakers-help"
            rows={5}
            required
          />
          <FieldError
            id="meeting-speakers-error"
            messages={state.errors?.speakers}
          />
          <span id="meeting-speakers-help" className="meeting-form-help">
            {'Example: [{"name": "Jane Doe", "topic": "Faith", "type": "speaker"}]'}
          </span>
        </div>
        <div>
          <label htmlFor="meeting-closing-hymn">Closing hymn (JSON)</label>
          <textarea
            id="meeting-closing-hymn"
            name="closingHymn"
            defaultValue={state.values?.closingHymn ?? JSON.stringify(meeting?.closingHymn ?? { number: 1, title: '' }, null, 2)}
            aria-describedby="meeting-closing-hymn-error meeting-closing-hymn-help"
            rows={3}
            required
          />
          <FieldError
            id="meeting-closing-hymn-error"
            messages={state.errors?.closingHymn}
          />
          <span id="meeting-closing-hymn-help" className="meeting-form-help">
            {'Example: {"number": 1, "title": "The Morning Breaks"}'}
          </span>
        </div>
        <div>
          <label htmlFor="meeting-closing-prayer">Closing prayer</label>
          <input
            id="meeting-closing-prayer"
            name="closingPrayer"
            defaultValue={state.values?.closingPrayer ?? meeting?.closingPrayer ?? ''}
            aria-describedby="meeting-closing-prayer-error"
            required
          />
          <FieldError
            id="meeting-closing-prayer-error"
            messages={state.errors?.closingPrayer}
          />
        </div>
      </div>

      {state.message && (
        <p className="meeting-form-message" role="status" aria-live="polite">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
