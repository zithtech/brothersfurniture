import { buildCatalogue, type CatalogueTypeDef } from './catalogueUtils'

export const deskTypes: CatalogueTypeDef[] = [
  {
    id: 'office',
    label: 'Office Desks',
    blurb: 'Everyday desks with built-in or mobile pedestals for individual workspaces.',
    features: ['Lockable drawer pedestal', 'Scratch-resistant laminate', 'Cable grommet on request'],
  },
  {
    id: 'executive',
    label: 'Executive Desks',
    blurb: 'Twin-pedestal desks with generous storage for cabins and managers’ rooms.',
    features: ['Twin storage pedestals', 'Lockable drawers', 'Full-width worksurface'],
  },
  {
    id: 'compact',
    label: 'Compact & Study',
    blurb: 'Space-saving desks with open shelving for home offices and study rooms.',
    features: ['Compact 120 cm footprint', 'Open side shelving', 'Easy to assemble'],
  },
]

/** Images: brothersfurniture.co.in/office-table-manufacturers-in-chennai.php */
export const deskCatalogue = buildCatalogue('desks', deskTypes, [
  { id: 'two-tone-office-desk', name: 'Two-Tone Office Desk with Pedestal', type: 'office', image: 'table1.webp' },
  { id: 'white-office-desk', name: 'White Office Desk with Mobile Pedestal', type: 'office', image: 'table6.webp', fit: 'cover' },
  { id: 'twin-pedestal-desk', name: 'Twin-Pedestal Executive Desk, Beech', type: 'executive', image: 'table7.webp' },
  { id: 'oak-executive-desk', name: 'Executive Desk with Drawers, Oak', type: 'executive', image: 'table8.webp' },
  { id: 'open-shelf-study-desk', name: 'Open-Shelf Study Desk', type: 'compact', image: 'table2.webp' },
])
