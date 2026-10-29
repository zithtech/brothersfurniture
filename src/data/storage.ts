import { buildCatalogue, type CatalogueTypeDef } from './catalogueUtils'

export const storageTypes: CatalogueTypeDef[] = [
  {
    id: 'cabinets',
    label: 'Cabinets & Cupboards',
    blurb: 'Lockable cabinets, sideboards and tall cupboards for files and supplies.',
    features: ['Lockable doors', 'Adjustable internal shelves', 'Matching desk finishes'],
  },
  {
    id: 'pedestals',
    label: 'Mobile Pedestals',
    blurb: 'Under-desk drawer units on castors that move with the user.',
    features: ['Central locking', 'Smooth-running castors', 'Filing drawer option'],
  },
]

/** Images: brothersfurniture.co.in/storage-table-manufacturers-in-chennai.php */
export const storageCatalogue = buildCatalogue('storage', storageTypes, [
  { id: 'sideboard-with-drawers', name: 'Two-Door Sideboard with Drawers', type: 'cabinets', image: 'storage1.webp' },
  { id: 'low-lockable-cabinet', name: 'Low Two-Door Lockable Cabinet', type: 'cabinets', image: 'storage2.webp' },
  { id: 'cabinet-with-drawer', name: 'Two-Door Cabinet with Drawer', type: 'cabinets', image: 'storage3.webp' },
  { id: 'tall-storage-cabinet', name: 'Tall Two-Door Storage Cabinet', type: 'cabinets', image: 'storage4.webp' },
  { id: 'white-mobile-pedestal', name: 'Mobile Pedestal, White', type: 'pedestals', image: 'storage5.webp' },
  { id: 'oak-mobile-pedestal', name: 'Mobile Pedestal, Oak & Silver', type: 'pedestals', image: 'storage6.webp' },
  { id: 'filing-pedestal', name: 'Two-Drawer Filing Pedestal', type: 'pedestals', image: 'storage7.webp' },
])
