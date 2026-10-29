import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { allCatalogueItems, catalogues } from '../data/catalogues'
import { ergonomicChairs } from '../data/ergonomicChairs'
import { ArrowRight, ChevronLeft, ChevronRight } from './Icons'
import { RangeIcon, type RangeIconName } from './RangeIcons'

import executiveChairsImg from '../assets/executiveChairs.webp'
import officeChairsImg from '../assets/officeChairs.webp'
import trainingChairsImg from '../assets/traningChairs.webp'
import publicSeatingImg from '../assets/publicChairs.webp'
import cafeChairsImg from '../assets/CafeChair.webp'

import modularWorkstationsImg from '../assets/ModularWorkstation.webp'
import officeModularWorkstationsImg from '../assets/OfficeWorkstation.webp'
import workstationDesksImg from '../assets/WorkstationDesks.webp'

import officeTablesImg from '../assets/officeTable.webp'
import cafeTablesImg from '../assets/cafeTables.webp'
import storageTablesImg from '../assets/storageTable.webp'

interface Line {
  name: string
  icon: RangeIconName
  to: string
  image: string
  fit: 'contain' | 'cover'
  tagline: string
  features: string[]
  group: 'Seating' | 'Workstations' | 'Tables & Storage'
}

const shop = (category: string, type?: string) =>
  `/shop?category=${encodeURIComponent(category)}${type ? `&type=${type}` : ''}`

const groups = [
  {
    title: 'Seating' as const,
    lines: [
      {
        name: 'Executive Chairs',
        icon: 'executiveChair' as RangeIconName,
        to: shop('Office Chairs', 'executive-chairs'),
        image: executiveChairsImg,
        fit: 'contain' as const,
        tagline: 'High-back ergonomic executive seating with multi-position tilt-lock and plush leatherette.',
        features: ['Multi-Lock Synchro', 'Class-4 Gas Lift', 'High-Density Foam Cushioning'],
      },
      {
        name: 'Office Chairs',
        icon: 'officeChair' as RangeIconName,
        to: shop('Office Chairs', 'mesh-office-chairs'),
        image: officeChairsImg,
        fit: 'contain' as const,
        tagline: 'Everyday breathable mesh task seating engineered with lumbar contour for 8+ hour support.',
        features: ['Breathable Mesh Back', 'Adjustable Lumbar Support', '360° Smooth Swivel'],
      },
      {
        name: 'Training Chairs',
        icon: 'trainingChair' as RangeIconName,
        to: shop('Lounge', 'study'),
        image: trainingChairsImg,
        fit: 'contain' as const,
        tagline: 'Mobile and stackable seminar chairs equipped with integrated foldable writing tablet arms.',
        features: ['Foldable Writing Tablet', 'Stackable Steel Frame', 'Heavy-Duty Castors'],
      },
      {
        name: 'Public Seating',
        icon: 'publicSeating' as RangeIconName,
        to: shop('Lounge', 'metro'),
        image: publicSeatingImg,
        fit: 'contain' as const,
        tagline: 'Heavy-duty perforated steel beam seating for reception lobbies, airports and healthcare facilities.',
        features: ['Perforated Steel Shell', 'Heavy-Duty Steel Beam', 'Anti-Corrosion Powder Coat'],
      },
      {
        name: 'Café Chairs',
        icon: 'cafeChair' as RangeIconName,
        to: shop('Lounge', 'cafe'),
        image: cafeChairsImg,
        fit: 'contain' as const,
        tagline: 'Contemporary commercial dining and breakout seating built for high traffic and effortless cleaning.',
        features: ['Moulded Ergonomic Shell', 'Scratch Resistant', 'Lightweight & Sturdy'],
      },
    ],
  },
  {
    title: 'Workstations' as const,
    lines: [
      {
        name: 'Modular Workstations',
        icon: 'modularWorkstation' as RangeIconName,
        to: shop('Workstations', 'linear'),
        image: modularWorkstationsImg,
        fit: 'contain' as const,
        tagline: 'Scalable linear and back-to-back desking systems with embedded wire management raceways.',
        features: ['Modular Add-On Design', 'Cable Management Raceway', 'Acoustic Screen Dividers'],
      },
      {
        name: 'Office Modular Workstations',
        icon: 'officeModularWorkstation' as RangeIconName,
        to: shop('Workstations', 'cluster'),
        image: officeModularWorkstationsImg,
        fit: 'contain' as const,
        tagline: 'Collaborative 4-seater and 6-seater workstation clusters engineered for efficient open floor plans.',
        features: ['Team Cluster Layouts', 'Fabric Privacy Partitions', 'Custom Floor Plan Fitting'],
      },
      {
        name: 'Workstation Desks',
        icon: 'workstationDesk' as RangeIconName,
        to: shop('Workstations', 'bench'),
        image: workstationDesksImg,
        fit: 'contain' as const,
        tagline: 'Sturdy steel-frame bench desking with clean cable routing grommets and 25mm prelaminated tops.',
        features: ['Heavy-Gauge Steel Frame', '25mm Pre-Lam Engineered Top', 'Dual Wire Grommets'],
      },
    ],
  },
  {
    title: 'Tables & Storage' as const,
    lines: [
      {
        name: 'Office Tables',
        icon: 'officeTable' as RangeIconName,
        to: shop('Desks'),
        image: officeTablesImg,
        fit: 'contain' as const,
        tagline: 'Executive cabin desks and conference tables engineered with premium edge banding and wire boxes.',
        features: ['Executive Cabin Fit-Out', 'Integrated Flip-Up Wire Box', 'Durable Melamine Surface'],
      },
      {
        name: 'Café Tables',
        icon: 'cafeTable' as RangeIconName,
        to: shop('Meeting Tables', 'cafe'),
        image: cafeTablesImg,
        fit: 'contain' as const,
        tagline: 'Heavy cast-iron base pedestal dining tables engineered for high-traffic food courts and cafeterias.',
        features: ['Weighted Cast-Iron Base', 'Compact Pedestal Footprint', 'Moisture & Heat Resistant'],
      },
      {
        name: 'Storage Tables',
        icon: 'storageTable' as RangeIconName,
        to: shop('Storage'),
        image: storageTablesImg,
        fit: 'contain' as const,
        tagline: 'Precision lockable credenzas, mobile pedestals and filing cabinets for organized, secure workspaces.',
        features: ['Central Lock Mechanism', 'Smooth Telescopic Channels', 'Anti-Tilt Drawer System'],
      },
    ],
  },
]

