export interface Client {
  name: string
  /** File in /public/clients — trimmed logo on a white background. */
  logo: string
  sector: string
}

/**
 * To add a client: put their logo in `public/clients/` and add one line below.
 * Home page and /clients page update automatically (marquee switches to two rows past 12 clients).
 */
export const clients: Client[] = [
  { name: 'PVR Cinemas', logo: 'pvr-cinemas.webp', sector: 'Entertainment' },
  { name: 'BNR Infrastructure', logo: 'bnr-infrastructure.webp', sector: 'Infrastructure' },
  { name: 'Surya Dev Alloy', logo: 'surya-dev-alloy.webp', sector: 'Manufacturing' },
  { name: 'Precision Infomatic', logo: 'precision-infomatic.webp', sector: 'Technology' },
  { name: 'Merit Software', logo: 'merit-software.webp', sector: 'Technology' },
  { name: 'Nibav Lifts', logo: 'nibav-lifts.webp', sector: 'Engineering' },
  { name: 'Billroth Hospital', logo: 'billroth-hospital.webp', sector: 'Healthcare' },
  { name: 'Indian Bank', logo: 'indian-bank.webp', sector: 'Banking & Finance' },
  { name: 'IIFL Finance', logo: 'iifl-finance.webp', sector: 'Banking & Finance' },
  { name: 'Prasad Corporation', logo: 'prasad-corporation.webp', sector: 'Media' },
  { name: 'Gen X Lead', logo: 'gen-x-lead.webp', sector: 'Services' },
]

export const clientLogo = (c: Client | { logo?: string }) => {
  if (!c || !c.logo) return ''
  const logo = c.logo.trim()
  if (logo.startsWith('http://') || logo.startsWith('https://')) {
    return logo
  }
  if (logo.startsWith('/clients/')) {
    return logo
  }
  if (logo.startsWith('clients/')) {
    return `/${logo}`
  }
  if (logo.startsWith('/')) {
    return logo
  }
  return `/clients/${logo}`
}

export const sectors = [...new Set(clients.map((c) => c.sector))].sort()
