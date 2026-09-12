/**
 * The only outbound call in this app (ARCHITECTURE.md "Structure checks").
 * No component calls Web3Forms directly — everything goes through here.
 *
 * Verified live against Web3Forms' current docs 2026-09-12 (PROJECT_FACTS.md
 * "Contact form"), not assumed from memory: success/failure is determined by
 * the HTTP status code, not a `success` boolean in the response body. The
 * response body is just `{ message: string }` either way.
 */
const ENDPOINT = 'https://api.web3forms.com/submit';
// If Web3Forms' servers hang without ever responding, the fetch below would
// otherwise wait as long as the browser's own TCP timeout (well over a
// minute) with the button stuck on "Sending…" — worse than the designed
// error state (PRD §10: "never a silent failure or an infinite spinner").
// Caught in review; a real network *error* was already handled below, this
// covers the no-response case specifically.
const TIMEOUT_MS = 15_000;

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Honeypot — Web3Forms' own spam filter reads this; always empty for a
   *  real visitor. Passed through verbatim from the hidden form field. */
  botcheck: string;
}

export interface ContactResult {
  ok: boolean;
  message: string;
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;

  if (!accessKey) {
    // Fails loud in dev if .env is missing PUBLIC_WEB3FORMS_KEY, instead of
    // silently posting an empty access_key to Web3Forms and getting a
    // confusing rejection back.
    return { ok: false, message: 'Contact form is not configured.' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'New message from garyreyes.pages.dev',
        ...payload,
      }),
      signal: controller.signal,
    });

    const data: { message?: string } = await res.json().catch(() => ({}));

    return {
      ok: res.ok,
      message: data.message ?? (res.ok ? 'Message sent.' : 'Something went wrong.'),
    };
  } catch (error) {
    // Network failure (offline, DNS, CORS) or the timeout above aborting —
    // both throw here. Never let this reach the component as an exception;
    // the form's error state is what PRD §10 requires either way.
    const timedOut = error instanceof DOMException && error.name === 'AbortError';
    return { ok: false, message: timedOut ? 'Request timed out.' : 'Network error.' };
  } finally {
    clearTimeout(timeout);
  }
}
