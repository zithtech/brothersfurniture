import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchIcon } from '../components/Icons'
import CatalogueGrid from '../components/CatalogueGrid'
import CatalogueLightbox from '../components/CatalogueLightbox'
import { chairCatalogue, chairTypes, countOfType, ergonomicChairs, type ChairType } from '../data/ergonomicChairs'

const PAGE_SIZE = 16

const environments = [
  { title: 'Corporate Offices', text: 'Proper posture through extended hours, for more comfortable, productive teams.' },
  { title: 'Executive Cabins', text: 'Premium ergonomic seating that pairs refined design with superior comfort.' },
  { title: 'Home Workspaces', text: 'The support remote professionals need for efficient, comfortable home offices.' },
  { title: 'Collaborative Areas', text: 'Conference rooms and meeting spaces where comfort still matters.' },
]

const isChairType = (v: string | null): v is ChairType => chairTypes.some((t) => t.id === v)

export default function ErgonomicChairs() {
  const [params, setParams] = useSearchParams()
  const typeParam = params.get('type')
  const type: ChairType = isChairType(typeParam) ? typeParam : 'ergonomic-chairs'
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [open, setOpen] = useState<number | null>(null)

  const activeType = chairTypes.find((t) => t.id === type)!

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? chairCatalogue.filter((c) => c.name.toLowerCase().includes(q))
      : chairCatalogue.filter((c) => c.type === type)
  }, [type, query])

  const visible = filtered.slice(0, limit)

  const selectType = (t: ChairType) => {
    setParams({ type: t }, { replace: true })
    setQuery('')
    setLimit(PAGE_SIZE)
  }

  return (
    <>
      {/* Intro */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:px-10 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="border-l border-ink pl-4 text-sm font-medium uppercase tracking-wide">Science of sitting</div>
            <h1 className="mt-6 text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
              Ergonomic chairs
              <br />
              <span className="text-ink/40">built for long days.</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-ink/70">
              Engineered to reduce physical fatigue and protect posture — balanced support for the back, neck, shoulders
              and spine, manufactured in Chennai.
            </p>
            <p className="mt-6 text-sm tracking-wide">
              <span className="text-accent">{ergonomicChairs.length}</span> models
              <span className="mx-3 text-line">|</span>
              <span className="text-accent">{chairTypes.length}</span> seating types
            </p>
          </div>
        </div>
      </section>

      {/* Type tabs */}
      <div className="sticky top-20 z-30 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-10 md:flex-row md:items-center md:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="tablist">
            {chairTypes.map((t) => {
              const active = !query && t.id === type
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectType(t.id)}
                  className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                    active
                      ? 'bg-ink text-white shadow-md shadow-ink/20'
                      : 'bg-surface text-ink/70 hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  {t.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums ${
                      active ? 'bg-white/15 text-white/70' : 'bg-ink/5 text-muted transition-colors group-hover:bg-ink/10 group-hover:text-ink/60'
                    }`}
                  >
                    {countOfType(t.id)}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search field */}
          <div className="group relative w-full md:w-72 shrink-0">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30 transition-colors group-focus-within:text-ink/50" />
            <input
              type="search"
              placeholder={`Search all ${ergonomicChairs.length} models…`}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setLimit(PAGE_SIZE)
              }}
              className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-1 focus:ring-ink/10 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-2 py-10 md:flex-row md:items-end">
          <h2 className="text-2xl font-light tracking-tight">
            {query ? <>Results for “{query}”</> : activeType.label}
          </h2>
          <p className="max-w-md text-sm text-muted md:text-right">
            {query ? `${filtered.length} ${filtered.length === 1 ? 'model' : 'models'}` : activeType.blurb}
          </p>
        </div>

        {visible.length ? (
          <CatalogueGrid items={visible} onOpen={setOpen} />
        ) : (
          <p className="py-24 text-center text-muted">No chairs match your search.</p>
        )}

        {filtered.length > limit && (
          <div className="mt-12 text-center">
            <button onClick={() => setLimit((l) => l + PAGE_SIZE)} className="btn-outline">
              Load more ({filtered.length - limit})
            </button>
          </div>
        )}

        {/* Environments */}
        <section className="mt-28">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">Designed around real workplaces</p>
          <div className="mt-10 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {environments.map((e, i) => (
              <div key={e.title} className={`py-8 sm:pr-8 ${i ? 'lg:border-l lg:border-line lg:pl-8' : ''}`}>
                <p className="text-xs tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-3 text-lg font-light">{e.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {open !== null && visible[open] && (
        <CatalogueLightbox items={visible} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  )
}
