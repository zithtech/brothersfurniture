import type { ReactNode } from 'react'

// Fine line-art icons for the wholesale range, drawn on a 32×32 grid.
const chairBase = (
  <>
    <path d="M16 20v5M9 27.5 16 25l7 2.5M16 25v2.5" />
    <circle cx="9" cy="28.5" r="1" />
    <circle cx="16" cy="28.8" r="1" />
    <circle cx="23" cy="28.5" r="1" />
  </>
)
const seat = <rect x="7" y="17" width="18" height="3" rx="1.5" />
const arms = <path d="M8.5 13.5V17M23.5 13.5V17M7 13.5h3M22 13.5h3" />

const officeChair = (
  <>
    <path d="M11.5 16v-6a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v6M14 10.5h4M14 13h4" />
    {seat}
    {arms}
    {chairBase}
  </>
)

const rangeIcons = {
  executiveChair: (
    <>
      <path d="M11 16V6a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v10M13 6.5h6" />
      {seat}
      {arms}
      {chairBase}
    </>
  ),
  officeChair,
  importedChair: (
    <>
      <g transform="translate(-3.5 1.8) scale(0.9)">{officeChair}</g>
      <circle cx="25" cy="7" r="4.5" />
      <ellipse cx="25" cy="7" rx="1.9" ry="4.5" />
      <path d="M20.5 7h9" />
    </>
  ),
  trainingChair: (
    <>
      <rect x="8" y="4" width="11" height="9" rx="2.5" />
      <path d="M6.5 16h14M10.5 13v3M16.5 13v3M8 16 7 28M19 16l1 12M8.5 22h10" />
      <path d="M20 12.5h8.5l-1 2.5H20M23 15v3.5l-2.5 1" />
    </>
  ),
  publicSeating: (
    <>
      <rect x="3" y="8" width="7.5" height="8" rx="2" />
      <rect x="12.25" y="8" width="7.5" height="8" rx="2" />
      <rect x="21.5" y="8" width="7.5" height="8" rx="2" />
      <path d="M2.5 18.5h27M2 21.5h28M7 21.5V28M25 21.5V28M4.5 28h5M22.5 28h5" />
    </>
  ),
  cafeChair: (
    <>
      <path d="M11 15.5V8a5 5 0 0 1 10 0v7.5M14 4v11.5M18 4v11.5" />
      <path d="M9 16h14M10 16 8.5 28M22 16l1.5 12M13 16l-.5 9M19 16l.5 9" />
    </>
  ),
  modularWorkstation: (
    <>
      <path d="M5 16v-6h22v6" />
      <rect x="7.5" y="11.5" width="6" height="4" rx=".5" />
      <rect x="18.5" y="11.5" width="6" height="4" rx=".5" />
      <path d="M2 18h28M4 18v10M28 18v10" />
      <rect x="7" y="18" width="5.5" height="8.5" />
      <rect x="19.5" y="18" width="5.5" height="8.5" />
      <path d="M7 22h5.5M19.5 22h5.5" />
    </>
  ),
  officeModularWorkstation: (
    <>
      <rect x="6" y="7" width="20" height="18" rx="1" />
      <path d="M16 7v18M6 16h20" strokeWidth="2" />
      <path d="M9 13.5h4.5M18.5 13.5H23M9 18.5h4.5M18.5 18.5H23" />
      <circle cx="11" cy="3.5" r="2" />
      <circle cx="21" cy="3.5" r="2" />
      <circle cx="11" cy="28.5" r="2" />
      <circle cx="21" cy="28.5" r="2" />
    </>
  ),
  workstationDesk: (
    <>
      <rect x="10.5" y="4.5" width="11" height="7.5" rx="1" />
      <path d="M16 12v4M13.5 16h5M3 17.5h26M5 17.5V28" />
      <rect x="19" y="17.5" width="8" height="10.5" />
      <path d="M19 21h8M19 24.5h8M22 19.2h2M22 22.7h2M22 26.2h2" />
    </>
  ),
  officeTable: (
    <>
      <rect x="2" y="11" width="28" height="3" rx="1" />
      <rect x="4" y="14" width="7.5" height="14" />
      <rect x="20.5" y="14" width="7.5" height="14" />
      <path d="M11.5 18.5h9M4 18.5h7.5M4 23h7.5M20.5 18.5H28M20.5 23H28M6.8 16.3h2M23.3 16.3h2M24 4v4M22 8h4M24 4l3 1.5" />
    </>
  ),
  cafeTable: (
    <>
      <ellipse cx="16" cy="11" rx="12" ry="3.5" />
      <path d="M16 14.5v11.5" />
      <ellipse cx="16" cy="27.5" rx="6" ry="1.5" />
      <path d="M14.5 4.5h3V7a1.5 1.5 0 0 1-3 0zM17.5 5.2h.6a.8.8 0 0 1 0 1.6h-.6" />
    </>
  ),
  storageTable: (
    <>
      <rect x="3" y="10" width="26" height="16" rx="1" />
      <path d="M16 10v16M3 15.3h13M3 20.6h13M8 12.7h3M8 18h3M8 23.3h3M19 16.5v3M5 26v2.5M27 26v2.5" />
      <path d="M22 10V7.5M20 7.5h4l-.5-3h-3z" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type RangeIconName = keyof typeof rangeIcons

export function RangeIcon({ name, className = '' }: { name: RangeIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {rangeIcons[name]}
    </svg>
  )
}
