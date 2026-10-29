import { useState } from 'react'
import { Link } from 'react-router-dom'
import { chairCatalogue, chairTypes, countOfType, ergonomicChairs, type ChairType } from '../data/ergonomicChairs'
import CatalogueGrid from './CatalogueGrid'
import CatalogueLightbox from './CatalogueLightbox'
import { ArrowRight } from './Icons'

const PREVIEW_COUNT = 8

export default function ChairShowcase() {
  const [type, setType] = useState<ChairType>('ergonomic-chairs')
  const [open, setOpen] = useState<number | null>(null)
  const preview = chairCatalogue.filter((c) => c.type === type).slice(0, PREVIEW_COUNT)
  const total = countOfType(type)

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-10 md:pt-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">Ergonomic chair range</p>
          <h2 className="mt-6 text-4xl font-light leading-[1.15] tracking-tight md:text-5xl">
            {ergonomicChairs.length} models,
            <span className="text-ink/40"> five specialized seating lines.</span>
          </h2>
        </div>
        <Link to="/ergonomic-chairs" className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide">
          <span className="border-b border-ink pb-0.5 transition group-hover:border-accent group-hover:text-accent">
            View all chairs
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </div>

      <div className="mt-10 flex gap-8 overflow-x-auto border-b border-line" role="tablist">
        {chairTypes.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === type}
            onClick={() => setType(t.id)}
            className={`relative shrink-0 whitespace-nowrap pb-4 text-[15px] transition ${
              t.id === type
                ? 'text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-accent'
                : 'text-muted hover:text-ink'
            }`}
          >
            {t.label}
            <sup className="ml-1 text-[10px] text-muted">{countOfType(t.id)}</sup>
          </button>
        ))}
      </div>

      <div key={type} className="mt-8 animate-fade-in">
        <CatalogueGrid items={preview} onOpen={setOpen} />
      </div>

      {total > PREVIEW_COUNT && (
        <div className="mt-10 text-center">
          <Link to={`/ergonomic-chairs?type=${type}`} className="btn-outline">
            See all {total} {chairTypes.find((t) => t.id === type)!.label.toLowerCase()}
          </Link>
        </div>
      )}

      {open !== null && preview[open] && (
        <CatalogueLightbox items={preview} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
