import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cart'
import { formatPrice } from '../data/products'
import type { CatalogueItem, Product } from '../types'
import { ChevronLeft, ChevronRight, CloseIcon } from './Icons'

interface Props {
  items: CatalogueItem[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

export default function CatalogueLightbox({ items, index, onChange, onClose }: Props) {
  const item = items[index]
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const step = (dir: 1 | -1) => {
    setQty(1)
    setAdded(false)
    onChange((index + dir + items.length) % items.length)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [index, items.length, onChange, onClose])

  const isOutOfStock = item.inStock === false || (item.stockCount !== undefined && item.stockCount === 0)
  const isLowStock = !isOutOfStock && item.stockCount !== undefined && item.stockCount <= 5
  const maxStock = item.stockCount !== undefined && item.stockCount > 0 ? item.stockCount : 99

  const handleAddToCart = () => {
    const productObj: Product = {
      id: item.id,
      name: item.name,
      sku: item.sku,
      category: item.category || 'Office Chairs',
      subCategory: item.typeLabel,
      price: item.price || 4500,
      oldPrice: item.oldPrice,
      rating: item.rating || 4.7,
      image: item.src,
      cutout: item.fit === 'contain',
      description: item.blurb,
      material: item.material || 'Commercial grade',
      dimensions: item.dimensions || 'Standard',
      inStock: item.inStock ?? true,
      stockCount: item.stockCount,
      featured: item.featured,
    }
    addItem(productObj, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-ink/60 p-3 sm:p-4 md:p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl shadow-ink/30 md:grid-cols-[1.1fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2.5 text-ink/70 backdrop-blur-sm shadow-md transition hover:bg-ink hover:text-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Product Visual Container */}
        <div className="flex flex-col items-center justify-center relative bg-gradient-to-b from-[#f8f7f5] to-surface p-6 sm:p-8 md:p-12">
          {/* Top Floating Badges */}
          <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent shadow-sm border border-stone-200/60">
              {item.typeLabel}
            </span>
            {item.sku && (
              <span className="font-mono text-[10px] text-stone-500 bg-white/80 px-2 py-1 rounded shadow-sm border border-stone-200/60">
                {item.sku}
              </span>
            )}
          </div>

          <img
            key={item.id}
            src={item.src}
            alt={item.name}
            className="aspect-square w-full max-w-[420px] animate-fade-in object-contain mix-blend-multiply drop-shadow-md"
          />

          {/* Quick Counter */}
          <div className="mt-4 flex items-center justify-between w-full max-w-[420px] text-xs text-stone-400">
            <span>Model #{String(index + 1).padStart(2, '0')}</span>
            <span className="font-mono">Chennai Factory Unit</span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col p-6 sm:p-8 md:p-10 justify-between">
          <div>
            {/* Live Inventory Status Pill */}
            <div className="mb-4">
              {isOutOfStock ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 border border-stone-200 px-3 py-1 text-xs font-medium text-stone-700">
                  <span className="h-2 w-2 rounded-full bg-stone-400" />
                  <span>Custom Manufactured · Lead Time: 5–7 Days</span>
                </div>
              ) : isLowStock ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-800">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Low Stock: Only {item.stockCount} units remaining in Chennai</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    In Stock
                    {item.stockCount !== undefined && ` (${item.stockCount} ready for dispatch)`}
                  </span>
                </div>
              )}
            </div>

            <h2 key={item.id} className="animate-fade-in text-2xl sm:text-3xl font-normal leading-tight tracking-tight text-ink">
              {item.name}
            </h2>

            {/* Price Row */}
            <div className="mt-4 flex items-baseline gap-3">
              {item.price ? (
                <>
                  <span className="text-2xl sm:text-3xl font-semibold text-ink">
                    {formatPrice(item.price)}
                  </span>
                  {item.oldPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatPrice(item.oldPrice)}
                    </span>
                  )}
                  <span className="text-xs text-muted font-normal">(Excl. taxes / Wholesale)</span>
                </>
              ) : (
                <span className="text-2xl font-medium text-ink">Starts from 4,XXX rs</span>
              )}
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-ink/70">
              {item.blurb}
            </p>

            {/* Specifications Summary */}
            {(item.material || item.dimensions) && (
              <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-stone-50 p-3.5 border border-stone-200/60 text-xs">
                {item.material && (
                  <div>
                    <span className="font-semibold text-stone-500 block uppercase text-[9.5px] tracking-wider">Material</span>
                    <span className="text-stone-800 font-medium line-clamp-2">{item.material}</span>
                  </div>
                )}
                {item.dimensions && (
                  <div>
                    <span className="font-semibold text-stone-500 block uppercase text-[9.5px] tracking-wider">Dimensions</span>
                    <span className="text-stone-800 font-medium line-clamp-2">{item.dimensions}</span>
                  </div>
                )}
              </div>
            )}

            {/* Highlights List */}
            <div className="mt-5 border-t border-line pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                Key Factory Highlights
              </p>
              <ul className="mt-3 space-y-2">
                {[...item.features.slice(0, 3), 'Bulk & wholesale layout pricing available'].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-ink/75">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row & Navigation */}
          <div className="mt-8 pt-4 border-t border-line">
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center rounded-xl border border-line bg-white shadow-sm h-11 px-2">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-2.5 text-stone-500 hover:text-ink text-base font-semibold"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-semibold tabular-nums text-ink">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(maxStock, q + 1))}
                  className="px-2.5 text-stone-500 hover:text-ink text-base font-semibold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="flex-1 h-11 inline-flex items-center justify-center rounded-xl bg-ink text-white text-xs sm:text-sm font-semibold tracking-wide transition hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {added ? 'Added to Cart ✓' : isOutOfStock ? 'Made to Order' : 'Add to Cart'}
              </button>
            </div>

            {/* Quote and Full Spec Links */}
            <div className="flex gap-2">
              <Link
                to={`/product/${item.id}`}
                className="flex-1 rounded-xl border border-ink/20 py-2.5 text-center text-xs font-medium text-ink transition hover:border-ink hover:bg-stone-50"
              >
                Full Spec Sheet
              </Link>
              <Link
                to={`/contact?product=${encodeURIComponent(item.name)}`}
                className="flex-1 rounded-xl bg-stone-100 py-2.5 text-center text-xs font-medium text-stone-800 transition hover:bg-stone-200"
              >
                Request Floor Plan Quote
              </Link>
            </div>

            {/* Bottom Nav arrows */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted">
              <span>
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous item"
                  className="rounded-full border border-line p-2 text-ink/60 transition hover:border-ink hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Next item"
                  className="rounded-full border border-line p-2 text-ink/60 transition hover:border-ink hover:text-ink"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
