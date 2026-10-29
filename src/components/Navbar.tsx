import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { useProducts } from '../context/products'
import { company, whatsappLink } from '../data/company'
import { categories, formatPrice } from '../data/products'
import {
  ArrowRight,
  BuildingIcon,
  CartIcon,
  ChairIcon,
  ChevronDown,
  CloseIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  ShopBagIcon,
  TruckIcon,
  UsersIcon,
  WhatsAppIcon,
} from './Icons'
import Logo from './Logo'
import MegaMenu from './MegaMenu'

const links = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/shop', label: 'Shop', mega: true, icon: ShopBagIcon },
  { to: '/ergonomic-chairs', label: 'Chairs', icon: ChairIcon },
  { to: '/about', label: 'About', icon: BuildingIcon },
  { to: '/clients', label: 'Clients', icon: UsersIcon },
  { to: '/contact', label: 'Contact', icon: MailIcon },
  { to: '/track', label: 'Track Order', icon: TruckIcon },
]

const CLOSE_DELAY_MS = 120

export default function Navbar() {
  const { count } = useCart()
  const { products, countIn } = useProducts()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const closeTimer = useRef<number>(undefined)

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMega = (delay = CLOSE_DELAY_MS) => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), delay)
  }
  const closeMobile = () => {
    setMenuOpen(false)
    setMobileShopOpen(false)
  }

  // Automatically close mobile menu on route change
  useEffect(() => {
    closeMobile()
  }, [location.pathname, location.search])

  // Prevent background scroll while mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMobile()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50)
    } else {
      setSearchQuery('')
    }
  }, [searchOpen])

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = searchQuery.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setSearchOpen(false)
  }

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 5)
  }, [searchQuery])

  const isShopActive = location.pathname.startsWith('/shop')

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-colors"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          closeMega(0)
          closeMobile()
          setSearchOpen(false)
        }
      }}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex h-[66px] sm:h-[70px] max-w-7xl items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <Logo className="h-7.5 sm:h-8" />
        </div>

        {/* Center: Desktop Navigation Links (Pill Buttons) */}
        <ul className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          {links.map((l) =>
            l.mega ? (
              <li
                key={l.to}
                onMouseEnter={openMega}
                onMouseLeave={() => closeMega()}
                onFocus={openMega}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && closeMega(0)}
              >
                <NavLink
                  to={l.to}
                  onClick={() => closeMega(0)}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  aria-controls="shop-menu"
                  className={({ isActive }) =>
                    `relative inline-flex items-center gap-1 rounded-full px-4 py-2 text-[12.5px] font-semibold tracking-wide transition-all duration-200 ${
                      isActive || megaOpen
                        ? 'bg-[#3a3734] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                    }`
                  }
                >
                  <span>{l.label}</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
                  />
                </NavLink>
                <MegaMenu open={megaOpen} onNavigate={() => closeMega(0)} />
              </li>
            ) : (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative inline-flex items-center rounded-full px-4 py-2 text-[12.5px] font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-[#3a3734] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        {/* Right: Search, Cart, CTA, Mobile Menu */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Search Trigger */}
          <button
            type="button"
            aria-label="Search collection"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <SearchIcon className="h-4.5 w-4.5" />
          </button>

          {/* Cart Trigger */}
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${count} items`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <CartIcon className="h-4.5 w-4.5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[9.5px] font-bold text-white shadow-xs ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>

          {/* Quote Button (Desktop) */}
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#3a3734] hover:bg-accent px-6 py-2.5 text-[13px] font-bold text-white transition-all duration-200 shadow-xs hover:shadow-md ml-1"
          >
            <span>Get Quote</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => (menuOpen ? closeMobile() : setMenuOpen(true))}
          >
            <MenuIcon open={menuOpen} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-[66px] sm:top-[70px] z-40 bg-black/40 backdrop-blur-[2px] transition-opacity lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sheet Dropdown */}
      {menuOpen && (
        <div className="relative z-50 max-h-[calc(100dvh-4.5rem)] animate-fade-in overflow-y-auto overscroll-contain border-b border-stone-200/90 bg-white/98 backdrop-blur-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl lg:hidden">
          <ul className="flex flex-col gap-0.5">
            {links.map((l) => {
              const Icon = l.icon
              if (l.mega) {
                return (
                  <li key={l.to}>
                    <button
                      type="button"
                      onClick={() => setMobileShopOpen((o) => !o)}
                      aria-expanded={mobileShopOpen}
                      className={`group flex w-full items-center justify-between rounded-lg px-2 py-1 transition-all duration-150 border ${
                        isShopActive
                          ? 'bg-stone-100/90 border-stone-200/90 text-stone-950 shadow-2xs'
                          : 'border-transparent text-stone-600 hover:bg-stone-50 hover:border-stone-100 hover:text-stone-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-md transition-colors ${
                            isShopActive
                              ? 'bg-[#2b2724] text-white shadow-2xs'
                              : 'bg-stone-100/70 text-stone-500 group-hover:bg-stone-200/60 group-hover:text-stone-800'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span
                          className={`text-[13px] tracking-tight truncate ${
                            isShopActive
                              ? 'font-semibold text-stone-950'
                              : 'font-medium text-stone-600 group-hover:text-stone-900'
                          }`}
                        >
                          {l.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isShopActive && (
                          <span
                            className="flex h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-accent/30 shadow-[0_0_5px_rgba(217,119,6,0.9)] shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${
                            isShopActive ? 'text-stone-700' : 'text-stone-400 group-hover:text-stone-700'
                          } ${mobileShopOpen ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                        mobileShopOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="my-1 rounded-lg bg-stone-50/90 p-1.5 border border-stone-200/70">
                          <div className="grid grid-cols-2 gap-1">
                            <Link
                              to="/shop"
                              onClick={closeMobile}
                              className="col-span-2 flex items-center justify-between rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-stone-800 shadow-2xs hover:text-accent transition-colors"
                            >
                              <span>All Collections</span>
                              <span className="text-[9.5px] font-bold uppercase tracking-wider text-accent flex items-center gap-0.5">
                                Explore <ArrowRight className="h-2.5 w-2.5" />
                              </span>
                            </Link>
                            {categories.map((c) => {
                              const count = countIn(c).split(' ')[0]
                              const isCatActive =
                                location.pathname === '/shop' &&
                                location.search.includes(encodeURIComponent(c))
                              return (
                                <Link
                                  key={c}
                                  to={`/shop?category=${encodeURIComponent(c)}`}
                                  onClick={closeMobile}
                                  className={`flex items-center justify-between rounded-md px-2 py-0.5 text-[11px] transition-colors ${
                                    isCatActive
                                      ? 'bg-stone-200/90 font-semibold text-stone-900'
                                      : 'text-stone-600 hover:bg-white hover:text-stone-900'
                                  }`}
                                >
                                  <span className="truncate">{c}</span>
                                  <span className="font-mono text-[9px] text-stone-400 pl-1 shrink-0">
                                    {count}
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }

              return (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-lg px-2 py-1 transition-all duration-150 border ${
                        isActive
                          ? 'bg-stone-100/90 border-stone-200/90 text-stone-950 shadow-2xs'
                          : 'border-transparent text-stone-600 hover:bg-stone-50 hover:border-stone-100 hover:text-stone-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-md transition-colors ${
                              isActive
                                ? 'bg-[#2b2724] text-white shadow-2xs'
                                : 'bg-stone-100/70 text-stone-500 group-hover:bg-stone-200/60 group-hover:text-stone-800'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span
                            className={`text-[13px] tracking-tight truncate ${
                              isActive
                                ? 'font-semibold text-stone-950'
                                : 'font-medium text-stone-600 group-hover:text-stone-900'
                            }`}
                          >
                            {l.label}
                          </span>
                        </div>

                        {isActive && (
                          <span
                            className="flex h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-accent/30 shadow-[0_0_5px_rgba(217,119,6,0.9)] shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/* Clean hairline separator */}
          <div className="my-1.5 border-t border-stone-200/70" />

          {/* Action CTA Buttons */}
          <div className="flex flex-col gap-1.5">
            {/* Primary Action Button: Request Commercial Quote */}
            <Link
              to="/contact"
              onClick={closeMobile}
              className="group flex w-full items-center justify-between rounded-lg bg-[#2b2724] hover:bg-[#1a1816] active:scale-[0.99] px-3 py-2 text-white shadow-2xs transition-all duration-150"
            >
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/95">
                Request Commercial Quote
              </span>
              <span className="flex h-5 w-5 items-center justify-center rounded bg-white/10 group-hover:bg-white/20 transition-all group-hover:translate-x-0.5">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
            </Link>

            {/* Secondary Action Buttons (Dual side-by-side pills) */}
            <div className="grid grid-cols-2 gap-1.5">
              <a
                href={`tel:${company.phones[0].tel}`}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-200/90 bg-white hover:bg-stone-50 active:bg-stone-100 py-1.5 px-2 text-stone-800 text-[11.5px] font-semibold transition-all shadow-2xs hover:border-stone-300"
              >
                <PhoneIcon className="h-3 w-3 text-stone-600 shrink-0" />
                <span>Call Factory</span>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200/90 bg-[#f0fdf4] hover:bg-[#dcfce7] active:bg-[#bbf7d0] py-1.5 px-2 text-emerald-800 text-[11.5px] font-semibold transition-all shadow-2xs hover:border-emerald-300"
              >
                <WhatsAppIcon className="h-3 w-3 text-emerald-600 shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}


      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex animate-fade-in items-start justify-center bg-black/40 backdrop-blur-md px-4 pt-[10vh] sm:pt-[14vh]"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4.5 bg-stone-50/50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                Search Collections & Products
              </p>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <form
                onSubmit={submitSearch}
                className="flex items-center border-b-2 border-stone-900 pb-3 transition-colors focus-within:border-accent"
              >
                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Chairs, desks, workstations…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                  className="w-full bg-transparent py-1 text-xl sm:text-2xl font-normal outline-none placeholder:text-stone-300 text-stone-900"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="p-2 text-stone-900 transition hover:text-accent"
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
              </form>

              {searchQuery.trim() && (
                <div className="mt-6 animate-fade-in max-h-[45vh] overflow-y-auto pr-1">
                  {searchResults.length > 0 ? (
                    <ul className="flex flex-col gap-2.5">
                      {searchResults.map((p) => (
                        <li key={p.id} className="animate-rise">
                          <Link
                            to={`/product/${p.id}`}
                            onClick={() => setSearchOpen(false)}
                            className="group flex items-center gap-4 p-2.5 rounded-2xl hover:bg-stone-50 transition"
                          >
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100 border border-stone-100">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-stone-900 truncate transition-colors group-hover:text-accent">
                                {p.name}
                              </h4>
                              <p className="text-xs text-stone-500">{p.category}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-semibold text-stone-900">
                                {formatPrice(p.price)}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-base font-medium text-stone-800">
                        No results found for "{searchQuery}"
                      </p>
                      <p className="mt-1 text-xs text-stone-500">
                        Try checking for typos or searching a different term.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
