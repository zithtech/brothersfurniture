import { useMemo, useState } from 'react'
import type { CatalogueItem, CatalogueType } from '../types'
import CatalogueGrid from './CatalogueGrid'
import CatalogueLightbox from './CatalogueLightbox'

const PAGE_SIZE = 16

interface Props {
  items: CatalogueItem[]
  types: CatalogueType[]
  /** `null` shows every type. */
  type: string | null
  query: string
  onTypeChange: (type: string | null) => void
  /** Singular / plural noun for the result count, e.g. ['chair', 'chairs']. */
  noun: [string, string]
  stockFilter?: 'all' | 'in_stock'
  onStockFilterChange?: (filter: 'all' | 'in_stock') => void
  sortBy?: string
  onSortByChange?: (sort: string) => void
}

/** Type sub-tabs, live stock filtering, search, sorting, and lightbox. */
export default function Catalogue({
  items,
  types,
  type,
  query,
  onTypeChange,
  noun,
  stockFilter = 'all',
  onStockFilterChange,
  sortBy = 'featured',
  onSortByChange,
}: Props) {
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [open, setOpen] = useState<number | null>(null)

  // 1. Filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((i) => {
      // Sub-type filter
      if (type && i.type !== type && i.typeLabel !== type && i.subCategory !== type) return false

      // Stock filter
      if (stockFilter === 'in_stock') {
        const isOut = i.inStock === false || (i.stockCount !== undefined && i.stockCount === 0)
        if (isOut) return false
      }

      // Keyword Search
      if (q) {
        const matchName = i.name.toLowerCase().includes(q)
        const matchSku = i.sku?.toLowerCase().includes(q)
        const matchBlurb = i.blurb.toLowerCase().includes(q)
        const matchType = i.typeLabel.toLowerCase().includes(q)
        const matchMaterial = i.material?.toLowerCase().includes(q)
        if (!matchName && !matchSku && !matchBlurb && !matchType && !matchMaterial) {
          return false
        }
      }

      return true
    })
  }, [items, type, query, stockFilter])

  // 2. Sort
  const sorted = useMemo(() => {
    const list = [...filtered]
    switch (sortBy) {
      case 'price_asc':
        return list.sort((a, b) => (a.price || 0) - (b.price || 0))
      case 'price_desc':
        return list.sort((a, b) => (b.price || 0) - (a.price || 0))
      case 'stock_desc':
        return list.sort((a, b) => (b.stockCount || 0) - (a.stockCount || 0))
      case 'name_asc':
        return list.sort((a, b) => a.name.localeCompare(b.name))
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }, [filtered, sortBy])

  const visible = sorted.slice(0, limit)
  const inStockCount = filtered.filter(
    (i) => i.inStock !== false && (i.stockCount === undefined || i.stockCount > 0)
  ).length

  const tabs = [
    { id: null, label: `All ${noun[1]}`, count: items.length },
    ...types.map((t) => ({
      id: t.id,
      label: t.label,
      count: items.filter((i) => i.type === t.id || i.typeLabel === t.label).length,
    })),
  ]

  return (
    <>
      {/* Sub-type tabs */}
      <div
        className={`mt-6 sm:mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none ${
          types.length ? '' : 'hidden'
        }`}
        role="tablist"
      >
        {tabs.map((t) => {
          const active = t.id === type
          return (
            <button
              key={t.label}
              role="tab"
              aria-selected={active}
              onClick={() => {
                onTypeChange(t.id)
                setLimit(PAGE_SIZE)
              }}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                active
                  ? 'border-ink bg-ink text-white shadow-sm'
                  : 'border-line bg-white text-ink/70 hover:border-ink/30 hover:text-ink'
              }`}
            >
              {t.label}
              <span
                className={`ml-2 rounded-full px-1.5 py-0.2 text-[10.5px] tabular-nums ${
                  active ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {t.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Control Bar: Result count & Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        {/* Count and stock info */}
        <div>
          <p className="text-xs sm:text-sm text-stone-600">
            Showing <span className="font-semibold text-ink">{visible.length}</span> of{' '}
            <span className="font-semibold text-ink">{filtered.length}</span>{' '}
            {filtered.length === 1 ? noun[0] : noun[1]}
            {query && (
              <>
                {' '}
                matching "<span className="font-semibold text-accent">{query}</span>"
              </>
            )}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{inStockCount} units in stock and available for immediate order</span>
          </div>
        </div>

        {/* Filters & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Stock Filter Toggle */}
          {onStockFilterChange && (
            <div className="inline-flex rounded-full border border-stone-200 bg-stone-50 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  onStockFilterChange('all')
                  setLimit(PAGE_SIZE)
                }}
                className={`rounded-full px-3 py-1 font-medium transition ${
                  stockFilter === 'all'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-stone-500 hover:text-ink'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => {
                  onStockFilterChange('in_stock')
                  setLimit(PAGE_SIZE)
                }}
                className={`rounded-full px-3 py-1 font-medium transition flex items-center gap-1.5 ${
                  stockFilter === 'in_stock'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-stone-500 hover:text-ink'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In Stock Only
              </button>
            </div>
          )}

          {/* Sort By Dropdown */}
          {onSortByChange && (
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink outline-none transition focus:border-ink/40 shadow-sm"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="stock_desc">Highest Stock</option>
                <option value="name_asc">Name: A to Z</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Grid Display */}
      <div key={`${type}-${query}-${stockFilter}-${sortBy}`} className="mt-6 animate-fade-in">
        {visible.length ? (
          <CatalogueGrid items={visible} onOpen={setOpen} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 sm:py-32 rounded-2xl bg-stone-50 border border-dashed border-stone-200">
            <div className="rounded-full bg-white p-5 shadow-sm border border-stone-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-8 w-8 text-stone-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
            <p className="mt-4 text-lg font-medium text-ink">No {noun[1]} found</p>
            <p className="mt-1 text-xs sm:text-sm text-muted text-center max-w-sm">
              We couldn't find any products matching your current filters or search term.
            </p>
            {(query || type || stockFilter !== 'all') && (
              <button
                onClick={() => {
                  onTypeChange(null)
                  onStockFilterChange?.('all')
                }}
                className="mt-5 rounded-full bg-ink px-5 py-2 text-xs font-medium text-white transition hover:bg-accent"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Load More Pagination */}
      {sorted.length > limit && (
        <div className="mt-14 mb-8 text-center">
          <button
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="group inline-flex items-center gap-3 rounded-full border border-ink bg-white px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wide transition-all hover:bg-ink hover:text-white shadow-sm"
          >
            <span>Load more models</span>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs tabular-nums text-stone-700 transition group-hover:bg-white/20 group-hover:text-white">
              +{sorted.length - limit} left
            </span>
          </button>
        </div>
      )}

      {/* Lightbox / Quick View */}
      {open !== null && visible[open] && (
        <CatalogueLightbox
          items={visible}
          index={open}
          onChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  )
}
