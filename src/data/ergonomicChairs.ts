import type { CatalogueItem } from '../types'

export type ChairType =
  | 'ergonomic-chairs'
  | 'executive-chairs'
  | 'mesh-office-chairs'
  | 'task-chairs'
  | 'staff-chairs'

export interface ErgonomicChair {
  id: string
  name: string
  type: ChairType
  /** File in /public/products/ergonomic */
  image: string
}

export const chairTypes: { id: ChairType; label: string; blurb: string; features: string[] }[] = [
  {
    id: 'ergonomic-chairs',
    label: 'Ergonomic Chairs',
    blurb: 'Engineered posture support with dynamic lumbar, 4D adjustable armrests and synchronized recline for 10+ hours.',
    features: ['Adaptive Lumbar Support', '4D Adjustable Armrests', 'Class-4 Gas Lift', 'Synchronized Multi-Tilt'],
  },
  {
    id: 'executive-chairs',
    label: 'Executive Chairs',
    blurb: 'Commanding high-back silhouettes with plush cushioned leatherette, headrest and polished aluminium base.',
    features: ['High-Back Headrest Cushion', 'Multi-Position Tilt Lock', 'Plush Padded Leatherette', 'Aluminium Star Base'],
  },
  {
    id: 'mesh-office-chairs',
    label: 'Mesh Office Chairs',
    blurb: 'Breathable, temperature-regulating high-tensile mesh back and seat that stay cool through extended workdays.',
    features: ['Breathable Full-Mesh Back', 'Active Airflow Ventilation', 'Ergonomic Spine Curve', 'BIFMA-Certified Base'],
  },
  {
    id: 'task-chairs',
    label: 'Task Chairs',
    blurb: 'Agile medium-back task seating designed for open workspaces, hot-desking and dynamic team mobility.',
    features: ['Waterfall Seat Pan', 'Height-Adjustable Armrests', 'Smooth 360° Swivel', 'Heavy-Duty Nylon Casters'],
  },
  {
    id: 'staff-chairs',
    label: 'Staff Chairs',
    blurb: 'Durable, high-traffic workstation and cantilever visitor seating engineered for team rows and client cabins.',
    features: ['Reinforced Steel Frame', 'High-Density Foam Cushion', 'Fixed / Swivel Options', 'Built for High Traffic'],
  },
]

