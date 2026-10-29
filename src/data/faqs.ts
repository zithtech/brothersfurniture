import { company } from './company'
import { ergonomicChairs } from './ergonomicChairs'

export interface Faq {
  q: string
  a: string
}

/** Home-page FAQ. Edit freely — answers avoid figures we haven't confirmed (warranty years, MOQ, lead times). */
export const faqs: Faq[] = [
  {
    q: 'Do you manufacture the furniture yourselves?',
    a: `Yes. Brothers Furniture is a manufacturer — our chairs, workstations, tables and storage are made at our own factory in Ambattur, Chennai, so you buy direct without middlemen.`,
  },
  {
    q: 'Do you take wholesale and bulk orders?',
    a: 'Yes. We supply offices, cafés, institutions and resellers — from a handful of chairs to complete office fit-outs. Trade, reseller and project pricing is available on request.',
  },
  {
    q: 'Can workstations and tables be customised?',
    a: 'Workstations, desks and conference tables can be made to your floor plan — sizes, seat counts, partition heights and finishes. Many chairs are also available in multiple colours and in mesh or cushioned versions.',
  },
  {
    q: 'What types of chairs do you offer?',
    a: `Our ergonomic range has ${ergonomicChairs.length} models across high back, medium back, mesh seat and visitor chairs, plus executive, training, café, imported and public seating.`,
  },
  {
    q: 'Do you deliver and install?',
    a: 'Yes — our team delivers and installs, including assembly of workstations on site. Share your location when you request a quote and we will confirm delivery for your city.',
  },
  {
    q: 'How do I get a quote?',
    a: `Call ${company.phones[0].display}, message us on WhatsApp, or send the contact form with the products, quantities and — for fit-outs — your floor plan. We usually reply within one business day.`,
  },
  {
    q: 'Can I visit your factory and studio?',
    a: `Of course. We are at ${company.addressLines.join(' ')} Please call ahead so the right person is available to walk you through samples.`,
  },
]