const lines: Line[] = groups.flatMap((g) => g.lines.map((l) => ({ ...l, group: g.title })))
const pad = (n: number) => String(n).padStart(2, '0')

const categories = ['All Collections', 'Seating', 'Workstations', 'Tables & Storage'] as const
type CategoryFilter = typeof categories[number]

const AUTOPLAY_INTERVAL = 4000 // 4 seconds per line

const stats = [
  {
    value: `${allCatalogueItems.length}+`,
    label: 'Commercial Products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-slate-800">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    value: pad(lines.length),
    label: 'Wholesale Lines',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-slate-800">
        <rect x="4" y="3" width="9" height="18" rx="1" />
        <path d="M13 9h7a1 1 0 0 1 1 1v11H13" />
        <path d="M7 7h3" />
        <path d="M7 11h3" />
        <path d="M7 15h3" />
        <path d="M16 13h2" />
        <path d="M16 17h2" />
      </svg>
    ),
  },
  {
    value: String(ergonomicChairs.length),
    label: 'Ergonomic Models',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-slate-800">
        <rect x="8" y="2.5" width="8" height="7.5" rx="2" />
        <path d="M6 7.5v3a1 1 0 0 0 1 1h1" />
        <path d="M18 7.5v3a1 1 0 0 1-1 1h-1" />
        <path d="M5.5 13.5h13a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v0a1 1 0 0 1 1-1z" />
        <line x1="12" y1="15.5" x2="12" y2="18.5" />
        <path d="m8 21.5 4-3 4 3" />
        <line x1="5.5" y1="21.5" x2="18.5" y2="21.5" />
      </svg>
    ),
  },
  {
    value: pad(Object.keys(catalogues).length),
    label: 'Furniture Categories',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-slate-800">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
]