/** Source: brothersfurniture.co.in/ergonomic-chair-manufacturers-in-chennai.php */
export const ergonomicChairs: ErgonomicChair[] = [
  // 1. Ergonomic Chairs
  { id: 'optimus-elite', name: 'Optimus Elite Ergonomic Chair', type: 'ergonomic-chairs', image: 'optimus-elite.webp' },
  { id: 'axis-ergo-chair', name: 'Axis Ergonomic Chair', type: 'ergonomic-chairs', image: 'optimus-elite.webp' },
  { id: 'twister-hb', name: 'Twister Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'twister-hb.webp' },
  { id: 'bonai-hb', name: 'Bonai Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'bonai-hb.webp' },
  { id: 'breeze-hb', name: 'Breeze Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'breeze-hb.webp' },
  { id: 'butterfly-hb', name: 'Butterfly Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'butterfly-hb.webp' },
  { id: 'comfy-hb', name: 'Comfy Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'comfy-hb.webp' },
  { id: 'dynamic-hb', name: 'Dynamic Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'dynamic-hb.webp' },
  { id: 'matrix-hb', name: 'Matrix Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'matrix-hb.webp' },
  { id: 'mystic-hb', name: 'Mystic Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'mystic-hb.webp' },
  { id: 'optimus-eco-hb', name: 'Optimus Eco Ergonomic Chair', type: 'ergonomic-chairs', image: 'optimus-eco-hb.webp' },
  { id: 'optimus-premium', name: 'Optimus Premium Ergonomic Chair', type: 'ergonomic-chairs', image: 'optimus-premium.webp' },
  { id: 'yaris-hb', name: 'Yaris Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'yaris-hb.webp' },
  { id: 'rio-hb', name: 'Rio Ergonomic HB Chair', type: 'ergonomic-chairs', image: 'rio-hb.webp' },

  // 2. Executive Chairs
  { id: 'godrez-hb', name: 'Godrez Executive HB Chair', type: 'executive-chairs', image: 'godrez-hb-chair.webp' },
  { id: 'grandeur-hb-brown', name: 'Grandeur Executive HB Brown Chair', type: 'executive-chairs', image: 'grandeur-hb-brown-chair.webp' },
  { id: 'grandeur-hb-white', name: 'Grandeur Executive HB White Chair', type: 'executive-chairs', image: 'grandeur-hb-white-chair.webp' },
  { id: 'haux-hb-grey', name: 'Haux Executive HB Grey Chair', type: 'executive-chairs', image: 'haux-hb-grey.webp' },
  { id: 'majesty-hb', name: 'Majesty Executive HB Chair', type: 'executive-chairs', image: 'majesty-hb.webp' },
  { id: 'marvel-1-hb', name: 'Marvel 1 Executive HB Chair', type: 'executive-chairs', image: 'marvel-1-hb.webp' },
  { id: 'marvel-2-hb', name: 'Marvel 2 Executive HB Chair', type: 'executive-chairs', image: 'marvel-2-hb.webp' },
  { id: 'gilma-hb', name: 'Gilma Executive HB Chair', type: 'executive-chairs', image: 'gilma-hb.webp' },
  { id: 'hi-lite-hb', name: 'Hi Lite Executive HB Chair', type: 'executive-chairs', image: 'hi-lite-hb.webp' },
  { id: 'jazz-hb', name: 'Jazz Executive HB Chair', type: 'executive-chairs', image: 'jazz-hb.webp' },

  // 3. Mesh Office Chairs
  { id: 'optimus-elite-mesh', name: 'Optimus Elite Full Mesh Office Chair', type: 'mesh-office-chairs', image: 'optimus-elite-mesh.webp' },
  { id: 'twister-mesh', name: 'Twister Full Mesh Office Chair', type: 'mesh-office-chairs', image: 'twister-mesh.webp' },
  { id: 'comfy-mesh', name: 'Comfy Mesh Office Chair', type: 'mesh-office-chairs', image: 'comfy-mesh.webp' },
  { id: 'mystic-mesh', name: 'Mystic Mesh Office Chair', type: 'mesh-office-chairs', image: 'mystic-mesh.webp' },
  { id: '803-mesh-mb', name: '803 Mesh Office Chair', type: 'mesh-office-chairs', image: '803-mesh-mb.webp' },
  { id: '804-mesh-mb', name: '804 Mesh Office Chair', type: 'mesh-office-chairs', image: '804-mesh-mb.webp' },
  { id: '805-mesh-mb', name: '805 Mesh Office Chair', type: 'mesh-office-chairs', image: '805-mesh-mb.webp' },
  { id: 'accord-mesh-mb', name: 'Accord Mesh Office Chair', type: 'mesh-office-chairs', image: 'accord-mesh-mb.webp' },
  { id: '805-mesh-visitor', name: '805 Mesh Visitor Chair', type: 'mesh-office-chairs', image: '805-mesh-visitor.webp' },
  { id: '804-mesh-visitor', name: '804 Mesh Visitor Chair', type: 'mesh-office-chairs', image: '804-mesh-visitor.webp' },
  { id: 'kaabel-mesh-visitor', name: 'Kaabel Mesh Visitor Chair', type: 'mesh-office-chairs', image: 'kaabel-mesh-visitor.webp' },
  { id: 'visitor-mesh-visitor', name: 'Visitor Mesh Office Chair', type: 'mesh-office-chairs', image: 'visitor-mesh-visitor.webp' },

  // 4. Task Chairs
  { id: 'array-mb', name: 'Array Task Chair', type: 'task-chairs', image: 'array-mb.webp' },
  { id: 'bonai-mb', name: 'Bonai Task MB Chair', type: 'task-chairs', image: 'bonai-mb.webp' },
  { id: 'breeze-mb', name: 'Breeze Task MB Chair', type: 'task-chairs', image: 'breeze-mb.webp' },
  { id: 'butterfly-mb', name: 'Butterfly Task MB Chair', type: 'task-chairs', image: 'butterfly-mb.webp' },
  { id: 'cherry-mb', name: 'Cherry Task MB Chair', type: 'task-chairs', image: 'cherry-mb.webp' },
  { id: 'comfy-mb', name: 'Comfy Task MB Chair', type: 'task-chairs', image: 'comfy-mb.webp' },
  { id: 'dynamic-mb', name: 'Dynamic Task MB Chair', type: 'task-chairs', image: 'dynamic-mb.webp' },
  { id: 'edge-mb', name: 'Edge Task MB Chair', type: 'task-chairs', image: 'edge-mb.webp' },
  { id: 'flash-mb', name: 'Flash Task MB Chair', type: 'task-chairs', image: 'flash-mb.webp' },
  { id: 'flexi-mb', name: 'Flexi Task MB Chair', type: 'task-chairs', image: 'flexi-mb.webp' },
  { id: 'gilma-mb', name: 'Gilma Task MB Chair', type: 'task-chairs', image: 'gilma-mb.webp' },
  { id: 'hi-lite-mb', name: 'Hi Lite Task MB Chair', type: 'task-chairs', image: 'hi-lite-mb.webp' },
  { id: 'godrez-mb', name: 'Godrez Task MB Chair', type: 'task-chairs', image: 'godrez-mb-chair.webp' },

  // 5. Staff Chairs
  { id: 'jazz-mb', name: 'Jazz Staff MB Chair', type: 'staff-chairs', image: 'jazz-mb.webp' },
  { id: 'kaabel-mb', name: 'Kaabel Staff MB Chair', type: 'staff-chairs', image: 'kaabel-mb.webp' },
  { id: 'majesty-mb', name: 'Majesty Staff MB Chair', type: 'staff-chairs', image: 'majesty-mb.webp' },
  { id: 'marvel1-mb', name: 'Marvel 1 Staff MB Chair', type: 'staff-chairs', image: 'marvel1-mb.webp' },
  { id: 'marvel2-mb', name: 'Marvel 2 Staff MB Chair', type: 'staff-chairs', image: 'marvel2-mb.webp' },
  { id: 'yaris-mb', name: 'Yaris Staff MB Chair', type: 'staff-chairs', image: 'yaris-mb.webp' },
  { id: 'ecco-mb', name: 'Ecco Staff MB Chair', type: 'staff-chairs', image: 'ecco-mb.webp' },
  { id: 'rio-mb', name: 'Rio Staff MB Chair', type: 'staff-chairs', image: 'rio-mb.webp' },
  { id: 'vento-mb', name: 'Vento Staff MB Chair', type: 'staff-chairs', image: 'vento-mb.webp' },
  { id: 'godrez-visitor', name: 'Godrez Staff Visitor Chair', type: 'staff-chairs', image: 'godrez-visitor-chair.webp' },
  { id: 'flexi-visitor', name: 'Flexi Staff Visitor Chair', type: 'staff-chairs', image: 'flexi-visitor.webp' },
  { id: 'gama-visitor', name: 'Gama Staff Visitor Chair', type: 'staff-chairs', image: 'gama-visitor.webp' },
  { id: 'gilma-visitor', name: 'Gilma Staff Visitor Chair', type: 'staff-chairs', image: 'gilma-visitor.webp' },
  { id: 'jazz-visitor', name: 'Jazz Staff Visitor Chair', type: 'staff-chairs', image: 'jazz-visitor.webp' },
  { id: 'marvel-2-visitor', name: 'Marvel 2 Staff Visitor Chair', type: 'staff-chairs', image: 'marvel-2-visitor.webp' },
  { id: '803-cushion-visitor', name: '803 Cushion Staff Visitor Chair', type: 'staff-chairs', image: '803-cushion-visitor.webp' },
]

export const chairImage = (c: ErgonomicChair) => `/products/ergonomic/${c.image}`

export const countOfType = (type: ChairType) => ergonomicChairs.filter((c) => c.type === type).length

/** Chairs in the shared catalogue shape used by the grid and lightbox. */
export const chairCatalogue: CatalogueItem[] = ergonomicChairs.map((c) => {
  const t = chairTypes.find((x) => x.id === c.type) || chairTypes[0]
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    src: chairImage(c),
    fit: 'contain',
    typeLabel: t.label,
    blurb: t.blurb,
    features: t.features,
  }
})
