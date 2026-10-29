import { useMemo, useState } from 'react'
import { catalogues } from '../data/catalogues'
import { categories } from '../data/products'
import { inferTypeFromCategory, type CatalogueItem, type Category } from '../types'
import { useNavigate } from 'react-router-dom'
import CatalogueGrid from './CatalogueGrid'
import CatalogueLightbox from './CatalogueLightbox'
import { ArrowRight } from './Icons'

const PREVIEW_COUNT = 4

interface Props {
  onSelect: (category: Category) => void
  items?: CatalogueItem[]
  backendOnline?: boolean
}

/** Shop "All" view — dynamic preview rows for every category backed by live database inventory. */
export default function CatalogueOverview({ onSelect, items, backendOnline = true }: Props) {
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState<{ items: CatalogueItem[]; index: number } | null>(null)

  // Group dynamic items by category
  const categoryGroups = useMemo(() => {
    if (!items || items.length === 0) {
      // Fallback to static catalogue entries if dynamic items aren't ready
      return (Object.entries(catalogues) as [Category, (typeof catalogues)[Category]][]).map(
        ([category, c]) => ({
          category,
          intro: c.intro,
          items: c.items,
          types: c.types.map((t) => t.label),
          inStockCount: c.items.length,
        })
      )
    }

    return categories.map((cat) => {
      const catItems = items.filter((i) => i.category === cat)
      const intro =
        catalogues[cat]?.intro ||
        `Commercial-grade ${cat.toLowerCase()} manufactured in our Chennai industrial unit.`
      
      const subTypes = Array.from(new Set(catItems.map((i) => i.typeLabel).filter(Boolean)))
      const inStockCount = catItems.filter((i) => i.inStock !== false).length

      return {
        category: cat,
        intro,
        items: catItems,
        types: subTypes,
        inStockCount,
      }
    })
  }, [items])

  const totalProducts = items && items.length > 0 ? items.length : Object.values(catalogues).reduce((n, c) => n + c.items.length, 0)
  const totalInStock = items && items.length > 0 ? items.filter((i) => i.inStock !== false).length : totalProducts

  return (
    <>
      {/* Live Summary Stats Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-stone-50 border border-stone-200/70 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <p className="text-xs sm:text-sm text-stone-700">
            <span className="text-base font-semibold text-ink">{totalProducts}</span> total factory models across{' '}
            <span className="font-semibold text-ink">{categoryGroups.length}</span> categories
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-white border border-emerald-200/80 px-3 py-1 rounded-full shadow-sm">
          <span>● {totalInStock} Models Ready in Factory</span>
          {backendOnline && (
            <span className="text-[10px] text-emerald-600 font-mono">(Live)</span>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-20">
        {categoryGroups.map(({ category, intro, items: catItems, types, inStockCount }, i) => {
          const preview = catItems.slice(0, PREVIEW_COUNT)
          if (catItems.length === 0) return null

          return (
            <section key={category} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              {/* Section Header */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-200/70 text-xs font-semibold tabular-nums text-stone-700">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                      {category} Collection
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-ink flex items-center gap-3">
                    <span>{category}</span>
                    <span className="rounded-full bg-stone-100 border border-stone-200/70 px-2.5 py-0.5 text-xs font-semibold text-stone-600 align-middle">
                      {catItems.length} models · {inStockCount} in stock
                    </span>
                  </h2>

                  <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted">{intro}</p>

                  {/* Subtypes Pills */}
                  {types.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {types.slice(0, 5).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            const pType = inferTypeFromCategory(category);
                            navigate(`/shop?type=${encodeURIComponent(pType)}&category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(t)}`);
                          }}
                          className="rounded-full bg-white border border-stone-200/80 px-2.5 py-0.5 text-[10.5px] font-medium text-stone-700 hover:border-ink hover:text-ink transition cursor-pointer shadow-xs"
                        >
                          {t}
                        </button>
                      ))}
                      {types.length > 5 && (
                        <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10.5px] text-stone-500">
                          +{types.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onSelect(category)}
                  className="group inline-flex shrink-0 items-center gap-2 self-start sm:self-end rounded-full border border-ink/30 px-5 py-2.5 text-xs sm:text-sm font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-white shadow-sm"
                >
                  <span>View all {catItems.length}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Grid Preview */}
              <CatalogueGrid items={preview} onOpen={(index) => setLightbox({ items: preview, index })} />
            </section>
          )
        })}
      </div>

      {lightbox && (
        <CatalogueLightbox
          items={lightbox.items}
          index={lightbox.index}
          onChange={(index) => setLightbox({ ...lightbox, index })}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
