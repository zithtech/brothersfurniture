import { Link } from 'react-router-dom'
import { useProducts } from '../context/products'
import { clients as staticClients, type Client } from '../data/clients'
import ClientLogo from './ClientLogo'
import { ArrowRight } from './Icons'

const TWO_ROW_THRESHOLD = 12
const SECONDS_PER_LOGO = 3.5
const MIN_LOGOS_PER_ROW = 10

function MarqueeRow({ items: source, reverse = false }: { items: Client[]; reverse?: boolean }) {
  // Repeat short lists so a row is always wider than the screen and the loop never shows a gap.
  const repeats = Math.max(1, Math.ceil(MIN_LOGOS_PER_ROW / source.length))
  const items = Array.from({ length: repeats }, () => source).flat()

  return (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto">
      {/* Two identical copies so the loop is seamless; the second is hidden from screen readers. */}
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 animate-marquee group-hover/row:[animation-play-state:paused] ${reverse ? '[animation-direction:reverse]' : ''}`}
          style={{ animationDuration: `${items.length * SECONDS_PER_LOGO}s` }}
        >
          {items.map((c, i) => (
            <li key={`${c.name}-${i}`} className="group flex h-28 w-44 shrink-0 items-center justify-center px-7 md:h-32 md:w-56 md:px-9">
              <ClientLogo client={c} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default function Clients() {
  const { clients: liveClients } = useProducts()
  const clients = liveClients && liveClients.length > 0 ? liveClients : staticClients
  const rows =
    clients.length > TWO_ROW_THRESHOLD
      ? [clients.filter((_, i) => i % 2 === 0), clients.filter((_, i) => i % 2 === 1)]
      : [clients]

  return (
    <section className="pb-16 pt-16 sm:pb-20 sm:pt-20 md:pb-28 md:pt-28">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:gap-6 px-3 sm:px-6 lg:px-10 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-accent">Our clients</p>
          <h2 className="mt-3 sm:mt-6 text-3xl sm:text-4xl font-light leading-[1.15] tracking-tight md:text-5xl">
            Trusted by teams
            <span className="text-ink/40"> across industries.</span>
          </h2>
        </div>
        <Link to="/clients" className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide">
          <span className="border-b border-ink pb-0.5 transition group-hover:border-accent group-hover:text-accent">
            View all {clients.length} clients
          </span>
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </div>

      <div className="mx-auto mt-10 sm:mt-14 max-w-7xl border-y border-line sm:px-6 lg:px-10">
        {rows.map((row, i) => (
          <div key={i} className={i ? 'border-t border-line' : ''}>
            <MarqueeRow items={row} reverse={i === 1} />
          </div>
        ))}
      </div>
    </section>
  )
}
