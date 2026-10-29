import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons'
import workshopImg from '../assets/BrothersFurnitureWorkshop.webp'
import processImg from '../assets/WoodworkingWorkshopProcess.webp'
import materialImg from '../assets/EngineeredWood.webp'
import sofaMaterialImg from '../assets/PremiumSofaMaterials.webp'
import factoryImg from '../assets/FurnitureFactory.webp'
import cutoutImg from '../assets/Tabletop.webp'
import mapImg from '../assets/India Map Routes to Chennai.webp'
import deliveryImg from '../assets/FurnitureDelivery.webp'

export default function Manufacturing() {
  return (
    <section className="bg-white text-ink pt-20 pb-6 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <p className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-8 bg-accent" />
              Our Own Manufacturing
            </p>
            <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
              Quality Furniture<br />
              <span className="text-ink/40">Built In-House.</span>
            </h2>
            <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base leading-relaxed text-ink/70">
              At Brothers Furniture, we design and manufacture every piece in our own facility using premium materials, advanced machinery and skilled craftsmanship — ensuring superior quality, durability and timely delivery.
            </p>

            <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-line">
              <div className="rounded-2xl border border-line/60 bg-stone-50/50 p-3 sm:p-4 transition hover:bg-white hover:shadow-xs">
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
                  <svg className="h-4.5 w-4.5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-[13px] font-semibold leading-snug">Premium<br />Raw Materials</h4>
                <p className="mt-1 text-[10px] text-ink/60 leading-tight">Sourced for strength & durability</p>
              </div>
              <div className="rounded-2xl border border-line/60 bg-stone-50/50 p-3 sm:p-4 transition hover:bg-white hover:shadow-xs">
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
                  <svg className="h-4.5 w-4.5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-[13px] font-semibold leading-snug">Advanced<br />Machinery</h4>
                <p className="mt-1 text-[10px] text-ink/60 leading-tight">Precision for consistent quality</p>
              </div>
              <div className="rounded-2xl border border-line/60 bg-stone-50/50 p-3 sm:p-4 transition hover:bg-white hover:shadow-xs">
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
                  <svg className="h-4.5 w-4.5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-[13px] font-semibold leading-snug">Skilled<br />Craftsmen</h4>
                <p className="mt-1 text-[10px] text-ink/60 leading-tight">Expertise in every detail</p>
              </div>
              <div className="rounded-2xl border border-line/60 bg-stone-50/50 p-3 sm:p-4 transition hover:bg-white hover:shadow-xs">
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
                  <svg className="h-4.5 w-4.5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-[13px] font-semibold leading-snug">Quality<br />Assurance</h4>
                <p className="mt-1 text-[10px] text-ink/60 leading-tight">Thorough checks at every stage</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link to="/contact" className="btn-solid gap-3 py-3 sm:py-3.5 px-5 sm:px-6 text-xs sm:text-[13px]">
                Explore Our Manufacturing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="flex items-center gap-3 text-xs sm:text-[13px] font-semibold transition hover:opacity-80">
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-line bg-surface hover:bg-ink/5 transition">
                  <svg className="ml-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch Process
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative mt-8 lg:mt-0">
            {/* Floating Card (visible on large widescreen) */}
            <div className="hidden xl:block absolute -left-12 2xl:-left-16 top-6 z-10 w-64 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-line/50">
              <ul className="space-y-4">
                <li className="flex items-center gap-3 border-b border-line/60 pb-3">
                  <svg className="h-5 w-5 text-ink shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-medium text-[13px] leading-tight">Own<br />Manufacturing Facility</span>
                </li>
                <li className="flex items-center gap-3 border-b border-line/60 pb-3">
                  <svg className="h-5 w-5 text-ink shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium text-[13px] leading-tight">Skilled<br />Production Team</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-ink shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="font-medium text-[13px] leading-tight">Quality Controlled<br />Process</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <img src={workshopImg} alt="Workshop" loading="lazy" decoding="async" className="w-full object-contain rounded-2xl shadow-sm" />

              <div>
                <img src={processImg} alt="Manufacturing Processes" loading="lazy" decoding="async" className="w-full object-contain" />
                <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mt-3">
                  <div>
                    <h5 className="text-xs sm:text-[13px] font-semibold text-center leading-tight">Precision Cutting</h5>
                    <p className="text-[10px] sm:text-[11px] text-ink/60 text-center mt-0.5">Advanced CNC Machines</p>
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-[13px] font-semibold text-center leading-tight">Expert Finishing</h5>
                    <p className="text-[10px] sm:text-[11px] text-ink/60 text-center mt-0.5">Smooth & Refined Surface</p>
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-[13px] font-semibold text-center leading-tight">Durable Coating</h5>
                    <p className="text-[10px] sm:text-[11px] text-ink/60 text-center mt-0.5">Long-Lasting Finish</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Premium Materials Box - Separated */}
        <div className="mt-12 sm:mt-16 lg:mt-24 rounded-2xl sm:rounded-[2rem] bg-[#f4f5f6] py-6 sm:py-8 px-4 sm:px-6 lg:py-10 lg:px-10 relative overflow-hidden">
          {/* Decorative background blurs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/60 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/60 blur-3xl rounded-full translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 mb-6 lg:mb-8">
              <span className="h-[2px] w-8 bg-ink/20 rounded-full" />
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">Premium Materials We Use</h3>
              <span className="h-[2px] w-8 bg-ink/20 rounded-full" />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 max-w-[90rem] mx-auto w-full">
              <div className="flex-1 w-full transition-transform hover:-translate-y-1 duration-300">
                <img src={materialImg} alt="Engineered Wood" loading="lazy" decoding="async" className="w-full h-auto object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1 w-full transition-transform hover:-translate-y-1 duration-300">
                <img src={sofaMaterialImg} alt="Sofa Materials" loading="lazy" decoding="async" className="w-full h-auto object-contain mix-blend-multiply -translate-y-1 md:-translate-y-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MadeInChennai() {
  return (
    <section className="mx-auto mt-16 sm:mt-20 md:mt-24 mb-0 max-w-7xl px-3 sm:px-6 lg:px-10">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 rounded-2xl sm:rounded-[2rem] bg-white border border-line overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-line shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

          {/* Made in Chennai Panel */}
          <div className="p-5 sm:p-8 lg:p-10 grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Text Side */}
            <div className="flex flex-col justify-start">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Manufacturing</p>
              <h3 className="mt-2.5 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
                Made in<br />
                <span className="text-4xl sm:text-5xl lg:text-6xl text-ink/40">Chennai</span>
              </h3>
              <p className="mt-3 sm:mt-4 text-xs sm:text-[15px] leading-relaxed text-ink/70">
                We design and manufacture our furniture at our own facility in Chennai, using premium materials and advanced production processes.
              </p>

              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="pt-0.5">
                    <h4 className="text-xs sm:text-[15px] font-bold text-ink leading-tight">Own Manufacturing Facility</h4>
                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-[13px] text-ink/60">End-to-end production control</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="pt-0.5">
                    <h4 className="text-xs sm:text-[15px] font-bold text-ink leading-tight">Skilled Production Team</h4>
                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-[13px] text-ink/60">Experienced & dedicated team</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="pt-0.5">
                    <h4 className="text-xs sm:text-[15px] font-bold text-ink leading-tight">Quality Controlled Process</h4>
                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-[13px] text-ink/60">Every product meets high standards</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-10">
                <Link to="/contact" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#1a1a1a] px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-[14px] font-semibold text-white transition hover:bg-black w-full sm:w-auto">
                  Our Manufacturing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex flex-col gap-4">
              <img src={factoryImg} alt="Factory" loading="lazy" decoding="async" className="w-full h-[240px] sm:h-[320px] lg:h-[400px] object-cover rounded-xl sm:rounded-[1.5rem]" />
              <img src={cutoutImg} alt="Manufacturing Details" loading="lazy" decoding="async" className="w-full h-auto object-contain rounded-xl" />
            </div>
          </div>

          {/* Supplied at Scale Panel */}
          <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-between relative">
            {/* Absolute Map Background */}
            <div className="absolute top-0 right-0 lg:-top-4 lg:-right-4 w-[180px] sm:w-[240px] md:w-[300px] lg:w-[360px] pointer-events-none z-0 opacity-25 sm:opacity-40 md:opacity-85">
              <img src={mapImg} alt="India Map Routes" loading="lazy" decoding="async" className="w-full h-auto object-contain mix-blend-multiply" />
            </div>

            <div className="relative z-10 mb-6 sm:mb-8 max-w-[85%] md:max-w-[65%] lg:max-w-[55%]">
              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/60">Supply & Distribution</p>
                <h3 className="mt-2.5 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink">
                  Supplied<br />
                  <span className="text-4xl sm:text-5xl lg:text-6xl text-ink/40">at Scale</span>
                </h3>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-[13px] leading-relaxed text-ink/70">
                  From Chennai to workplaces across India, we supply high-quality furniture in bulk with reliable logistics and timely delivery.
                </p>
              </div>
            </div>

            {/* 3 cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 relative z-10">
              <div className="rounded-2xl border border-line p-3.5 sm:p-4 bg-white/95 backdrop-blur-xs">
                <div className="mb-2 flex text-ink">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-[13px] font-semibold text-ink leading-tight">Pan India<br />Supply</h4>
                <p className="mt-1 text-[10.5px] sm:text-[11px] text-ink/60 leading-relaxed">Delivering to offices, institutions & commercial spaces.</p>
              </div>
              <div className="rounded-2xl border border-line p-3.5 sm:p-4 bg-white/95 backdrop-blur-xs">
                <div className="mb-2 flex text-ink">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-[13px] font-semibold text-ink leading-tight">Bulk Orders<br />&nbsp;</h4>
                <p className="mt-1 text-[10.5px] sm:text-[11px] text-ink/60 leading-relaxed">Equipped to handle large-scale demands with quality.</p>
              </div>
              <div className="rounded-2xl border border-line p-3.5 sm:p-4 bg-white/95 backdrop-blur-xs">
                <div className="mb-2 flex text-ink">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xs sm:text-[13px] font-semibold text-ink leading-tight">On-Time<br />Delivery</h4>
                <p className="mt-1 text-[10.5px] sm:text-[11px] text-ink/60 leading-relaxed">Reliable logistics and timely fulfillment.</p>
              </div>
            </div>

            {/* Delivery Image */}
            <div className="mt-auto relative z-10">
              <img src={deliveryImg} alt="Furniture Delivery" loading="lazy" decoding="async" className="w-full h-[180px] sm:h-[220px] object-cover rounded-xl sm:rounded-[1.25rem]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
