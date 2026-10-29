import type { CatalogueItem, Product } from '../types'
import { inferTypeFromCategory } from '../types'

export interface CatalogueTypeDef {
  id: string
  label: string
  blurb: string
  features: string[]
}

export interface RawItem {
  id: string
  name: string
  type: string
  /** File name inside /public/products/<folder> or full url */
  image: string
  fit?: 'contain' | 'cover'
}

/** Expand raw rows into catalogue items, attaching each type's label, blurb and features. */
export const buildCatalogue = (folder: string, types: CatalogueTypeDef[], rows: RawItem[]): CatalogueItem[] =>
  rows.map((r) => {
    const t = types.find((x) => x.id === r.type) || {
      id: r.type,
      label: r.type,
      blurb: '',
      features: [],
    }
    const src = r.image.startsWith('http') || r.image.startsWith('/')
      ? r.image
      : `/products/${folder}/${r.image}`
    return {
      id: r.id,
      name: r.name,
      type: r.type,
      src,
      fit: r.fit ?? 'contain',
      typeLabel: t.label,
      blurb: t.blurb,
      features: t.features,
    }
  })

/** Convert a dynamic Product from PostgreSQL into a rich CatalogueItem for Shop */
export const productToCatalogueItem = (p: Product): CatalogueItem => {
  let features: string[] = []
  let blurb = p.description || ''

  if (blurb.includes('Highlights:')) {
    const parts = blurb.split('Highlights:')
    blurb = parts[0].trim()
    features = parts[1]
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean)
  } else if (p.material || p.dimensions) {
    if (p.material) features.push(`Material: ${p.material}`)
    if (p.dimensions) features.push(`Dimensions: ${p.dimensions}`)
  }

  const subType = p.subCategory || 'Standard'
  const productType = p.type || inferTypeFromCategory(p.category)

  return {
    productType,
    subCategory: p.subCategory,
    id: p.id,
    name: p.name,
    type: subType,
    src: p.image,
    fit: p.cutout ? 'contain' : 'cover',
    typeLabel: subType,
    blurb: blurb || `${p.name} - commercial-grade office furniture with 5-year structural warranty.`,
    features: features.length > 0 ? features : ['Commercial grade durability', '5-year structural warranty'],
    price: p.price,
    oldPrice: p.oldPrice,
    rating: p.rating,
    sku: p.sku,
    category: p.category,
    inStock: p.inStock,
    stockCount: p.stockCount,
    material: p.material,
    dimensions: p.dimensions,
    featured: p.featured,
  }
}
