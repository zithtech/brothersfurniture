export default function SectionHeading({ eyebrow, title, align = 'center' }: { eyebrow: string; title: string; align?: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-[40px]">{title}</h2>
    </div>
  )
}
