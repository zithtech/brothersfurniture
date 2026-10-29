import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ClientLogo from '../components/ClientLogo'
import PageHeader from '../components/PageHeader'
import { SearchIcon } from '../components/Icons'
import { clients, sectors } from '../data/clients'

const PAGE_SIZE = 12

export default function Clients() {
  const [sector, setSector] = useState('All')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return clients.filter(
      (c) => (sector === 'All' || c.sector === sector) && (!q || c.name.toLowerCase().includes(q)),
    )
  }, [sector, query])

  const visible = filtered.slice(0, limit)

  const pickSector = (s: string) => {
    setSector(s)
    setLimit(PAGE_SIZE)
  }

  return (
    <>
      <PageHeader eyebrow="Our clients" title="Clients">
        Offices, hospitals, banks and cinemas furnished by Brothers Furniture.
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ── Filter bar ── */}
        <div className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {['All', ...sectors].map((s) => {
              const active = sector === s
              const count = s === 'All' ? clients.length : clients.filter((c) => c.sector === s).length
              return (
                <button
                  key={s}
                  onClick={() => pickSector(s)}
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                    active
                      ? 'bg-ink text-white shadow-md shadow-ink/20'
                      : 'bg-surface text-ink/70 hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  <span>{s}</span>
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                      active ? 'bg-white/15 text-white/70' : 'bg-ink/5 text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search field */}
          <div className="relative lg:w-72">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
            <input
              type="search"
              placeholder="Search clients…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setLimit(PAGE_SIZE)
              }}
              className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-1 focus:ring-ink/10"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />

        {/* Result count */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted">
            Showing <span className="font-medium text-ink">{visible.length}</span> of{' '}
            <span className="font-medium text-ink">{filtered.length}</span> clients
            {query && <> for "<span className="text-accent">{query}</span>"</>}
          </p>
        </div>

        {/* Client Grid */}
        <div className="mt-8 animate-fade-in">
          {visible.length ? (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {visible.map((c, i) => (
                <li
                  key={c.name}
                  className="group relative overflow-hidden rounded-2xl bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
                  style={{ animationDelay: `${(i % PAGE_SIZE) * 30}ms` }}
                >
                  <div className="flex h-36 items-center justify-center p-8 md:h-44 md:p-12">
                    <ClientLogo client={c} className="max-h-16" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent p-4 pt-8 backdrop-blur-[2px] transition-transform duration-300 translate-y-1 group-hover:translate-y-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] font-semibold text-ink line-clamp-1">{c.name}</span>
                      <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-ink/50 shadow-sm">
                        {c.sector}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="rounded-full bg-surface p-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-muted">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>
              <p className="mt-4 text-lg font-medium text-ink/70">No clients found</p>
              <p className="mt-1 text-sm text-muted">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Load more */}
        {filtered.length > limit && (
          <div className="mt-14 mb-4 text-center">
            <button
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
              className="group inline-flex items-center gap-3 rounded-full border border-ink px-8 py-3.5 text-sm font-medium tracking-wide transition-all hover:bg-ink hover:text-white"
            >
              Load more
              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs tabular-nums text-muted transition group-hover:bg-white/20 group-hover:text-white/70">
                {filtered.length - limit}
              </span>
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-28 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-mint to-[#c2e2db] p-10 md:p-16 shadow-xl shadow-mint/20 ring-1 ring-white/50">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-[60px]" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-800/60">Your business</p>
              <p className="mt-3 text-3xl font-light tracking-tight text-teal-950 sm:text-4xl">Become our next client.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-teal-950 px-8 py-4 text-[13px] font-medium tracking-wide text-white transition-all hover:scale-105 hover:bg-black hover:shadow-xl hover:shadow-teal-900/20"
            >
              Request wholesale pricing
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
