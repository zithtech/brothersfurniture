import type { CatalogueItem } from '../types'

export type WorkstationType = 'linear' | 'cluster' | 'l-shape' | 'bench' | 'training'

export const workstationTypes: { id: WorkstationType; label: string; blurb: string; features: string[] }[] = [
  {
    id: 'linear',
    label: 'Linear Desking',
    blurb: 'Straight-run and back-to-back desks with partition screens — the most efficient use of open floor space.',
    features: ['Back-to-back or in-line layouts', 'Fabric, laminate or glass screens', 'Under-desk cable management'],
  },
  {
    id: 'cluster',
    label: 'Cluster Workstations',
    blurb: 'Four- and six-seater pods that group teams together while keeping each seat defined.',
    features: ['4 and 6-seater configurations', 'Acoustic fabric dividers', 'Mobile pedestals for every seat'],
  },
  {
    id: 'l-shape',
    label: 'L-Shape Cubicles',
    blurb: 'Generous corner worksurfaces with high partitions for focus and privacy.',
    features: ['Wraparound L-shaped worksurface', 'High privacy partitions', 'Single or multi-seat runs'],
  },
  {
    id: 'bench',
    label: 'Bench Desking',
    blurb: 'Open, shared benches with low dividers for collaborative and flexible teams.',
    features: ['Shared frame, open layout', 'Low or panel-leg dividers', 'Easy to reconfigure and extend'],
  },
  {
    id: 'training',
    label: 'Training & Study',
    blurb: 'Carrels and training desks for classrooms, libraries and BPO training floors.',
    features: ['Enclosed study carrels', 'Durable laminate finish', 'Built for institutions'],
  },
]

interface Workstation {
  id: string
  name: string
  type: WorkstationType
  /** File in /public/products/workstations */
  image: string
  fit: 'contain' | 'cover'
}

/** Images: brothersfurniture.co.in/modular-workstation-desk-manufacturers-in-chennai.php. Add new layouts here. */
export const workstations: Workstation[] = [
  { id: 'linear-back-to-back', name: 'Linear Back-to-Back Desking', type: 'linear', image: 'linear-back-to-back.webp', fit: 'cover' },
  { id: 'inline-partition-run', name: 'In-Line Partition Workstation', type: 'linear', image: 'inline-partition-run.webp', fit: 'cover' },
  { id: 'back-to-back-partition', name: 'Back-to-Back Partition Workstation', type: 'linear', image: 'back-to-back-partition.webp', fit: 'cover' },
  { id: 'open-plan-linear', name: 'Open-Plan Linear Desking', type: 'linear', image: 'open-plan-linear.webp', fit: 'cover' },
  { id: 'orbit-cluster', name: 'Orbit 6-Seater Cluster', type: 'cluster', image: 'orbit-cluster.jpg', fit: 'contain' },
  { id: 'four-seater-l-cluster', name: '4-Seater L-Cluster Workstation', type: 'cluster', image: 'four-seater-l-cluster.webp', fit: 'contain' },
  { id: 'single-l-cubicle', name: 'Single L-Shape Cubicle', type: 'l-shape', image: 'single-l-cubicle.webp', fit: 'contain' },
  { id: 'l-cubicle-row', name: 'L-Shape Cubicle Row, 3-Seater', type: 'l-shape', image: 'l-cubicle-row.webp', fit: 'contain' },
  { id: 'open-bench-desking', name: 'Open Bench Desking', type: 'bench', image: 'open-bench-desking.webp', fit: 'cover' },
  { id: 'panel-leg-desk', name: 'Panel-Leg Sharing Desk', type: 'bench', image: 'panel-leg-desk.webp', fit: 'cover' },
  { id: 'study-carrels', name: 'Study Carrel Workstations', type: 'training', image: 'study-carrels.webp', fit: 'cover' },
]

export const workstationCatalogue: CatalogueItem[] = workstations.map((w) => {
  const t = workstationTypes.find((x) => x.id === w.type)!
  return {
    id: w.id,
    name: w.name,
    type: w.type,
    src: `/products/workstations/${w.image}`,
    fit: w.fit,
    typeLabel: t.label,
    blurb: t.blurb,
    features: t.features,
  }
})
