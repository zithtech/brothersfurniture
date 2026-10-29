import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { useCart } from '../context/cart'
import { useProducts } from '../context/products'
import { formatPrice } from '../data/products'
import type { Product } from '../types'

export default function ProductDetail() {
  const { id = '' } = useParams()
  const { products, getProduct, fetchProduct } = useProducts()
  const [product, setProduct] = useState<Product | null>(() => getProduct(id) || null)
  const [loading, setLoading] = useState(!product)
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [added, setAdded] = useState(false)

  useEffect(() => {
    let isMounted = true
    const existing = getProduct(id)
    if (existing) {
      setProduct(existing)
      setLoading(false)
      return
    }

    setLoading(true)
    fetchProduct(id)
      .then((res) => {
        if (isMounted) {
          setProduct(res)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id, getProduct, fetchProduct])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="mt-4 text-sm text-muted">Loading product details…</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-10">
        <h1 className="text-4xl font-medium">Product not found</h1>
        <Link to="/shop" className="mt-8 btn-outline">
          Back to shop
        </Link>
      </div>
    )
  }

  const relatedSub = product.subCategory
    ? products.filter((p) => p.subCategory === product.subCategory && p.id !== product.id)
    : []
  const relatedCat = products.filter((p) => p.category === product.category && p.id !== product.id)
  const related = Array.from(new Set([...relatedSub, ...relatedCat]))
  const more = (related.length ? related : products.filter((p) => p.id !== product.id)).slice(0, 4)

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-10">
      <nav className="text-xs sm:text-sm text-muted flex items-center flex-wrap gap-1.5">
        <Link to="/" className="hover:text-accent transition">Home</Link>
        <span className="text-stone-300">/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-accent transition">
          {product.category}
        </Link>
        {product.subCategory && (
          <>
            <span className="text-stone-300">/</span>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}&subCategory=${encodeURIComponent(product.subCategory)}`}
              className="hover:text-accent transition text-stone-600"
            >
              {product.subCategory}
            </Link>
          </>
        )}
        <span className="text-stone-300">/</span>
        <span className="text-ink font-medium">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <div className="flex flex-col gap-3">
          <div className="flex aspect-square items-center justify-center overflow-hidden bg-surface rounded-xl">
            <img
              src={selectedImage || (product.cutout ? product.image : product.image.replace('w=900', 'w=1400'))}
              alt={product.name}
              className={product.cutout ? 'w-full object-contain p-10 mix-blend-multiply' : 'h-full w-full object-cover'}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580481077197-28564b97a2cb?w=1200&q=80'
              }}
            />
          </div>

          {/* Multiple Image Gallery Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1">
              {product.images.map((img, idx) => {
                const imgUrl = typeof img === 'string' ? img : img.url
                const isActive = (selectedImage || product.image) === imgUrl
                return (
                  <button
                    key={(typeof img === 'object' && img.id) || idx}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg border-2 p-1 bg-surface overflow-hidden transition cursor-pointer ${
                      isActive ? 'border-accent ring-2 ring-accent/20' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain mix-blend-multiply"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580481077197-28564b97a2cb?w=200&q=80'
                      }}
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="lg:py-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-[11px] uppercase tracking-[0.2em] font-semibold text-accent hover:underline"
            >
              {product.category}
            </Link>
            {product.subCategory && (
              <>
                <span className="text-stone-300 text-xs">›</span>
                <Link
                  to={`/shop?category=${encodeURIComponent(product.category)}&subCategory=${encodeURIComponent(product.subCategory)}`}
                  className="text-[10.5px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 hover:bg-amber-100 transition"
                >
                  {product.subCategory}
                </Link>
              </>
            )}
            {product.sku && <span className="text-[11px] text-muted font-mono ml-auto">SKU: {product.sku}</span>}
          </div>
          <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-sm text-muted">
            ★ {product.rating} <span className="mx-2">·</span>
            <span className={product.inStock ? 'text-ink' : 'text-accent'}>
              {product.inStock ? 'In stock' : 'Sold out'}
            </span>
            {product.stockCount !== undefined && product.inStock && (
              <span className="ml-2 text-xs text-muted">({product.stockCount} units available)</span>
            )}
          </p>

          <div className="mt-8 flex items-baseline gap-3">
            {product.oldPrice && <span className="text-lg text-muted line-through decoration-accent decoration-2">{formatPrice(product.oldPrice)}</span>}
            <span className="text-3xl font-medium text-ink">Starts from 4,XXX rs</span>
          </div>

          <p className="mt-8 leading-relaxed text-ink/75">{product.description}</p>

          <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Material</dt>
              <dd className="text-right">{product.material}</dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Dimensions</dt>
              <dd className="text-right">{product.dimensions}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center border border-line h-12 self-start sm:self-auto">
              <button className="h-full px-4 text-lg hover:text-accent cursor-pointer" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                −
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button className="h-full px-4 text-lg hover:text-accent cursor-pointer" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                +
              </button>
            </div>
            <button disabled={!product.inStock} onClick={handleAdd} className="btn-solid flex-1 h-12 cursor-pointer disabled:opacity-50">
              {added ? 'Added to cart ✓' : product.inStock ? 'Add to cart' : 'Sold out'}
            </button>
            {product.inStock && (
              <button
                type="button"
                onClick={() => {
                  addItem(product, qty)
                  navigate('/cart')
                }}
                className="btn-outline flex-1 h-12 cursor-pointer text-center flex items-center justify-center font-medium"
              >
                Buy Now →
              </button>
            )}
          </div>
          <p className="mt-6 text-sm text-muted">
            Furnishing a whole office?{' '}
            <Link to="/contact" className="text-ink underline decoration-accent underline-offset-4 hover:text-accent">
              Ask for a bulk quote
            </Link>
          </p>
        </div>
      </div>

      <section className="mt-28">
        <SectionHeading eyebrow="You may also like" title="Complete the space" />
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
