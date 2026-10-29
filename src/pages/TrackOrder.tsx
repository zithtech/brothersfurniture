import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { formatPrice } from '../data/products'
import { api } from '../services/api'

interface TrackedOrder {
  id: string
  orderNumber: string
  customerName: string
  companyName?: string
  phone: string
  email: string
  items: Array<{
    productId: string
    name: string
    quantity: number
    unitPrice: number
    category: string
  }>
  subtotal: number
  deliveryFee: number
  total: number
  status: 'pending' | 'in_production' | 'ready_for_dispatch' | 'dispatched' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'advance_received' | 'paid'
  deliveryAddress: string
  createdAt: string
  targetDeliveryDate?: string
  notes?: string
}

const statusMap: Record<
  TrackedOrder['status'],
  { step: number; label: string; badgeClass: string; desc: string }
> = {
  pending: {
    step: 1,
    label: 'Order Confirmed',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: 'Your order specifications have been received and are pending engineering schedule at our Ambattur factory.',
  },
  in_production: {
    step: 2,
    label: 'In Fabrication',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    desc: 'Our carpenters, metal fabricators, and upholstery artisans are currently building your furniture.',
  },
  ready_for_dispatch: {
    step: 3,
    label: 'Ready for Dispatch',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    desc: 'Quality inspection passed. Items are cushioned, boxed, and staged for delivery logistics.',
  },
  dispatched: {
    step: 4,
    label: 'Out for Delivery & Installation',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    desc: 'Our logistics and site assembly crew are en route to your specified address.',
  },
  delivered: {
    step: 5,
    label: 'Delivered & Installed',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: 'Furniture delivered, placed, and inspected on site.',
  },
  cancelled: {
    step: 0,
    label: 'Order Cancelled',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: 'This order has been cancelled or refunded.',
  },
}

