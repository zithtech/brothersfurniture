import { createContext, useContext } from 'react'
import type { CartItem, Product } from '../types'

export interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
