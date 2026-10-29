export type DefaultCategory =
  | 'Workstations'
  | 'Office Chairs'
  | 'Desks'
  | 'Meeting Tables'
  | 'Storage'
  | 'Lounge'

export type Category = DefaultCategory | (string & {})

export const PRODUCT_TYPES = [
  'Chairs',
  'Tables',
  'Workstations',
  'Storage',
  'Others',
] as const

export type ProductType = (typeof PRODUCT_TYPES)[number] | (string & {})

export const TYPE_CATEGORIES_MAP: Record<string, string[]> = {
  Chairs: ['Office Chairs', 'Lounge'],
  Tables: ['Meeting Tables', 'Desks'],
  Workstations: ['Workstations'],
  Storage: ['Storage'],
  Others: ['Others'],
}

export const CATEGORY_SUBCATEGORIES: Record<string, string[]> = {
  'Office Chairs': [
    'Ergonomic Chairs',
    'Executive Chairs',
    'Mesh Office Chairs',
    'Task Chairs',
    'Staff Chairs',
  ],
  'Workstations': [
    'Linear Desking',
    'Cluster Workstations',
    'L-Shape Cubicles',
    'Bench Desking',
    'Training & Study',
  ],
  'Desks': [
    'Office Desks',
    'Executive Desks',
    'Compact & Study',
    'Standing Desks',
  ],
  'Meeting Tables': [
    'Conference Tables',
    'Café Tables',
    'Cafeteria & Dining',
    'Boardroom Tables',
  ],
  'Storage': [
    'Cabinets & Cupboards',
    'Mobile Pedestals',
  ],
  'Lounge': [
    'Metro Public Seating',
    'Viva Public Seating',
    'Café Chairs',
    'Study Chairs',
  ],
}

export function inferTypeFromCategory(category?: string): string {
  if (!category) return 'Others'
  const catLower = category.toLowerCase().trim()
  if (catLower.includes('chair') || catLower === 'lounge' || catLower.includes('seating')) return 'Chairs'
  if (catLower.includes('table') || catLower.includes('desk')) return 'Tables'
  if (catLower.includes('workstation') || catLower.includes('cubicle')) return 'Workstations'
  if (catLower.includes('storage') || catLower.includes('cabinet') || catLower.includes('pedestal') || catLower.includes('locker')) return 'Storage'

  for (const [type, cats] of Object.entries(TYPE_CATEGORIES_MAP)) {
    if (cats.some((c) => c.toLowerCase() === catLower)) return type
  }
  return 'Others'
}

export interface ProductImage {
  id: string
  productId?: string
  url: string
  r2Key?: string
  sortOrder: number
  isPrimary: boolean
  createdAt?: string
}

export interface Product {
  id: string
  name: string
  sku?: string
  type?: string
  category: Category
  subCategory?: string
  price: number
  oldPrice?: number
  rating: number
  image: string
  r2Key?: string
  images?: ProductImage[]
  /** Image has a plain white background and can be blended onto tinted panels. */
  cutout?: boolean
  description: string
  material: string
  dimensions: string
  inStock: boolean
  featured?: boolean
  stockCount?: number
  minOrderQuantity?: number
  updatedAt?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

/** A listing in a type-filtered catalogue (ergonomic chairs, workstations, …). */
export interface CatalogueItem {
  id: string
  name: string
  type: string
  productType?: string
  src: string
  /** \`contain\` for cut-out shots on white, \`cover\` for room photos. */
  fit: 'contain' | 'cover'
  typeLabel: string
  blurb: string
  features: string[]
  price?: number
  oldPrice?: number
  rating?: number
  sku?: string
  category?: Category
  subCategory?: string
  inStock?: boolean
  stockCount?: number
  material?: string
  dimensions?: string
  featured?: boolean
}

export interface CatalogueType {
  id: string
  label: string
}

export interface ErgonomicChairModel {
  id: string
  name: string
  type: string
  image: string
  features: string[]
  inProduction: boolean
  basePrice?: number
}

export interface ClientPartner {
  id: string
  name: string
  logo: string
  sector: string
  featured?: boolean
}

export interface TestimonialReview {
  id: string
  name: string
  role: string
  company: string
  quote: string
  rating: number
  approved?: boolean
  featured?: boolean
}
