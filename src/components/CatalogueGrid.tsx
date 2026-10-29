import { formatPrice } from '../data/products'
import type { CatalogueItem } from '../types'

interface Props {
  items: CatalogueItem[]
  onOpen: (index: number) => void
}

/** Bordered grid of catalogue cards with live inventory badges, SKU, pricing, and quick-view trigger. */
export default function CatalogueGrid({ items, onOpen }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => {
        const isOutOfStock = item.inStock === false || (item.stockCount !== undefined && item.stockCount === 0)
        const isLowStock = !isOutOfStock && item.stockCount !== undefined && item.stockCount <= 5
        const isInStock = !isOutOfStock && item.stockCount !== undefined && item.stockCount > 5

        return (
          <li key={item.id} className="flex">
            <button
              onClick={() => onOpen(i)}
              className="group flex flex-col w-full text-left bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-ink/10"
            >
              {/* Image Container */}
              <div
                className={`relative aspect-square w-full overflow-hidden transition-colors duration-300 ${
                  item.fit === 'contain' ? 'bg-[#fcfbf9] p-4 md:p-6 ring-1 ring-line' : 'bg-surface'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                  className={`h-full w-full transition duration-700 ease-out group-hover:scale-[1.05] ${
                    item.fit === 'contain' ? 'object-contain mix-blend-multiply' : 'object-cover'
                  }`}
                />

                {/* Hover overlay with Quick View */}
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-ink/70 via-ink/20 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="translate-y-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-lg transition-all duration-300 group-hover:translate-y-0 hover:bg-accent hover:text-white">
                    Quick View
                  </span>
                </div>

                {/* Subcategory / Type badge (Top-Left) */}
                <span className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-ink/75 backdrop-blur-md shadow-sm border border-stone-200/50 max-w-[65%] truncate">
                  {item.typeLabel}
                </span>

                {/* Live Stock Badge (Top-Right) */}
                <div className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10">
                  {isOutOfStock ? (
                    <span className="rounded-full bg-stone-900/90 text-stone-200 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm">
                      Sold Out
                    </span>
                  ) : isLowStock ? (
                    <span className="rounded-full bg-amber-500/95 text-white px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Only {item.stockCount} left
                    </span>
                  ) : isInStock ? (
                    <span className="rounded-full bg-emerald-700/90 text-white px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      In Stock ({item.stockCount})
                    </span>
                  ) : item.featured ? (
                    <span className="rounded-full bg-accent/90 text-white px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm">
                      Featured
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 flex flex-col justify-between p-3 sm:p-3.5">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-[15px] font-medium text-ink transition group-hover:text-accent line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="shrink-0 text-[10px] tabular-nums text-muted font-mono pt-0.5">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* SKU and Features */}
                  <div className="mt-1 flex items-center gap-2">
                    {item.sku && (
                      <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                        {item.sku}
                      </span>
                    )}
                    {item.features.length > 0 && (
                      <p className="line-clamp-1 text-[11px] text-muted truncate">
                        {item.features.slice(0, 2).join(' · ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price and Stock Summary Footer */}
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    {item.price ? (
                      <>
                        <span className="text-xs sm:text-sm font-semibold text-ink">
                          {formatPrice(item.price)}
                        </span>
                        {item.oldPrice && (
                          <span className="text-[11px] text-stone-400 line-through">
                            {formatPrice(item.oldPrice)}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-xs sm:text-[13px] font-medium text-ink/80">
                        Starts from 4,XXX rs
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-accent group-hover:underline">
                    Details →
                  </span>
                </div>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
