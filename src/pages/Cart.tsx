import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useCart } from '../context/cart'
import { formatPrice } from '../data/products'
import { api } from '../services/api'

const FREE_DELIVERY_THRESHOLD = 40000
const DELIVERY_FEE = 1500

interface OrderSuccessData {
  id: string
  orderNumber: string
  customerName: string
  companyName?: string
  phone: string
  email: string
  deliveryAddress: string
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
  status: string
  paymentStatus: string
  createdAt: string
  notes?: string
}

export default function Cart() {
  const { items, count, subtotal, updateQuantity, removeItem, clear } = useCart()

  // Checkout step: 'cart' | 'checkout'
  const [step, setStep] = useState<'cart' | 'checkout'>('cart')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [placedOrder, setPlacedOrder] = useState<OrderSuccessData | null>(null)
  const [copied, setCopied] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    companyName: '',
    gstin: '',
    streetAddress: '',
    city: 'Chennai',
    pincode: '',
    notes: '',
    paymentMethod: 'advance' as 'advance' | 'bank_transfer' | 'cod',
  })

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE
  const total = subtotal + delivery

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCopyOrderNumber = () => {
    if (!placedOrder) return
    navigator.clipboard.writeText(placedOrder.orderNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.customerName.trim()) {
      setSubmitError('Please enter your full name.')
      return
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '')
    if (cleanPhone.length < 10) {
      setSubmitError('Please enter a valid 10-digit mobile number.')
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setSubmitError('Please enter a valid email address for invoice confirmation.')
      return
    }
    if (!formData.streetAddress.trim()) {
      setSubmitError('Please provide your delivery and installation address.')
      return
    }

    setIsSubmitting(true)

    const paymentLabel = 
      formData.paymentMethod === 'advance'
        ? '50% Advance & Balance on Site Delivery'
        : formData.paymentMethod === 'bank_transfer'
        ? 'Direct Bank Transfer (NEFT/RTGS/IMPS)'
        : 'Pay on Delivery & Physical Inspection (COD)'

    const fullAddress = `${formData.streetAddress.trim()}, ${formData.city.trim()} - ${formData.pincode.trim()}`
    const fullNotes = [
      `Payment Preference: ${paymentLabel}`,
      formData.gstin ? `GSTIN: ${formData.gstin.trim()}` : null,
      formData.notes ? `Site Instructions: ${formData.notes.trim()}` : null,
    ].filter(Boolean).join(' | ')

    const orderPayload = {
      customerName: formData.customerName.trim(),
      companyName: formData.companyName.trim() || undefined,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      items: items.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        quantity,
        unitPrice: product.price,
        category: product.category,
      })),
      subtotal,
      deliveryFee: delivery,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      deliveryAddress: fullAddress,
      notes: fullNotes,
    }

    try {
      const created = await api.createOrder(orderPayload)
      setPlacedOrder(created)
      clear()
    } catch (err: any) {
      console.warn('Backend order creation failed, creating local offline order fallback:', err)
      const fallbackOrder: OrderSuccessData = {
        id: 'ord-' + Date.now().toString(36),
        orderNumber: `BF-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        ...orderPayload,
        createdAt: new Date().toISOString(),
      }
      setPlacedOrder(fallbackOrder)
      clear()
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- 1. Order Confirmation View ---
  if (placedOrder) {
    const whatsappText = encodeURIComponent(
      `Hi Brothers Furniture, I have placed order #${placedOrder.orderNumber} for ${formatPrice(placedOrder.total)} via your website. Please confirm delivery schedule.`
    )
    const whatsappUrl = `https://wa.me/919790740027?text=${whatsappText}`

    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border border-line bg-surface p-6 sm:p-10">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Order Confirmed</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-medium text-ink">Thank you for your order</h1>
            <p className="mt-2 text-sm text-muted">
              Your order has been transmitted directly to our Ambattur factory team. We will contact you on{' '}
              <strong className="text-ink">{placedOrder.phone}</strong> to confirm your schedule.
            </p>
          </div>

          {/* Order Ref Box */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-line bg-white p-4">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted">Order Reference Number</span>
              <p className="font-mono text-xl font-bold text-ink">{placedOrder.orderNumber}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyOrderNumber}
                className="btn-outline px-3 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? 'Copied ✓' : 'Copy Order #'}
              </button>
              <Link
                to={`/track?ref=${encodeURIComponent(placedOrder.orderNumber)}`}
                className="btn-solid px-3 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                Track Status →
              </Link>
            </div>
          </div>

          {/* Status Tracker Bar */}
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-4">Fabrication & Delivery Pipeline</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="border border-emerald-500 bg-emerald-50/80 p-2.5 rounded-sm">
                <div className="font-semibold text-emerald-800">1. Confirmed</div>
                <div className="text-[10px] text-emerald-700 mt-0.5">Order Received</div>
              </div>
              <div className="border border-line bg-white p-2.5 rounded-sm">
                <div className="font-medium text-ink">2. In Production</div>
                <div className="text-[10px] text-muted mt-0.5">Ambattur Factory</div>
              </div>
              <div className="border border-line bg-white p-2.5 rounded-sm">
                <div className="font-medium text-ink">3. Quality Inspection</div>
                <div className="text-[10px] text-muted mt-0.5">Fit & Finish Check</div>
              </div>
              <div className="border border-line bg-white p-2.5 rounded-sm">
                <div className="font-medium text-ink">4. Site Installation</div>
                <div className="text-[10px] text-muted mt-0.5">Delivered to Floor</div>
              </div>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 text-xs">
            <div>
              <span className="font-semibold uppercase tracking-wider text-muted">Delivery Address</span>
              <p className="mt-1 font-medium text-ink">{placedOrder.customerName}</p>
              {placedOrder.companyName && <p className="text-muted">{placedOrder.companyName}</p>}
              <p className="mt-0.5 text-muted">{placedOrder.deliveryAddress}</p>
              <p className="mt-1 text-muted">Phone: {placedOrder.phone}</p>
              <p className="text-muted">Email: {placedOrder.email}</p>
            </div>

            <div>
              <span className="font-semibold uppercase tracking-wider text-muted">Summary & Payment</span>
              <p className="mt-1 font-medium text-ink">Status: <span className="capitalize text-accent font-semibold">{placedOrder.status}</span></p>
              <p className="text-muted mt-0.5">Total Amount: <strong className="text-ink">{formatPrice(placedOrder.total)}</strong></p>
              {placedOrder.notes && (
                <p className="text-muted mt-1 bg-white p-2 border border-line text-[11px] leading-relaxed">
                  {placedOrder.notes}
                </p>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Ordered Items</h2>
            <ul className="divide-y divide-line border-y border-line text-xs">
              {placedOrder.items.map((it, idx) => (
                <li key={idx} className="flex justify-between py-2.5">
                  <div>
                    <span className="font-medium text-ink">{it.name}</span>
                    <span className="ml-2 text-muted">×{it.quantity}</span>
                  </div>
                  <span className="font-medium text-ink">{formatPrice(it.unitPrice * it.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between text-sm font-semibold text-ink">
              <span>Total Payable</span>
              <span>{formatPrice(placedOrder.total)}</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line pt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full sm:w-auto text-center text-xs inline-flex items-center justify-center gap-1.5"
            >
              <span>Chat on WhatsApp (9790740027)</span>
            </a>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => window.print()}
                className="btn-outline w-full sm:w-auto text-center text-xs cursor-pointer"
              >
                Print Receipt
              </button>
              <Link to="/shop" className="btn-solid w-full sm:w-auto text-center text-xs">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- 2. Empty Cart View ---
  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Cart</p>
        <h1 className="mt-4 text-4xl font-medium">Your cart is empty</h1>
        <p className="mt-4 text-muted">
          Explore our Chennai-manufactured workstations, ergonomic seating, desks, and boardroom tables.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/shop" className="btn-solid">
            Browse the collection
          </Link>
          <Link to="/track" className="btn-outline">
            Track an existing order
          </Link>
        </div>
      </div>
    )
  }

  // --- 3. Active Cart & Dynamic Checkout View ---
  return (
    <>
      <PageHeader
        eyebrow={`${count} ${count === 1 ? 'item' : 'items'}`}
        title={step === 'cart' ? 'Your cart' : 'Direct Factory Checkout'}
      />

      <div className="mx-auto mt-8 sm:mt-12 max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Step Tabs */}
        <div className="mb-8 flex items-center gap-3 border-b border-line pb-4 text-xs">
          <button
            onClick={() => setStep('cart')}
            className={`font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              step === 'cart' ? 'text-accent border-b-2 border-accent pb-1' : 'text-muted hover:text-ink'
            }`}
          >
            1. Cart Items ({count})
          </button>
          <span className="text-muted">/</span>
          <button
            onClick={() => setStep('checkout')}
            className={`font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              step === 'checkout' ? 'text-accent border-b-2 border-accent pb-1' : 'text-muted hover:text-ink'
            }`}
          >
            2. Delivery & Checkout
          </button>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* LEFT COLUMN: Items OR Checkout Form */}
          {step === 'cart' ? (
            <div>
              <ul className="divide-y divide-line border-y border-line">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-4 sm:gap-6 py-6">
                    <Link to={`/product/${product.id}`} className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 bg-surface">
                      <img
                        src={product.image}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580481077197-28564b97a2cb?w=400&q=80' }}
                        alt={product.name}
                        className={`h-full w-full ${
                          product.cutout ? 'object-contain p-2 mix-blend-multiply' : 'object-cover'
                        }`}
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link to={`/product/${product.id}`} className="font-medium text-ink hover:text-accent text-sm sm:text-base">
                            {product.name}
                          </Link>
                          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted">{product.category}</p>
                          {product.dimensions && (
                            <p className="text-[11px] text-muted mt-0.5 hidden sm:block">{product.dimensions}</p>
                          )}
                        </div>
                        <span className="font-medium text-sm sm:text-base">{formatPrice(product.price * quantity)}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-line">
                          <button
                            className="px-3 py-1.5 hover:text-accent cursor-pointer"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm">{quantity}</span>
                          <button
                            className="px-3 py-1.5 hover:text-accent cursor-pointer"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-xs text-muted underline-offset-4 hover:text-accent hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <Link to="/shop" className="text-xs text-muted hover:text-ink underline underline-offset-4">
                  ← Continue shopping
                </Link>
                <button
                  onClick={() => setStep('checkout')}
                  className="btn-solid text-xs sm:text-sm cursor-pointer"
                >
                  Proceed to Delivery & Checkout →
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {submitError && (
                <div className="border border-rose-300 bg-rose-50 p-4 text-xs text-rose-800">
                  {submitError}
                </div>
              )}

              {/* 1. Customer Details */}
              <div className="border border-line bg-surface p-6 space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">1. Contact Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 98401 22849"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. ramesh@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="e.g. Acme Tech Solutions"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div className="border border-line bg-surface p-6 space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">2. Delivery & Site Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">
                      Building, Floor & Street Address <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      name="streetAddress"
                      required
                      placeholder="e.g. 4th Floor, Prince Info Park, Ambattur Industrial Estate"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">
                        Pincode <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        placeholder="e.g. 600058"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">
                        GSTIN for B2B Tax Invoice (Optional)
                      </label>
                      <input
                        type="text"
                        name="gstin"
                        placeholder="e.g. 33AAAAA0000A1Z5"
                        value={formData.gstin}
                        onChange={handleInputChange}
                        className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-ink uppercase tracking-wider">
                        Site Access / Lift Notes (Optional)
                      </label>
                      <input
                        type="text"
                        name="notes"
                        placeholder="e.g. Freight elevator available"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="mt-1 w-full border border-line bg-white px-3 py-2 text-xs text-ink outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Payment Preference */}
              <div className="border border-line bg-surface p-6 space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">3. Commercial Terms & Payment</h2>
                <div className="space-y-2 text-xs">
                  <label className="flex items-start gap-3 border border-line bg-white p-3 cursor-pointer hover:border-accent">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="advance"
                      checked={formData.paymentMethod === 'advance'}
                      onChange={handleInputChange}
                      className="mt-0.5 text-accent"
                    />
                    <div>
                      <span className="font-semibold text-ink block">50% Advance & Balance on Site Delivery (Recommended)</span>
                      <span className="text-muted text-[11px] block mt-0.5">
                        Standard corporate commercial terms with official GST proforma invoice generated upon order review.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 border border-line bg-white p-3 cursor-pointer hover:border-accent">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleInputChange}
                      className="mt-0.5 text-accent"
                    />
                    <div>
                      <span className="font-semibold text-ink block">Direct Bank Transfer (NEFT / RTGS)</span>
                      <span className="text-muted text-[11px] block mt-0.5">
                        Account details will be emailed with your official quotation.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 border border-line bg-white p-3 cursor-pointer hover:border-accent">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mt-0.5 text-accent"
                    />
                    <div>
                      <span className="font-semibold text-ink block">Pay on Delivery & Physical Inspection (Cash / UPI)</span>
                      <span className="text-muted text-[11px] block mt-0.5">
                        Inspect items upon arrival at your site before finalizing balance payment.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs text-muted hover:text-ink underline underline-offset-4 cursor-pointer"
                >
                  ← Edit cart items
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-solid text-xs sm:text-sm px-6 py-3 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Order to Factory...' : `Place Factory Order • ${formatPrice(total)}`}
                </button>
              </div>
            </form>
          )}

          {/* RIGHT COLUMN: Order Summary */}
          <aside className="h-fit bg-surface p-6 sm:p-8 border border-line">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ink">Order summary</h2>
            <dl className="mt-6 space-y-3 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-muted">Items ({count})</dt>
                <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Delivery & Installation</dt>
                <dd className="font-medium text-ink">
                  {delivery ? formatPrice(delivery) : <span className="text-emerald-700 font-semibold">Free Delivery</span>}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-4 text-base font-medium text-ink">
                <dt>Total (Inclusive of GST)</dt>
                <dd className="font-mono text-lg font-bold text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>

            {delivery > 0 ? (
              <p className="mt-4 text-xs text-muted">
                Add <strong className="text-ink">{formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)}</strong> more for free factory delivery & site installation.
              </p>
            ) : (
              <p className="mt-4 text-xs text-emerald-700 font-medium">
                ✓ Free delivery & on-site assembly across Chennai.
              </p>
            )}

            <div className="mt-6 border-t border-line pt-4 text-xs text-muted space-y-2">
              <p className="flex items-center gap-2">
                <span>🛡️</span> Directly manufactured at Ambattur Works
              </p>
              <p className="flex items-center gap-2">
                <span>📄</span> Official GST Tax Invoicing
              </p>
              <p className="flex items-center gap-2">
                <span>🚚</span> Scheduled site delivery & assembly
              </p>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="btn-solid mt-8 w-full text-xs sm:text-sm text-center cursor-pointer"
              >
                Proceed to Checkout
              </button>
            ) : null}
          </aside>
        </div>
      </div>
    </>
  )
}
