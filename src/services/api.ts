import type { ClientPartner, ErgonomicChairModel, Product, TestimonialReview } from '../types'
import { products as fallbackProducts } from '../data/products'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface FetchProductParams {
  category?: string
  inStock?: boolean
  featured?: boolean
  search?: string
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      signal: controller.signal,
      ...options,
    })

    clearTimeout(timeoutId)

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}))
      throw new Error(errorBody.error || `HTTP error ${res.status}: ${res.statusText}`)
    }

    return res.json()
  } catch (err) {
    clearTimeout(timeoutId)
    throw err
  }
}

export const api = {
  // Health & DB status
  checkHealth: async () => {
    try {
      return await request<{ status: string; database: { status: string; records: Record<string, number> } }>('/health')
    } catch {
      return { status: 'offline', database: { status: 'disconnected', records: {} } }
    }
  },

  // Products
  getProducts: async (params?: FetchProductParams): Promise<Product[]> => {
    try {
      const searchParams = new URLSearchParams()
      if (params?.category && params.category !== 'All') searchParams.set('category', params.category)
      if (params?.inStock !== undefined) searchParams.set('inStock', String(params.inStock))
      if (params?.featured !== undefined) searchParams.set('featured', String(params.featured))
      if (params?.search) searchParams.set('search', params.search)

      const qs = searchParams.toString()
      return await request<Product[]>(`/products${qs ? `?${qs}` : ''}`)
    } catch (err) {
      console.warn('API getProducts failed, falling back to local static catalog:', err)
      let list = [...fallbackProducts]
      if (params?.category && params.category !== 'All') {
        list = list.filter((p) => p.category === params.category)
      }
      if (params?.inStock !== undefined) {
        list = list.filter((p) => p.inStock === params.inStock)
      }
      if (params?.featured !== undefined) {
        list = list.filter((p) => p.featured === params.featured)
      }
      if (params?.search) {
        const q = params.search.toLowerCase()
        list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      }
      return list
    }
  },

  getProduct: async (id: string): Promise<Product | null> => {
    try {
      return await request<Product>(`/products/${id}`)
    } catch (err) {
      console.warn(`API getProduct(${id}) failed, falling back to local dataset:`, err)
      const found = fallbackProducts.find((p) => p.id === id)
      return found || null
    }
  },

  // Ergonomic Chairs
  getChairs: async (): Promise<ErgonomicChairModel[]> => {
    try {
      return await request<ErgonomicChairModel[]>('/chairs')
    } catch (err) {
      console.warn('API getChairs failed:', err)
      return []
    }
  },

  // Clients
  getClients: async (): Promise<ClientPartner[]> => {
    try {
      return await request<ClientPartner[]>('/clients')
    } catch (err) {
      console.warn('API getClients failed:', err)
      return []
    }
  },

  // Testimonials
  getTestimonials: async (): Promise<TestimonialReview[]> => {
    try {
      return await request<TestimonialReview[]>('/testimonials')
    } catch (err) {
      console.warn('API getTestimonials failed:', err)
      return []
    }
  },

  // Leads
  createLead: (lead: any) => request('/leads', { method: 'POST', body: JSON.stringify(lead) }),

  // Orders
  createOrder: (order: any) => request<any>('/orders', { method: 'POST', body: JSON.stringify(order) }),
  trackOrder: (query: string) => request<any[]>(`/orders/track/${encodeURIComponent(query)}`),
}
