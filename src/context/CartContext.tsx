import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, Product } from '../types'
import { CartContext, type CartContextValue } from './cart'

const STORAGE_KEY = 'bf-cart'

const loadCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable — cart stays in memory
    }
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, quantity = 1) =>
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id)
        if (existing) {
          return prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
        }
        return [...prev, { product, quantity }]
      })

    const updateQuantity = (id: string, quantity: number) =>
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((i) => i.product.id !== id)
          : prev.map((i) => (i.product.id === id ? { ...i, quantity } : i)),
      )

    const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id))

    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
      clear: () => setItems([]),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

