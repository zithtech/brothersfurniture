import { buildCatalogue, type CatalogueTypeDef } from './catalogueUtils'

export const meetingTableTypes: CatalogueTypeDef[] = [
  {
    id: 'conference',
    label: 'Conference Tables',
    blurb: 'Boardroom and conference tables sized for 6 to 16 people, with power and data access.',
    features: ['Built-in power & data boxes', 'Modesty panels and cable trays', 'Custom lengths and shapes'],
  },
  {
    id: 'cafe',
    label: 'Café Tables',
    blurb: 'Round and square pedestal tables for cafés, breakout areas and pantries.',
    features: ['Heavy steel pedestal base', 'Wood, laminate or stone-look tops', 'Indoor and covered outdoor use'],
  },
  {
    id: 'dining',
    label: 'Cafeteria & Dining',
    blurb: 'Long-run dining tables for canteens, cafeterias and staff dining halls.',
    features: ['Steel frame construction', 'Easy-clean tops', 'Bulk canteen fit-outs'],
  },
]

/** Images: brothersfurniture.co.in office-table and cafe-table pages */
export const meetingTableCatalogue = buildCatalogue('meeting-tables', meetingTableTypes, [
  { id: 'racetrack-conference', name: 'Racetrack Conference Table', type: 'conference', image: 'table3.webp' },
  { id: 'boat-conference', name: 'Boat-Shaped Conference Table', type: 'conference', image: 'table4.webp', fit: 'cover' },
  { id: 'boardroom-media-wall', name: 'Boardroom Table with Media Wall', type: 'conference', image: 'table5.webp', fit: 'cover' },
  { id: 'round-cafe-table', name: 'Round Café Table, Cross Base', type: 'cafe', image: 'cafe-table3.webp', fit: 'cover' },
  { id: 'square-pedestal-table', name: 'Square Pedestal Café Table, 70 cm', type: 'cafe', image: 'cafe-table4.webp' },
  { id: 'marble-cafe-table', name: 'Square Marble-Finish Café Table', type: 'cafe', image: 'cafe-table5.webp', fit: 'cover' },
  { id: 'wood-dining-table', name: 'Rectangular Wood-Top Dining Table', type: 'dining', image: 'cafe-table1.webp', fit: 'cover' },
  { id: 'industrial-dining-table', name: 'Industrial Steel-Frame Dining Table', type: 'dining', image: 'cafe-table2.webp', fit: 'cover' },
  { id: 'cafeteria-table-set', name: 'Cafeteria Table Set', type: 'dining', image: 'cafe-table6.webp', fit: 'cover' },
  { id: 'canteen-dining-tables', name: 'Canteen Dining Tables', type: 'dining', image: 'cafe-table7.webp', fit: 'cover' },
])
