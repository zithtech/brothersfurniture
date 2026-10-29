import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import coworkingSpaceImg from '../assets/Coworking Space.png'
import rawMaterialPart3Img from '../assets/rawmaterialpart3.png'
import postureImg from '../assets/posture.png'
import postureMiniImg from '../assets/posturemini.png'
import aboutBannerVideo from '../assets/about-banner.mp4'
import aboutPoster from '../assets/about-hero-poster.jpg'
import aboutP1Img from '../assets/aboutp1.png'
import aboutP2Img from '../assets/aboutp2.png'
import aboutP3Img from '../assets/aboutp3.png'
import aboutP4Img from '../assets/aboutp4.png'
import aboutP5Img from '../assets/aboutp5.png'
import aboutP6Img from '../assets/aboutp6.png'

const stats = [
  {
    value: '9+',
    label: 'Years Excellence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-slate-800">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    value: '250+',
    label: 'Hubs Completed',
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
    value: '100+',
    label: 'Postural Comfort',
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
    value: '100K+',
    label: 'Seating Supplied',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6 text-slate-800">
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback handled gracefully
      })
    }
  }, [])

  return (
    <div className="bg-white">
      {/* 1. Hero Banner (Exact match to design mockup with production-ready clear video background) */}
      <section className="relative overflow-hidden bg-white pt-4 pb-6 sm:pt-8 sm:pb-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10">
          <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] w-full overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-slate-100 bg-white shadow-sm flex items-center">
            
            {/* Background / Right-side Clear Video Visual */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] xl:w-[55%] overflow-hidden z-0">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={aboutPoster}
                className="h-full w-full object-cover object-center"
              >
                <source src={aboutBannerVideo} type="video/mp4" />
              </video>
              
              {/* Soft horizontal gradient fade: white on left smoothly blending into video */}
              <div className="absolute inset-y-0 left-0 hidden w-48 sm:w-64 lg:w-80 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none lg:block" />
              {/* Mobile overlay for high contrast readability */}
              <div className="absolute inset-0 bg-white/88 backdrop-blur-[1px] pointer-events-none lg:hidden" />
              
              {/* Subtle top and bottom blend */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
            </div>

            {/* Left Content Area */}
            <div className="relative z-10 w-full lg:w-[55%] px-5 py-10 sm:px-10 sm:py-14 md:px-12 lg:py-20 animate-rise">
              {/* Eyebrow: ABOUT US — */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  ABOUT US
                </span>
                <span className="h-[1.5px] w-6 sm:w-8 bg-slate-400" />
              </div>

              {/* Headline */}
              <h1 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.12] tracking-tight text-slate-900">
                Legacy of Premium<br />
                Spaces &<br />
                Exceptional<br />
                Craftsmanship.
              </h1>

              {/* Subtitle / Paragraph */}
              <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-[15px] sm:leading-relaxed text-slate-600">
                At Brother Furniture, we believe furniture is not just built; it is engineered to shape how people work, think, and interact every day. Our journey is driven by a commitment to create premium commercial furniture solutions that merge design intelligence with real-world workplace needs.
              </p>

              {/* CTA Button */}
              <div className="mt-6 sm:mt-9">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 rounded-xl sm:rounded-2xl bg-[#1e2329] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-[14px] font-medium text-white shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Our Products</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Floating Stats Bar */}
          <div className="relative z-20 mx-auto -mt-6 sm:-mt-10 lg:-mt-14 max-w-6xl px-1 sm:px-4">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-3.5 sm:p-6 lg:p-7 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)]">
              <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-slate-100">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-2.5 sm:gap-4 md:px-4 lg:px-7">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-800 shadow-sm">
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-slate-900 leading-none truncate">
                        {s.value}
                      </p>
                      <p className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs lg:text-[13px] font-medium text-slate-500 truncate sm:whitespace-nowrap">
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Who We Are (Minimalist Premium Presentation with Light Gray Background) */}
      <section className="bg-[#f8f9fa] border-y border-stone-200/60 py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Image with distinctive architectural top-right curve */}
            <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl rounded-tr-[50px] sm:rounded-tr-[80px] lg:rounded-tr-[120px] border border-stone-200/80 bg-white shadow-xl shadow-stone-900/5 max-w-lg mx-auto lg:max-w-none w-full">
              <img
                src={coworkingSpaceImg}
                alt="Building Workspaces for a Better Tomorrow"
                className="max-h-[260px] sm:max-h-[340px] lg:max-h-[385px] w-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Subtle luxury badge overlay */}
              <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-10 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-semibold text-stone-900 shadow-lg border border-stone-200/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Factory Direct • Chennai Facility</span>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-accent shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Who We Are
                </div>

                <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-[42px] font-light tracking-tight text-slate-900 leading-[1.15]">
                  Building Workspaces<br />
                  <span className="font-semibold text-slate-900">for a Better Tomorrow.</span>
                </h2>
              </div>

              <p className="text-xs sm:text-[15px] sm:leading-relaxed text-slate-600 font-light max-w-xl">
                We design and manufacture architectural-grade office furniture in Chennai. We bring together ergonomic science, durable materials, and contemporary design to create workplaces built for long-term health, collaboration, and performance.
              </p>

              {/* Minimalist Feature Cards */}
              <div className="grid grid-cols-1 min-[440px]:grid-cols-2 gap-3 sm:gap-3.5 pt-1">
                <div className="rounded-2xl border border-stone-200/80 bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-stone-300 hover:shadow-md">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Engineering</span>
                  <h4 className="mt-0.5 sm:mt-1 text-xs sm:text-[14px] font-semibold text-slate-900">Certified Ergonomics</h4>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 leading-relaxed">Multi-position lumbar support & active posture alignment</p>
                </div>
                <div className="rounded-2xl border border-stone-200/80 bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-stone-300 hover:shadow-md">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Turnkey Supply</span>
                  <h4 className="mt-0.5 sm:mt-1 text-xs sm:text-[14px] font-semibold text-slate-900">Custom Floor Plans</h4>
                  <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 leading-relaxed">Direct manufacturer pricing with fast layout turnaround</p>
                </div>
              </div>

              {/* Clean Collections Pills */}
              <div className="pt-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Core Wholesale Lines
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    { label: 'Executive & Office Chairs', to: '/shop?category=Office+Chairs' },
                    { label: 'Modular Workstations', to: '/shop?category=Workstations' },
                    { label: 'Conference Desks', to: '/shop?category=Desks' },
                    { label: 'Lounge & Cafe Seating', to: '/shop?category=Lounge' },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="rounded-full border border-stone-200/80 bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-stone-700 shadow-2xs hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Minimal Action CTA */}
              <div className="pt-1 sm:pt-2">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-accent hover:shadow-md"
                >
                  <span>Explore All Collections</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Materials Matrix & Posture Alignment (Compact & Balanced) */}
      <section className="bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            
            {/* Card 1: Premium Raw Materials Matrix */}
            <div className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 lg:p-7 shadow-md shadow-slate-100 transition-all hover:shadow-lg">
              <div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-800 shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-slate-800">
                      <path d="m12 2 10 5-10 5-10-5Z" />
                      <path d="m2 12 10 5 10-5" />
                      <path d="m2 17 10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-[19px] font-bold text-slate-900 leading-snug">
                      Premium Raw Materials Matrix
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-slate-500">
                      We carefully select high-density, performance-driven materials that ensure long-lasting durability and consistent usage strength.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-100">
                <img
                  src={rawMaterialPart3Img}
                  alt="Premium raw materials matrix"
                  className="h-44 sm:h-56 md:h-60 w-full object-cover"
                />
              </div>
            </div>

            {/* Card 2: Expert Technical Posture Alignment */}
            <div className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 lg:p-7 shadow-md shadow-slate-100 transition-all hover:shadow-lg">
              <div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-slate-800 shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-slate-800">
                      <rect x="8" y="2.5" width="8" height="7.5" rx="2" />
                      <path d="M6 7.5v3a1 1 0 0 0 1 1h1" />
                      <path d="M18 7.5v3a1 1 0 0 1-1 1h-1" />
                      <path d="M5.5 13.5h13a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v0a1 1 0 0 1 1-1z" />
                      <line x1="12" y1="15.5" x2="12" y2="18.5" />
                      <path d="m8 21.5 4-3 4 3" />
                      <line x1="5.5" y1="21.5" x2="18.5" y2="21.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-[19px] font-bold text-slate-900 leading-snug">
                      Expert Technical Posture Alignment
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-slate-500">
                      Our design approach is centered around human posture and workplace ergonomics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Visual: Ergonomic Chair on Left, Diagram + Bullets on Right */}
              <div className="mt-5 sm:mt-6 flex items-center justify-between gap-2.5 sm:gap-5 pt-1">
                <div className="flex-1 flex justify-center items-end">
                  <img
                    src={postureImg}
                    alt="Ergonomic postural chair alignment"
                    className="h-40 sm:h-52 md:h-60 max-w-[50vw] sm:max-w-none w-auto object-contain"
                  />
                </div>

                <div className="w-[48%] sm:w-[44%] flex flex-col justify-center gap-2.5 sm:gap-3 pr-1">
                  <div className="flex justify-start">
                    <img
                      src={postureMiniImg}
                      alt="Ergonomic sitting posture diagram"
                      className="h-14 sm:h-18 md:h-22 w-auto object-contain opacity-90"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    {[
                      'Better Posture',
                      'Reduced Fatigue',
                      'Enhanced Productivity',
                      'All-Day Comfort',
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-center gap-1.5 sm:gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-slate-700">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="text-[11px] sm:text-[12.5px] font-medium text-slate-600">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Complete Furniture Solutions */}
      <section className="bg-white py-10 sm:py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10">
          
          {/* Header */}
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between mb-6 sm:mb-10">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                OUR PRODUCT RANGE
              </p>
              <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15]">
                Complete Furniture Solutions<br />
                for Every Space
              </h2>
            </div>
            
            <p className="max-w-md text-xs sm:text-[15px] leading-relaxed text-slate-500">
              From individual workstations to large corporate setups, we deliver furniture solutions designed to create comfortable, functional, and inspiring workspaces.
            </p>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5">
            {[
              { name: 'Office Chairs', image: aboutP1Img, link: '/shop?category=Office+Chairs' },
              { name: 'Office Tables', image: aboutP2Img, link: '/shop?category=Desks' },
              { name: 'Modular Workstations', image: aboutP3Img, link: '/shop?category=Workstations' },
              { name: 'Cafe Chairs', image: aboutP4Img, link: '/shop?category=Lounge' },
              { name: 'Cafe Tables', image: aboutP5Img, link: '/shop?category=Meeting+Tables' },
              { name: 'Storage Table', image: aboutP6Img, link: '/shop?category=Storage' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="group flex flex-col items-center justify-between rounded-2xl sm:rounded-3xl bg-[#f8f9fb] border border-slate-100 p-2.5 sm:p-4 transition-all duration-300 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1"
              >
                <div className="w-full flex-1 flex items-center justify-center py-1 sm:py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto object-contain max-h-[110px] sm:max-h-[140px] transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs font-medium text-slate-700 text-center transition-colors group-hover:text-accent">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Foundations */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              Our Foundations
            </p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-light leading-tight tracking-tight md:text-4xl lg:text-5xl">
              The pillars of our <span className="text-ink/35">execution.</span>
            </h2>
          </div>
          
          <div className="grid gap-6 sm:gap-8 border-t border-line pt-8 sm:pt-10 md:grid-cols-3 md:gap-6 lg:gap-10 lg:pt-12">
            {[
              {
                num: '01',
                title: 'Vision',
                desc: 'To become a leading furniture brand known for delivering comfort, quality, and innovative designs. We aim to transform everyday spaces into stylish and functional environments that reflect modern living.',
              },
              {
                num: '02',
                title: 'Mission',
                desc: 'To provide high-quality furniture solutions that combine durability, comfort, and contemporary style. We are committed to meeting customer needs through reliable service, skilled craftsmanship, and continuous improvement.',
              },
              {
                num: '03',
                title: 'Our Value',
                desc: 'We believe in quality, integrity, and customer satisfaction in everything we do. Our focus on innovation, trust, and excellence ensures that every product delivers lasting value and enhances the customer experience.',
              },
            ].map((item) => (
              <div key={item.num} className="group rounded-2xl sm:rounded-3xl border border-line p-6 sm:p-8 lg:p-10 transition hover:border-ink/20">
                <span className="mb-4 sm:mb-8 block text-[10px] font-medium tabular-nums tracking-widest text-accent">
                  {item.num}
                </span>
                <h3 className="mb-2.5 sm:mb-4 text-xs sm:text-[13px] font-bold uppercase tracking-[0.15em] text-ink">{item.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-ink/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 6. Quote */}
      <section className="bg-white py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-10">
          <div className="border-l-2 border-accent pl-5 sm:pl-8 md:pl-12">
            <p className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-light leading-relaxed text-ink/80 md:leading-[1.4]">
              "Our core objective at Brothers Furniture has never been just to sell chairs. We engineer foundational, ergonomic assets that empower businesses to work healthier and commercial interiors to stand distinct."
            </p>
            <div className="mt-6 sm:mt-10 flex items-center gap-3 sm:gap-4">
              <div className="h-px w-6 sm:w-8 bg-accent" />
              <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-ink">The Brothers Execution Team</p>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-ink/40">Ambattur, Chennai</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
