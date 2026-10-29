import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company, whatsappLink } from '../data/company'
import { faqs } from '../data/faqs'
import { ArrowRight } from './Icons'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
      <div className="grid gap-8 sm:gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-accent">FAQ</p>
          <h2 className="mt-3 sm:mt-6 text-3xl sm:text-4xl font-light leading-[1.15] tracking-tight md:text-5xl">
            Questions,
            <br />
            <span className="text-ink/40">answered.</span>
          </h2>
          <p className="mt-3 sm:mt-6 max-w-xs text-xs sm:text-sm leading-relaxed text-muted">
            Can’t find what you’re looking for? Talk to us directly.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap sm:flex-col gap-3 text-xs sm:text-sm">
            <a href={`tel:${company.phones[0].tel}`} className="group inline-flex items-center gap-2 font-medium">
              <span className="border-b border-ink pb-0.5 transition group-hover:border-accent group-hover:text-accent">
                Call {company.phones[0].display}
              </span>
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 font-medium">
              <span className="border-b border-ink pb-0.5 transition group-hover:border-accent group-hover:text-accent">
                Chat on WhatsApp
              </span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </a>
            <Link to="/contact" className="group inline-flex items-center gap-2 font-medium">
              <span className="border-b border-ink pb-0.5 transition group-hover:border-accent group-hover:text-accent">
                Send an enquiry
              </span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </div>
        </div>

        <ul className="border-t border-ink lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full items-baseline gap-4 py-3.5 text-left md:py-4"
                  >
                    <span className={`w-5 shrink-0 text-[10px] tabular-nums font-semibold transition-colors ${isOpen ? 'text-accent' : 'text-muted'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[15px] font-medium leading-snug tracking-tight transition-colors group-hover:text-ink md:text-[16px]">
                      {f.q}
                    </span>
                    <span className="relative h-3 w-3 shrink-0 self-center" aria-hidden>
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink" />
                      <span
                        className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink transition-transform duration-300 ${
                          isOpen ? 'scale-y-0' : 'scale-y-100'
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-4 pl-9 pr-6 text-[13px] leading-relaxed text-ink/70">{f.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </section>
  )
}
