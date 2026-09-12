import { useId, useState, type SubmitEvent } from 'react';
import { submitContact } from '../service';
import { SOCIALS } from '../../../lib/site';

const email = SOCIALS.find((s) => s.href.startsWith('mailto:'));

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * The footer contact form. A real `<form action method="POST">` so it
 * works with zero JavaScript (Web3Forms accepts a plain HTML POST) —
 * progressive enhancement, matching this site's own nav history. When this
 * island hydrates (`client:visible` in Footer.astro), the submit handler
 * takes over for the polished inline states below; without JS, a real
 * submit still reaches Web3Forms and lands on their own confirmation page.
 *
 * States (docs/PRD.md §10 / user-flows.md "Error and empty states"):
 * idle -> submitting (button disabled, can't double-submit) -> success
 * (inline swap, no navigation, no /thanks route) -> error (visible message
 * + a mailto: fallback, never a silent failure or an infinite spinner).
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const form = new FormData(event.currentTarget);
    setStatus('submitting');

    const result = await submitContact({
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      message: String(form.get('message') ?? ''),
      botcheck: String(form.get('botcheck') ?? ''),
    });

    if (result.ok) {
      setStatus('success');
    } else {
      setErrorMessage(result.message);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <p role="status">Thanks — I'll get back to you.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="https://api.web3forms.com/submit"
      method="POST"
      className="max-w-column"
    >
      {/* Honeypot. The "hidden" utility (display:none) hides it from
          sighted users AND from screen readers (unlike sr-only, which
          would let a real screen-reader user perceive and fill this fake
          field) — and a display:none element can't receive focus by any
          means, which is exactly why autofill managers skip it too.
          Web3Forms' own spam filter checks whether a bot filled this in. */}
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />
      {/* No-JS path: a real form POST needs these as real fields. Safe to
          be static markup — the access key is public-by-design (see
          service.ts). */}
      <input type="hidden" name="access_key" value={import.meta.env.PUBLIC_WEB3FORMS_KEY} />
      <input type="hidden" name="subject" value="New message from garyreyes.pages.dev" />

      <div className="gap-gutter flex flex-col sm:flex-row">
        <label htmlFor={nameId} className="flex-1">
          <span className="text-meta text-ink-muted">Name</span>
          <input
            id={nameId}
            type="text"
            name="name"
            required
            className="border-rule mt-tight py-tight block w-full border-0 border-b bg-transparent"
          />
        </label>
        <label htmlFor={emailId} className="flex-1">
          <span className="text-meta text-ink-muted">Email</span>
          <input
            id={emailId}
            type="email"
            name="email"
            required
            className="border-rule mt-tight py-tight block w-full border-0 border-b bg-transparent"
          />
        </label>
      </div>

      <label htmlFor={messageId} className="mt-gutter block">
        <span className="text-meta text-ink-muted">Message</span>
        <textarea
          id={messageId}
          name="message"
          required
          rows={4}
          className="border-rule mt-tight py-tight block w-full border-0 border-b bg-transparent"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="text-meta text-ink -my-tight py-tight mt-gutter disabled:text-ink-muted underline underline-offset-4 hover:decoration-2 disabled:no-underline"
      >
        {status === 'submitting' ? 'Sending…' : 'Send'}
      </button>

      {status === 'error' && email && (
        <p role="alert" className="text-meta mt-gutter">
          {errorMessage} Email me directly instead:{' '}
          <a href={email.href} className="text-ink underline underline-offset-4 hover:decoration-2">
            {email.href.replace('mailto:', '')}
          </a>
        </p>
      )}
    </form>
  );
}
