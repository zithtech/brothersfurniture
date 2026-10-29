import type { ReactNode } from 'react'

export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-surface">
      {/* Subtle premium gradient washes for depth */}
      <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
      <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-sky/30 blur-[120px]" />
      
      {/* Very subtle grid pattern overlay (optional but adds texture) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48L3N2Zz4=')] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 md:py-16">
        <div className="animate-rise border-l-2 border-accent pl-4 text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </div>
        <h1 className="mt-3 animate-rise text-4xl font-light tracking-tight text-ink [animation-delay:100ms] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children && (
          <div className="mt-4 max-w-xl animate-rise text-[15px] leading-relaxed text-ink/60 [animation-delay:180ms]">
            {children}
          </div>
        )}
        {/* Bottom border accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>
    </div>
  )
}