export default function WholesaleRange() {
  const [active, setActive] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All Collections')
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const listContainerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const current = lines[active] || lines[0]

  const filteredLines = selectedCategory === 'All Collections'
    ? lines
    : lines.filter((l) => l.group === selectedCategory)

  const isAutoPlaying = isPlaying && !isHovered

  const handleNext = useCallback(() => {
    if (filteredLines.length === 0) return
    const currentFilteredIdx = filteredLines.findIndex((l) => l.name === (lines[active]?.name || ''))
    const nextFilteredIdx = currentFilteredIdx === -1 ? 0 : (currentFilteredIdx + 1) % filteredLines.length
    const nextLine = filteredLines[nextFilteredIdx]
    const nextFullIdx = lines.findIndex((l) => l.name === nextLine.name)
    if (nextFullIdx !== -1) {
      setActive(nextFullIdx)
    }
  }, [filteredLines, active])

  const handlePrev = useCallback(() => {
    if (filteredLines.length === 0) return
    const currentFilteredIdx = filteredLines.findIndex((l) => l.name === (lines[active]?.name || ''))
    const prevFilteredIdx = currentFilteredIdx === -1
      ? 0
      : (currentFilteredIdx - 1 + filteredLines.length) % filteredLines.length
    const prevLine = filteredLines[prevFilteredIdx]
    const prevFullIdx = lines.findIndex((l) => l.name === prevLine.name)
    if (prevFullIdx !== -1) {
      setActive(prevFullIdx)
    }
  }, [filteredLines, active])

  // Auto-change timer
  useEffect(() => {
    if (!isAutoPlaying || filteredLines.length <= 1) return

    const timer = setTimeout(() => {
      handleNext()
    }, AUTOPLAY_INTERVAL)

    return () => clearTimeout(timer)
  }, [isAutoPlaying, handleNext, filteredLines.length])

  // Keep active item smoothly visible inside the left list container as it auto-rotates
  useEffect(() => {
    const container = listContainerRef.current
    const itemEl = itemRefs.current.get(active)
    if (container && itemEl) {
      const containerRect = container.getBoundingClientRect()
      const itemRect = itemEl.getBoundingClientRect()

      if (itemRect.top < containerRect.top) {
        container.scrollTo({
          top: container.scrollTop + (itemRect.top - containerRect.top) - 12,
          behavior: 'smooth',
        })
      } else if (itemRect.bottom > containerRect.bottom) {
        container.scrollTo({
          top: container.scrollTop + (itemRect.bottom - containerRect.bottom) + 12,
          behavior: 'smooth',
        })
      }
    }
  }, [active])

  const handleCategorySelect = (cat: CategoryFilter) => {
    setSelectedCategory(cat)
    if (cat !== 'All Collections') {
      const firstIndex = lines.findIndex((l) => l.group === cat)
      if (firstIndex !== -1) setActive(firstIndex)
    }
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative bg-[#fafafa] py-16 sm:py-20 lg:py-24 text-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* ── Header ── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-stone-200/80 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Wholesale & Commercial Range
            </div>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl lg:text-[46px] leading-[1.12]">
              Architectural Quality.<br />
              <span className="font-medium text-stone-900">Direct Manufacturer Pricing.</span>
            </h2>
          </div>
          <div className="max-w-md lg:pb-1">
            <p className="text-[14px] leading-relaxed text-ink/65">
              Manufactured in our Chennai facility and supplied direct to corporate headquarters, co-working studios,
              resellers, and turnkey projects across India.
            </p>
          </div>
        </div>

        {/* ── Key Metrics Strip (Floating Luxury Stats Card matching About page design) ── */}
        <div className="mt-8 sm:mt-10">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 lg:p-7 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-slate-100">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 sm:gap-4 md:px-4 lg:px-7">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-800 shadow-sm">
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-slate-700 leading-none truncate">
                      {s.value}
                    </p>
                    <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs lg:text-[13px] font-medium text-slate-500 sm:whitespace-nowrap truncate">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="mt-8 sm:mt-12 flex items-center justify-between border-b border-stone-200/80 pb-4 flex-wrap gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat
              const count = cat === 'All Collections' ? lines.length : lines.filter((l) => l.group === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`group relative inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13px] font-medium transition-all duration-300 ${
                    isSelected
                      ? 'bg-ink text-white shadow-md shadow-ink/15'
                      : 'bg-white text-ink/70 border border-stone-200/70 hover:bg-stone-50 hover:text-ink'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] sm:text-[10px] font-semibold tabular-nums transition-colors ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-ink/50 group-hover:bg-stone-200'
                    }`}
                  >
                    {pad(count)}
                  </span>
                </button>
              )
            })}
          </div>

          <span className="text-xs text-ink/40 hidden sm:inline-block">
            Showing <strong className="text-ink font-medium">{filteredLines.length}</strong> collections
          </span>
        </div>

        {/* ── Mobile Preview Card (Prominent on small screens < 768px) ── */}
        <div
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="mt-6 sm:mt-8 block md:hidden"
        >
          <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-3.5 shadow-md">
            <div className="relative aspect-[4/3] max-h-[280px] overflow-hidden rounded-xl bg-gradient-to-br from-stone-50 via-white to-stone-100 p-4 flex items-center justify-center">
              <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
                <span className="rounded-full bg-stone-900/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  {pad(active + 1)} / {pad(lines.length)}
                </span>
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-stone-600 backdrop-blur-md">
                  {current.group}
                </span>
              </div>

              {/* Mobile next/prev controls */}
              <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous line"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm border border-stone-200/70 hover:bg-white active:scale-95 transition"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next line"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm border border-stone-200/70 hover:bg-white active:scale-95 transition"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              <img
                src={current.image}
                alt={current.name}
                loading="lazy"
                decoding="async"
                className={`h-full w-full ${current.name === 'Storage Tables' ? 'object-cover' : 'object-contain'} transition-transform duration-300`}
              />

              {/* Mobile auto-play progress bar */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-200/50 overflow-hidden z-10">
                  <div
                    key={`mobile-bar-${active}-${isAutoPlaying}`}
                    className="h-full bg-accent"
                    style={{
                      animation: isAutoPlaying ? `hero-progress ${AUTOPLAY_INTERVAL}ms linear` : 'none',
                      width: isAutoPlaying ? undefined : (isHovered ? '100%' : '0%'),
                    }}
                  />
                </div>
              )}
            </div>
            <div className="mt-3.5 px-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-accent">{current.group}</p>
              <h4 className="mt-0.5 text-lg sm:text-xl font-semibold text-ink">{current.name}</h4>
              <p className="mt-1 text-xs text-ink/65 leading-relaxed">{current.tagline}</p>
              <div className="mt-3 flex gap-2">
                <Link
                  to={current.to}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink py-2 text-xs font-medium text-white"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to={`/contact?product=${encodeURIComponent(current.name)}`}
                  className="inline-flex items-center justify-center rounded-lg border border-stone-300 px-3 py-2 text-xs font-medium text-ink/80"
                >
                  Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Interactive Showcase ── */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="mt-6 sm:mt-8 hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:gap-14 items-start"
        >
          
          {/* Left Column: Refined Architectural Product Selector (6 in view + Scroll View) */}
          <div className="relative flex flex-col h-[460px] sm:h-[500px] lg:h-[540px]">
            <div
              ref={listContainerRef}
              className="flex-1 min-h-0 space-y-2 sm:space-y-2.5 overflow-y-auto pr-1.5 sm:pr-3 py-1 overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300 hover:[&::-webkit-scrollbar-thumb]:bg-stone-400 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {filteredLines.map((l) => {
                const fullIndex = lines.findIndex((x) => x.name === l.name)
                const isActive = fullIndex === active

                return (
                  <div
                    key={l.name}
                    ref={(el) => {
                      if (el) {
                        itemRefs.current.set(fullIndex, el)
                      } else {
                        itemRefs.current.delete(fullIndex)
                      }
                    }}
                    onMouseEnter={() => {
                      setActive(fullIndex)
                    }}
                    onClick={() => {
                      setActive(fullIndex)
                    }}
                    className={`group relative flex cursor-pointer items-center justify-between rounded-xl sm:rounded-2xl p-3 sm:p-3.5 lg:p-4 transition-all duration-300 ${
                      isActive
                        ? 'bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-stone-200/90 ring-1 ring-stone-900/5'
                        : 'bg-white/50 hover:bg-white border border-stone-200/50 hover:border-stone-200/80 hover:shadow-sm'
                    }`}
                  >
                    {/* Active highlight bar */}
                    <div
                      className={`absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full transition-all duration-300 ${
                        isActive ? 'bg-accent' : 'bg-transparent'
                      }`}
                    />

                    <div className="flex items-center gap-2.5 sm:gap-4 pl-1 sm:pl-1.5 min-w-0">
                      <span
                        className={`font-mono text-[10px] sm:text-[11px] tabular-nums shrink-0 transition-colors duration-300 ${
                          isActive ? 'text-accent font-semibold' : 'text-stone-400 group-hover:text-stone-600'
                        }`}
                      >
                        {pad(fullIndex + 1)}
                      </span>

                      <div
                        className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-ink text-white shadow-sm'
                            : 'bg-stone-100 text-stone-600 group-hover:bg-stone-200 group-hover:text-ink'
                        }`}
                      >
                        <RangeIcon name={l.icon} className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-xs sm:text-sm lg:text-base truncate tracking-tight transition-colors duration-300 ${
                              isActive ? 'font-semibold text-stone-900' : 'font-normal text-stone-700 group-hover:text-stone-900'
                            }`}
                          >
                            {l.name}
                          </h3>
                          {selectedCategory === 'All Collections' && (
                            <span className="hidden sm:inline-block shrink-0 rounded-md bg-stone-100 px-1.5 py-0.5 text-[8.5px] font-medium tracking-wide text-stone-500 uppercase">
                              {l.group}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 truncate text-[10.5px] sm:text-xs text-stone-500 font-normal">
                          {l.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pl-2 shrink-0">
                      <Link
                        to={l.to}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-stone-100 text-stone-900 hover:bg-ink hover:text-white'
                            : 'opacity-90 sm:opacity-0 sm:-translate-x-1.5 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 bg-stone-50 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <span className="hidden sm:inline">Explore</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Scroll Indicator helper when more than 6 items */}
            {filteredLines.length > 6 && (
              <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between px-2 text-[10px] sm:text-[11px] text-stone-500 font-medium shrink-0">
                <span>
                  Scroll to view all {filteredLines.length} product lines
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-stone-400">
                  scroll for more ↓
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Visual Stage & Spec Showcase (Desktop & Tablet) */}
          <div className="hidden md:block h-[500px] lg:h-[540px]">
            <div className="sticky top-28 h-full">
              <div className="h-full flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-4 shadow-xl shadow-stone-900/5">
                
                {/* Visual Viewport Canvas */}
                <div className="relative flex-1 min-h-[260px] overflow-hidden rounded-2xl bg-gradient-to-br from-stone-50 via-white to-stone-100 border border-stone-100 flex items-center justify-center p-6 sm:p-8">
                  {/* Left Badges */}
                  <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
                    <span className="rounded-full bg-stone-950/85 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm">
                      {pad(active + 1)} / {pad(lines.length)}
                    </span>
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-600 border border-stone-200/60 shadow-sm">
                      {current.group}
                    </span>
                  </div>

                  {/* Right Controls & Factory Direct */}
                  <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                    <span className="rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
                      Factory Direct
                    </span>

                    <div className="flex items-center gap-1 pl-1">
                      {/* Play/Pause Button */}
                      <button
                        type="button"
                        onClick={() => setIsPlaying((p) => !p)}
                        aria-label={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
                        title={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-stone-200/70 text-stone-700 shadow-sm hover:bg-stone-50 hover:text-ink active:scale-95 transition"
                      >
                        {isPlaying && !isHovered ? (
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : (
                          <svg className="h-3 w-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      {/* Prev Button */}
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous line"
                        title="Previous line"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-stone-200/70 text-stone-700 shadow-sm hover:bg-stone-50 hover:text-ink active:scale-95 transition"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>

                      {/* Next Button */}
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next line"
                        title="Next line"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-stone-200/70 text-stone-700 shadow-sm hover:bg-stone-50 hover:text-ink active:scale-95 transition"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Preloaded crossfading photos */}
                  {lines.map((l, i) => (
                    <img
                      key={l.name}
                      src={l.image}
                      alt={i === active ? l.name : ''}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full transition-all duration-500 ease-out ${
                        l.name === 'Storage Tables'
                          ? 'object-cover p-3 rounded-2xl'
                          : l.fit === 'contain'
                          ? 'object-contain p-6 sm:p-8 mix-blend-multiply'
                          : 'object-cover'
                      } ${
                        i === active
                          ? 'scale-100 opacity-100'
                          : 'scale-[1.03] opacity-0 pointer-events-none'
                      }`}
                    />
                  ))}

                  {/* Stage Progress Bar */}
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-200/40 overflow-hidden z-10">
                      <div
                        key={`stage-bar-${active}-${isAutoPlaying}`}
                        className="h-full bg-accent transition-all"
                        style={{
                          animation: isAutoPlaying ? `hero-progress ${AUTOPLAY_INTERVAL}ms linear` : 'none',
                          width: isAutoPlaying ? undefined : (isHovered ? '100%' : '0%'),
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Spec Sheet & Metadata */}
                <div className="mt-4 px-2 pb-1 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {current.group}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      Line #{pad(active + 1)}
                    </span>
                  </div>

                  <h3 key={current.name} className="mt-1 text-2xl font-semibold tracking-tight text-stone-900 animate-fade-in">
                    {current.name}
                  </h3>

                  <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-stone-600 line-clamp-2">
                    {current.tagline}
                  </p>

                  {/* Feature specs badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    {current.features.map((feat) => (
                      <span
                        key={feat}
                        className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10.5px] font-medium text-stone-700 border border-stone-200/50"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="mt-4 flex items-center gap-3 pt-3.5 border-t border-stone-100">
                    <Link
                      to={current.to}
                      className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-accent hover:shadow-md"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to={`/contact?product=${encodeURIComponent(current.name)}`}
                      className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-4 py-2.5 text-[13px] font-medium text-stone-700 transition hover:border-ink hover:text-ink hover:bg-stone-50"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
