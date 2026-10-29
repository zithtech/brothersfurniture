import { Link } from 'react-router-dom'

interface PerkItem {
  n: string
  title: string
  text: string
  badge: string
  icon: (props: { className?: string }) => React.JSX.Element
}

function SpacePlanningIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 10h11v11" />
      <path d="M14 15h7" />
      <path d="M7 6h2" />
      <path d="M17 6h2" />
      <circle cx="8" cy="15.5" r="1" fill="currentColor" />
    </svg>
  )
}

function DeliveryInstallIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-2.24-2.8a1 1 0 0 0-.78-.38H14v8.45" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  )
}

function WarrantyIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function BulkPricingIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

const perks: PerkItem[] = [
  {
    n: '01',
    title: 'Free space planning',
    text: 'Layouts drawn to your floor plan.',
    badge: '2D & 3D CAD',
    icon: SpacePlanningIcon,
  },
  {
    n: '02',
    title: 'Delivery & install',
    text: 'Assembled on site by our own team.',
    badge: 'White-Glove',
    icon: DeliveryInstallIcon,
  },
  {
    n: '03',
    title: '10-year warranty',
    text: 'On every frame and mechanism.',
    badge: 'Guaranteed',
    icon: WarrantyIcon,
  },
  {
    n: '04',
    title: 'Bulk pricing',
    text: 'Tailored quotes for full fit-outs.',
    badge: 'B2B Rates',
    icon: BulkPricingIcon,
  },
]

export default function Perks() {
  return (
    <section aria-label="Commercial fit-out advantages" className="mx-auto mt-8 sm:mt-12 md:mt-14 max-w-7xl px-3 sm:px-6 lg:px-10">
      <div className="overflow-hidden rounded-2xl border border-line/80 bg-[#fafaf8]/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] backdrop-blur-xs">
        <div className="grid grid-cols-1 divide-y divide-line/70 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
          {perks.map((p, index) => (
            <Link
              key={p.n}
              to="/contact"
              className={`group flex items-center gap-3 sm:gap-3.5 px-3.5 py-3 sm:px-4 sm:py-3.5 transition-all duration-200 hover:bg-white ${
                index % 2 === 0 ? 'sm:border-r sm:border-line/70 lg:border-r-0' : ''
              }`}
            >
              {/* Icon Container */}
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-line/80 bg-white text-ink transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <p.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200" />
              </div>

              {/* Text Lockup */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-accent">
                    {p.n}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-ink/20" />
                  <h3 className="text-xs sm:text-[13.5px] font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent truncate">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-0.5 text-[10.5px] sm:text-[11.5px] text-muted leading-tight truncate sm:whitespace-normal">
                  {p.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
