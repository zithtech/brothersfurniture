import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api } from '../services/api'
import { countIn as fallbackCountIn, products as fallbackProducts } from '../data/products'
import type { Category, ClientPartner, ErgonomicChairModel, Product, TestimonialReview } from '../types'
import { ProductContext, type ProductContextValue } from './products'

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [chairs, setChairs] = useState<ErgonomicChairModel[]>([])
  const [clients, setClients] = useState<ClientPartner[]>([])
  const [testimonials, setTestimonials] = useState<TestimonialReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [backendOnline, setBackendOnline] = useState(false)

  const loadData = useCallback(async () => {
    try {
      // Check health
      const health = await api.checkHealth()
      const isOnline = health.status === 'ok'
      setBackendOnline(isOnline)

      // Fetch products
      const p = await api.getProducts()
      if (p && p.length > 0) {
        setProducts(p)
      }

      // Fetch chairs, clients, testimonials concurrently
      const [chairsRes, clientsRes, testRes] = await Promise.allSettled([
        api.getChairs(),
        api.getClients(),
        api.getTestimonials(),
      ])

      if (chairsRes.status === 'fulfilled' && chairsRes.value.length > 0) {
        setChairs(chairsRes.value)
      }
      if (clientsRes.status === 'fulfilled' && clientsRes.value.length > 0) {
        setClients(clientsRes.value)
      }
      if (testRes.status === 'fulfilled' && testRes.value.length > 0) {
        setTestimonials(testRes.value)
      }
      setError(null)
    } catch (err: any) {
      console.warn('Could not load dynamic products from backend:', err)
      setError(err?.message || 'Error connecting to database')
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    loadData()
  }, [loadData])

  // Real-time synchronization with Admin via Server-Sent Events (SSE)
  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    let eventSource: EventSource | null = null

    try {
      eventSource = new EventSource(`${apiBase}/sync/events`)

      eventSource.onopen = () => {
        setBackendOnline(true)
      }

      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data)
          if (payload.type === 'connected') return

          // Live notification from admin edits
          if (!payload.entity || payload.entity === 'products' || payload.entity === 'chairs' || payload.entity === 'all') {
            loadData()
          }
        } catch {
          // ignore non-json heartbeats
        }
      }

      eventSource.onerror = () => {
        // EventSource will automatically retry in background
      }
    } catch (err) {
      console.warn('Could not initialize sync event stream:', err)
    }

    // Refetch immediately when tab gains focus or becomes visible
    const handleFocus = () => loadData()
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') loadData()
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibility)

    // Fallback polling interval every 20 seconds
    const interval = setInterval(loadData, 20000)

    return () => {
      if (eventSource) eventSource.close()
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibility)
      clearInterval(interval)
    }
  }, [loadData])

  const getProduct = useCallback(
    (id: string): Product | undefined => {
      return products.find((p) => p.id === id)
    },
    [products]
  )

  const fetchProduct = useCallback(
    async (id: string): Promise<Product | null> => {
      const existing = products.find((p) => p.id === id)
      if (existing) return existing
      return await api.getProduct(id)
    },
    [products]
  )

  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.featured)
  }, [products])

  const countIn = useCallback(
    (category: Category): string => {
      const matching = products.filter((p) => p.category === category)
      if (matching.length > 0) {
        return `${matching.length} ${matching.length === 1 ? 'item' : 'items'}`
      }
      return fallbackCountIn(category)
    },
    [products]
  )

  const value: ProductContextValue = useMemo(
    () => ({
      products,
      chairs,
      clients,
      testimonials,
      loading,
      error,
      backendOnline,
      featuredProducts,
      getProduct,
      fetchProduct,
      countIn,
      refresh: loadData,
    }),
    [
      products,
      chairs,
      clients,
      testimonials,
      loading,
      error,
      backendOnline,
      featuredProducts,
      getProduct,
      fetchProduct,
      countIn,
      loadData,
    ]
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
