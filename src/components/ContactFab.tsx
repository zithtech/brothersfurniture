import { company, whatsappLink } from '../data/company'

/** Floating call + WhatsApp shortcuts, bottom-right on every page. */
export default function ContactFab() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:bottom-8 md:right-8">
      <a
        href={`tel:${company.phones[0].tel}`}
        aria-label={`Call ${company.phones[0].display}`}
        title={company.phones[0].display}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:bg-accent"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
          />
        </svg>
      </a>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 5.1 5.1 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
        </svg>
      </a>
    </div>
  )
}
