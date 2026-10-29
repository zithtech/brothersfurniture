import { createContext, useContext } from 'react'
import type { Category, ClientPartner, ErgonomicChairModel, Product, TestimonialReview } from '../types'

export interface ProductContextValue {
  products: Product[]
  chairs: ErgonomicChairModel[]
  clients: ClientPartner[]
  testimonials: TestimonialReview[]
  loading: boolean
  error: string | null
  backendOnline: boolean
  featuredProducts: Product[]
  getProduct: (id: string) => Product | undefined
  fetchProduct: (id: string) => Promise<Product | null>
  countIn: (category: Category) => string
  refresh: () => Promise<void>
}

export const ProductContext = createContext<ProductContextValue | null>(null)

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}