export default function TrackOrder() {
  const [searchParams] = useSearchParams()
  const initialRef = searchParams.get('ref') || ''

  const [query, setQuery] = useState(initialRef)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<TrackedOrder[] | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const performSearch = async (searchTerm: string) => {
    const q = searchTerm.trim()
    if (!q) {
      setErrorMessage('Please enter an Order Number or Mobile Number.')
      return
    }

    setIsLoading(true)
    setErrorMessage(null)
    setResults(null)

    try {
      const orders = await api.trackOrder(q)
      if (Array.isArray(orders) && orders.length > 0) {
        setResults(orders as TrackedOrder[])
      } else {
        setErrorMessage('No orders found matching your inquiry. Please double-check your order number.')
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to locate order. Please check the order reference.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (initialRef) {
      performSearch(initialRef)
    }
  }, [initialRef])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  return (
    <>
      <PageHeader eyebrow="Real-Time Order Tracking" title="Track Your Furniture" />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search Bar Box */}
        <div className="border border-line bg-surface p-6 sm:p-8 shadow-xs">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">
            Factory Order Lookup
          </h2>
          <p className="mt-1 text-xs text-muted">
            Enter your Order Number (e.g. <span className="font-mono text-ink">BF-2026-8401</span> or <span className="font-mono text-ink">BF-ORD-2026-XXXX</span>) or your registered 10-digit mobile number.
          </p>

          <form onSubmit={handleSearchSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. BF-2026-8401 or 98401 22849"
              className="flex-1 border border-line bg-white px-4 py-2.5 text-xs sm:text-sm text-ink outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn-solid px-6 py-2.5 text-xs sm:text-sm cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Track Order →'}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-4 border border-rose-300 bg-rose-50 p-3 text-xs text-rose-700">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Results Container */}
        {results && results.length > 0 && (
          <div className="mt-10 space-y-8">
            {results.map((ord) => {
              const info = statusMap[ord.status] || {
                step: 1,
                label: ord.status,
                badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
                desc: 'Order received.',
              }

              const whatsappText = encodeURIComponent(
                `Hi Brothers Furniture, I am inquiring about Order #${ord.orderNumber} for ${ord.customerName}. Current status is ${info.label}.`
              )
              const whatsappUrl = `https://wa.me/919790740027?text=${whatsappText}`

              return (
                <div key={ord.id} className="border border-line bg-white p-6 sm:p-8 space-y-6 shadow-xs">
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Order Reference</span>
                      <h3 className="font-mono text-xl font-bold text-ink">{ord.orderNumber}</h3>
                      <p className="text-xs text-muted mt-0.5">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${info.badgeClass}`}>
                        {info.label}
                      </span>
                      {ord.targetDeliveryDate && (
                        <span className="text-xs text-muted">
                          Target Delivery: <strong className="text-ink">{ord.targetDeliveryDate}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Timeline (5 Steps) */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Fabrication & Delivery Timeline</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                      {[
                        { num: 1, title: 'Confirmed', sub: 'Order Received' },
                        { num: 2, title: 'Fabrication', sub: 'Ambattur Plant' },
                        { num: 3, title: 'Quality Check', sub: 'Inspection Passed' },
                        { num: 4, title: 'Dispatched', sub: 'Out for Delivery' },
                        { num: 5, title: 'Installed', sub: 'Site Completed' },
                      ].map((s) => {
                        const isDone = info.step >= s.num
                        const isCurrent = info.step === s.num
                        return (
                          <div
                            key={s.num}
                            className={`p-3 border rounded-sm transition-all ${
                              isCurrent
                                ? 'border-accent bg-orange-50/70 shadow-xs'
                                : isDone
                                ? 'border-emerald-300 bg-emerald-50/60'
                                : 'border-line bg-surface opacity-60'
                            }`}
                          >
                            <span className={`inline-block w-5 h-5 rounded-full text-[11px] font-bold leading-5 text-center mb-1 ${
                              isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {isDone ? '✓' : s.num}
                            </span>
                            <div className="font-semibold text-ink text-[11px]">{s.title}</div>
                            <div className="text-[10px] text-muted mt-0.5">{s.sub}</div>
                          </div>
                        )
                      })}
                    </div>
                    <p className="mt-3 text-xs text-slate-600 bg-surface p-3 border border-line">
                      <strong>Current Status Update:</strong> {info.desc}
                    </p>
                  </div>

                  {/* Customer & Address Details */}
                  <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2 text-xs">
                    <div>
                      <span className="font-semibold uppercase tracking-wider text-muted block mb-1">Delivery Destination</span>
                      <p className="font-semibold text-ink text-sm">{ord.customerName}</p>
                      {ord.companyName && <p className="text-muted font-medium">{ord.companyName}</p>}
                      <p className="text-muted mt-0.5">{ord.deliveryAddress}</p>
                      <p className="text-muted mt-1">Contact: {ord.phone} • {ord.email}</p>
                    </div>

                    <div>
                      <span className="font-semibold uppercase tracking-wider text-muted block mb-1">Financial Summary</span>
                      <p className="text-muted">Total Payable: <strong className="text-ink text-sm">{formatPrice(ord.total)}</strong></p>
                      <p className="text-muted mt-0.5">
                        Payment Status:{' '}
                        <span className="capitalize font-medium text-ink">
                          {ord.paymentStatus.replace(/_/g, ' ')}
                        </span>
                      </p>
                      {ord.notes && (
                        <p className="text-muted mt-2 text-[11px] bg-surface p-2 border border-line">
                          {ord.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="border-t border-line pt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Order Contents ({ord.items.length} line items)</h4>
                    <ul className="divide-y divide-line border-y border-line text-xs">
                      {ord.items.map((it, idx) => (
                        <li key={idx} className="flex justify-between py-2.5">
                          <div>
                            <span className="font-medium text-ink">{it.name}</span>
                            <span className="text-muted ml-2">×{it.quantity}</span>
                            <span className="text-[10px] text-muted block sm:inline sm:ml-2">({it.category})</span>
                          </div>
                          <span className="font-medium text-ink">{formatPrice(it.unitPrice * it.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Help Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line pt-4">
                    <p className="text-xs text-muted">
                      Need custom modifications or site delivery schedule changes?
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline px-4 py-2 text-xs inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>Direct WhatsApp Support</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link to="/shop" className="text-xs text-muted hover:text-ink underline underline-offset-4">
            ← Return to Furniture Collection
          </Link>
        </div>
      </div>
    </>
  )
}
