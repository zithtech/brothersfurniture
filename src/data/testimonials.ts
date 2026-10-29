export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  rating: number
}

/** Add new reviews here — the carousel and counter update automatically. */
export const testimonials: Testimonial[] = [
  {
    quote:
      'We outsourced our entire 120-seat corporate office workstation setup to Brothers Furniture. The ergonomic tracking on their task chairs is incredible, and our team productivity metrics have improved noticeably.',
    name: 'Anand Ramanathan',
    role: 'Operations Director',
    company: 'TechVantage',
    rating: 5,
  },
  {
    quote:
      'Their premium café chairs and custom lounge models completely transformed our restaurant aesthetic. The build durability handles high customer rotations effortlessly without showing any wear.',
    name: 'Meera Krishnan',
    role: 'Founder',
    company: 'The Urban Bean Café',
    rating: 5,
  },
  {
    quote:
      'The modular workstations and executive ergonomic chairs exceeded our design specifications. Their team completed the full three-floor fit-out within our tight 48-hour handover deadline.',
    name: 'Kavitha Sundaram',
    role: 'Head of Infrastructure',
    company: 'Ascendas Tech Park',
    rating: 5,
  },
  {
    quote:
      'Outstanding build quality and craftsmanship. From complimentary 2D CAD planning to on-site assembly, their commercial team delivered transparent pricing and flawless execution.',
    name: 'Rajesh Verma',
    role: 'VP Workplace Experience',
    company: 'Cognitio Hub',
    rating: 5,
  },
]

export const overallRating = { score: 4.9, projects: '240+' }
