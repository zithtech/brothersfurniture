import { useEffect, useState } from 'react'
import { useProducts } from '../context/products'
import { overallRating, testimonials as staticTestimonials } from '../data/testimonials'

const AUTOPLAY_SECONDS = 15
const monogramTints = ['bg-mint', 'bg-sky', 'bg-sand']

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

function Stars({ value, className = 'h-3.5 w-3.5' }: { value: number; className?: string }) {
  return (
    <span className="flex gap-1" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden className={`${className} ${i < Math.round(value) ? 'fill-accent' : 'fill-line'}`}>
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </span>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Testimonials() {
  const { testimonials: liveTestimonials } = useProducts()
  const testimonials = liveTestimonials && liveTestimonials.length > 0 ? liveTestimonials : staticTestimonials
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(AUTOPLAY_SECONDS)
  const count = testimonials.length

  const handleSelect = (i: number) => {
    setIndex(i)
    setSecondsLeft(AUTOPLAY_SECONDS)
  }

  // Countdown tick every second
  useEffect(() => {
    if (paused || count < 2) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [paused, count, index])

  // Advance slide cleanly when countdown reaches 0
  useEffect(() => {
    if (secondsLeft <= 0) {
      setIndex((i) => (i + 1) % count)
      setSecondsLeft(AUTOPLAY_SECONDS)
    }
  }, [secondsLeft, count])

  const t = testimonials[index]

  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 lg:gap-0 px-3 sm:px-6 py-10 sm:py-14 lg:px-10 lg:grid-cols-12">
        {/* Rating */}
        <div className="flex flex-col lg:col-span-4 lg:border-r lg:border-line lg:pr-10 xl:pr-14">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-accent">Client reviews</p>
          <h2 className="mt-2.5 sm:mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-light leading-[1.15] tracking-tight text-ink">
            Trusted by
            <br />
            <span className="text-ink/40">corporate hubs.</span>
          </h2>

          {/* Compact static gap */}
          <div className="mt-5 sm:mt-7">
            <div className="flex items-end gap-3 sm:gap-3.5">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-[0.85] tracking-tighter text-ink">{overallRating.score}</span>
              <div className="pb-0.5">
                <Stars value={overallRating.score} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <p className="mt-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Overall rating</p>
              </div>
            </div>
            <p className="mt-2.5 sm:mt-3.5 max-w-xs text-xs sm:text-[13.5px] leading-relaxed text-ink/70">
              Based on <span className="font-semibold text-ink">{overallRating.projects}</span> turnkey office spaces, premium cafés and
              public lounge installations completed nationwide.
            </p>
          </div>
        </div>

        {/* Quote */}
        <figure
          className="flex flex-col justify-between lg:col-span-8 lg:pl-10 xl:pl-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div>
            <div className="flex items-start justify-between">
              <span className="-mt-2 h-8 sm:h-9 font-serif text-5xl sm:text-6xl lg:text-7xl leading-none text-accent" aria-hidden>
                “
              </span>
              <Stars value={t.rating} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>

            {/* Static height container so the section NEVER resizes or shifts when the message changes */}
            <div className="mt-2 sm:mt-3 min-h-[140px] sm:min-h-[110px] md:min-h-[95px] flex items-center">
              <blockquote key={index} className="animate-rise w-full">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-light leading-[1.42] tracking-tight text-ink">
                  {t.quote}
                </p>
              </blockquote>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-5 border-t border-line pt-4 sm:pt-5 sm:flex-row sm:items-center sm:justify-between">
            <figcaption key={`a-${index}`} className="flex animate-fade-in items-center gap-3.5 sm:gap-4">
              <span
                className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-xs sm:text-sm font-semibold tracking-wider ${monogramTints[index % monogramTints.length]
                  }`}
              >
                {initials(t.name)}
              </span>
              <div>
                <span className="block text-sm sm:text-base lg:text-lg font-medium text-ink">{t.name}</span>
                <span className="block text-xs sm:text-sm text-muted">
                  {t.role}, {t.company}
                </span>
              </div>
            </figcaption>

            {count > 1 && (
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Dot Type Swapper with Circular Countdown Timer - Increased Size */}
                <div className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-line bg-white px-3 py-1 sm:px-4 sm:py-2 shadow-xs backdrop-blur-xs">
                  {testimonials.map((r, i) => {
                    const active = i === index
                    return (
                      <button
                        key={r.name}
                        onClick={() => handleSelect(i)}
                        aria-label={`Go to review ${i + 1}: ${r.name}`}
                        className="group relative flex items-center justify-center p-0.5 transition-transform hover:scale-105 focus:outline-none"
                      >
                        {active ? (
                          <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-xs">
                            {/* Circular Countdown Ring */}
                            <svg className="absolute inset-0 h-full w-full -rotate-90 transform p-0.5" viewBox="0 0 36 36">
                              <circle
                                cx="18"
                                cy="18"
                                r="15"
                                className="stroke-neutral-200 fill-none"
                                strokeWidth="2.8"
                              />
                              <circle
                                cx="18"
                                cy="18"
                                r="15"
                                className="stroke-accent fill-none transition-[stroke-dashoffset] duration-1000 ease-linear"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeDasharray="94.25"
                                strokeDashoffset={94.25 * (1 - secondsLeft / AUTOPLAY_SECONDS)}
                              />
                            </svg>
                            {/* Countdown Number inside circle */}
                            <span className="relative z-10 text-[11px] sm:text-sm font-bold text-ink select-none tabular-nums leading-none">
                              {secondsLeft}
                            </span>
                          </div>
                        ) : (
                          <span className="block h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 rounded-full bg-ink/20 transition-all duration-200 group-hover:scale-125 group-hover:bg-ink/40" />
                        )}
                      </button>
                    )
                  })}
                </div>

                <span className="text-xs sm:text-sm lg:text-base font-mono tabular-nums tracking-wider text-ink">
                  {pad(index + 1)} <span className="text-muted">/ {pad(count)}</span>
                </span>
              </div>
            )}
          </div>
        </figure>
      </div>
    </section>
  )
}
