import { Link } from 'react-router-dom'
import { useCart } from '../context/cart'
import { formatPrice } from '../data/products'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580481077197-28564b97a2cb?w=600&q=80'
            }}
            className={`h-full w-full transition duration-700 group-hover:scale-105 ${
              product.cutout ? 'object-contain p-6 mix-blend-multiply' : 'object-cover'
            }`}
          />
        </Link>
        {(product.oldPrice || !product.inStock) && (
          <span
            className={`absolute left-4 top-4 px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-white ${
              product.inStock ? 'bg-accent' : 'bg-ink'
            }`}
          >
            {product.inStock ? 'Sale' : 'Sold out'}
          </span>
        )}
        <button
          disabled={!product.inStock}
          onClick={() => addItem(product)}
          className="absolute inset-x-4 bottom-4 translate-y-3 bg-ink py-3 text-sm tracking-wide text-white opacity-0 transition duration-300 hover:bg-accent group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 disabled:hidden max-lg:translate-y-0 max-lg:opacity-100"
        >
          Add to cart
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link to={`/product/${product.id}`} className="text-[15px] text-ink transition hover:text-accent">
            {product.name}
          </Link>
          <p className="mt-0.5 text-xs text-muted flex items-center gap-1 flex-wrap">
            <span className="uppercase tracking-[0.14em] text-stone-500">{product.category}</span>
            {product.subCategory && (
              <>
                <span className="text-stone-300">·</span>
                <span className="text-amber-800/90 font-medium text-[11px]">{product.subCategory}</span>
              </>
            )}
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          {product.oldPrice && <span className="text-[11px] text-muted line-through mb-0.5">{formatPrice(product.oldPrice)}</span>}
          <p className="font-medium text-ink">Starts from 4,XXX rs</p>
        </div>
      </div>
    </div>
  )
}
