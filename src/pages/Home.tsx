import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import WholesaleRange from '../components/WholesaleRange'
import Manufacturing, { MadeInChennai } from '../components/Manufacturing'

import Perks from '../components/Perks'
import Faq from '../components/Faq'
import Clients from '../components/Clients'
import Testimonials from '../components/Testimonials'
import turnkeyOfficeImg from '../assets/turnkey-office.webp'
import setupshowVideo from '../assets/setupshow.mp4'

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      })
    }
  }, [isVideoPlaying])

  const handleToggleVideo = () => {
    setIsVideoPlaying((prev) => !prev)
  }

  return (
    <>
      <Hero />

      <WholesaleRange />

      <Manufacturing />

      {/* Planning promo */}
      <section className="mx-auto mt-0 max-w-7xl px-3 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] lg:rounded-[2.5rem] bg-ink text-white shadow-2xl">
          {/* Subtle glow effects */}
          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky/10 blur-[100px] pointer-events-none"></div>
          
          <div className="grid relative z-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:py-16 lg:px-14 xl:px-20">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-accent" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                  Turnkey Office Fit-Outs
                </span>
              </div>
              
              <h2 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium leading-[1.08] tracking-tight">
                Your whole floor,<br />
                <span className="text-white/40">planned for you.</span>
              </h2>
              
              <p className="mt-4 sm:mt-5 max-w-sm sm:max-w-md text-xs sm:text-[14px] leading-relaxed text-white/60">
                Send us your floor plan and headcount. Our designers return a furnished layout and a single quote — usually within 48 hours.
              </p>
              
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-5">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-[13px] font-semibold text-ink transition-all hover:scale-105 hover:bg-accent hover:text-white"
                >
                  Request a layout
                </Link>
                <button
                  type="button"
                  onClick={handleToggleVideo}
                  className={`text-xs sm:text-[13px] font-medium transition flex items-center gap-2.5 ${
                    isVideoPlaying ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                      isVideoPlaying
                        ? 'border-accent bg-accent text-white shadow-md shadow-accent/25'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {isVideoPlaying ? (
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="h-3 w-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </span>
                  <span>{isVideoPlaying ? 'Pause video' : 'How it works'}</span>
                </button>
              </div>
            </div>
            
            <div className="relative min-h-[340px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-full p-2.5 sm:p-3 lg:p-4 flex flex-col justify-end">
              <div className="absolute inset-2.5 sm:inset-3 lg:inset-4 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-black/50">
                {isVideoPlaying ? (
                  <div className="relative h-full w-full">
                    <video
                      ref={videoRef}
                      src={setupshowVideo}
                      controls
                      autoPlay
                      playsInline
                      className="h-full w-full object-cover"
                      onEnded={() => setIsVideoPlaying(false)}
                    />
                    
                    {/* Floating Back to Photo button */}
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(false)}
                      className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-white backdrop-blur-md border border-white/20 transition hover:bg-black hover:scale-105 shadow-xl"
                    >
                      <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Back to Photo</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      src={turnkeyOfficeImg}
                      alt="A modern open-plan office"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105 cursor-pointer"
                      onClick={() => setIsVideoPlaying(true)}
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-ink/20 lg:to-ink/90 pointer-events-none"></div>

                    {/* Subtle Watch Setup badge on image */}
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(true)}
                      className="group absolute top-4 right-4 sm:top-5 sm:right-5 z-10 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium text-white/90 backdrop-blur-md border border-white/20 transition hover:bg-black/80 hover:text-white"
                    >
                      <span className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-white/20 group-hover:bg-accent group-hover:text-white transition">
                        <svg className="h-2 w-2 sm:h-2.5 sm:w-2.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <span>Watch Setup</span>
                    </button>
                  </>
                )}
              </div>

              {/* Custom Workspace Solutions tag - visible when video is not playing */}
              {!isVideoPlaying && (
                <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 w-[94%] sm:w-auto sm:left-8 md:left-10 sm:translate-x-0 lg:left-12 flex items-center gap-2.5 sm:gap-4 rounded-[2rem] sm:rounded-[2.5rem] bg-[#f8f9fb] p-1.5 sm:p-2 pr-3.5 sm:pr-5 shadow-[0_20px_50px_rgb(0,0,0,0.3)] z-10 max-w-[420px] transition-all duration-300">
                  {/* Cube Icon */}
                  <div className="flex h-10 w-10 sm:h-[52px] sm:w-[52px] shrink-0 items-center justify-center rounded-full bg-[#e5ebf0]">
                    <svg className="h-5 w-5 sm:h-[22px] sm:w-[22px] text-[#141b29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0 py-0.5 sm:py-1">
                    <p className="text-[12.5px] sm:text-[14.5px] font-bold text-[#141b29] leading-[1.2] truncate">Custom Workspace Solutions</p>
                    <p className="text-[10.5px] sm:text-[12px] font-medium text-[#64748b] leading-[1.3] mt-0.5 sm:mt-1 truncate sm:whitespace-normal">
                      Designed for Comfort, Productivity & Style
                    </p>
                  </div>
                  {/* Arrow triggers video playback */}
                  <button
                    type="button"
                    onClick={() => setIsVideoPlaying(true)}
                    className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#ebf0f5] transition hover:bg-[#e2e8f0]"
                    title="Watch setup video"
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-[#141b29]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <Perks />

      <Clients />

      <Testimonials />

      <Faq />
      <MadeInChennai />
    </>
  )
}
