import type { SVGProps } from 'react'

const base = (props: SVGProps<SVGSVGElement>) => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  ...props,
})

export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const CartIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 4h2l2.2 11.1a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
    <circle cx="9.5" cy="20" r="1" />
    <circle cx="17" cy="20" r="1" />
  </svg>
)

export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m15 5-7 7 7 7" />
  </svg>
)

export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)

export const MenuIcon = ({ open, ...p }: SVGProps<SVGSVGElement> & { open: boolean }) => (
  <svg {...base(p)}>
    <path d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h10'} />
  </svg>
)

export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const HomeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1v-9.5Z" />
  </svg>
)

export const ShopBagIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 7V5a4 4 0 0 1 8 0v2" />
    <rect width="18" height="15" x="3" y="7" rx="2" />
  </svg>
)

export const ChairIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M8 4a3 3 0 0 1 8 0v6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4Z" />
    <path d="M5 13h14a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1Z" />
    <path d="M12 16v4" />
    <path d="M8 20h8" />
    <circle cx="7" cy="21" r="0.75" />
    <circle cx="17" cy="21" r="0.75" />
  </svg>
)

export const BuildingIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect width="14" height="18" x="5" y="3" rx="2" />
    <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
  </svg>
)

export const UsersIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export const MailIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect width="20" height="15" x="2" y="4.5" rx="2" />
    <path d="m22 6.5-10 7L2 6.5" />
  </svg>
)

export const TruckIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14 18V6a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M14 8h4.5a2 2 0 0 1 1.6.8L23 13v4a1 1 0 0 1-1 1h-2" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
)

export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
)

export const WhatsAppIcon = ({ className, ...p }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...p}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 6.99C9.36 6.99 9.09 7.05 8.87 7.3C8.65 7.54 8.02 8.13 8.02 9.35C8.02 10.56 8.91 11.73 9.03 11.89C9.16 12.06 10.73 14.6 13.22 15.58C15.29 16.39 15.71 16.23 16.16 16.19C16.61 16.15 17.62 15.59 17.83 15.01C18.04 14.43 18.04 13.93 17.98 13.83C17.92 13.73 17.76 13.67 17.51 13.54C17.26 13.42 16.05 12.82 15.82 12.74C15.6 12.66 15.43 12.61 15.27 12.86C15.11 13.11 14.63 13.67 14.49 13.83C14.35 14 14.2 14.02 13.95 13.9C13.7 13.77 12.89 13.51 11.94 12.66C11.2 12 10.7 11.18 10.56 10.93C10.41 10.68 10.54 10.55 10.67 10.42C10.78 10.31 10.92 10.13 11.05 9.99C11.17 9.84 11.22 9.74 11.3 9.57C11.38 9.41 11.34 9.26 11.28 9.14C11.22 9.02 10.73 7.81 10.52 7.32C10.32 6.84 10.12 6.91 9.97 6.9C9.83 6.9 9.67 6.9 9.53 6.99Z" />
  </svg>
)

