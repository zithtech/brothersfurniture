import { Link } from 'react-router-dom'
import { company, whatsappLink } from '../data/company'
import { categories } from '../data/products'
import Logo from './Logo'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-12 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 px-3 sm:px-6 lg:px-10 py-12 sm:py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="h-10 sm:h-14" />
          <p className="mt-4 sm:mt-6 max-w-sm text-xs sm:text-sm leading-relaxed text-muted">
            Thoughtfully designed office furniture for teams that care about how they work — from a single desk to an
            entire floor.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="mb-4 sm:mb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-ink">Collections & Orders</p>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[15px] text-muted">
            {categories.map((c) => (
              <li key={c}>
                <Link to={`/shop?category=${encodeURIComponent(c)}`} className="transition hover:text-accent">
                  {c}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/track" className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
                <span>Track Factory Order →</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="mb-4 sm:mb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-ink">Factory & Studio</p>
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-[15px] text-muted">
            <li>
              <a href={company.map.link} target="_blank" rel="noreferrer" className="transition hover:text-accent">
                {company.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </a>
            </li>
            {company.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="transition hover:text-accent">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${company.email}`} className="break-all transition hover:text-accent">
                {company.email}
              </a>
            </li>
            <li className="flex gap-4 sm:gap-5 pt-1 sm:pt-2 text-xs sm:text-sm">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="border-b border-ink/30 pb-0.5 text-ink transition hover:border-accent hover:text-accent">
                WhatsApp
              </a>
              <a href={company.map.link} target="_blank" rel="noreferrer" className="border-b border-ink/30 pb-0.5 text-ink transition hover:border-accent hover:text-accent">
                Get directions
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-line px-3 sm:px-6 lg:px-10 py-5 sm:py-6 text-xs sm:text-sm text-muted sm:flex-row">
        <span>© {YEAR} Brothers Furniture. All rights reserved.</span>
        <span>Inspiring better workspaces.</span>
      </div>
    </footer>
  )
}
