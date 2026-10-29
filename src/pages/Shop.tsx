import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Catalogue from '../components/Catalogue'
import CatalogueOverview from '../components/CatalogueOverview'
import PageHeader from '../components/PageHeader'
import { SearchIcon } from '../components/Icons'
import { useProducts } from '../context/products'
import { productToCatalogueItem } from '../data/catalogueUtils'
import { allCatalogueItems, catalogues } from '../data/catalogues'
import { categories } from '../data/products'
import {
  PRODUCT_TYPES,
  TYPE_CATEGORIES_MAP,
  CATEGORY_SUBCATEGORIES,
  inferTypeFromCategory,
  type CatalogueItem,
  type Category,
} from '../types'

/* Type icons */
const typeIcons: Record<string, React.JSX.Element> = {
  All: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Chairs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <rect x="5" y="11" width="14" height="5" rx="1" />
      <path d="M12 16v3M8 22h8M12 19l-4 3M12 19l4 3" />
    </svg>
  ),
  Tables: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <ellipse cx="12" cy="9" rx="9" ry="3.5" />
      <path d="M5 12.5v7M19 12.5v7M12 12.5v7" />
    </svg>
  ),
  Workstations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="2" y="4" width="20" height="12" rx="1.5" />
      <path d="M7 20h10M12 16v4" />
    </svg>
  ),
  Storage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="4" y="3" width="16" height="6" rx="1" />
      <rect x="4" y="12" width="16" height="9" rx="1" />
      <line x1="10" y1="6" x2="14" y2="6" />
      <line x1="10" y1="16.5" x2="14" y2="16.5" />
    </svg>
  ),
  Others: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const { products, loading, backendOnline } = useProducts()

  const typeParam = params.get('type') || 'All'
  const categoryParam = params.get('category') || 'All'
  const subCategoryParam = params.get('subCategory') || params.get('sub') || 'All'
  const query = params.get('q') ?? ''
  const stockParam = (params.get('stock') as 'all' | 'in_stock') || 'all'
  const sortParam = params.get('sort') || 'featured'

  // Map dynamic PostgreSQL products to rich CatalogueItem[]
  const dynamicItems: CatalogueItem[] = useMemo(() => {
    if (products && products.length > 0) {
      return products.map(productToCatalogueItem)
    }
    return allCatalogueItems
  }, [products])

  // All distinct Types available in inventory
  const availableTypes = useMemo(() => {
    const fromProds = dynamicItems.map((i) => i.productType || inferTypeFromCategory(i.category))
    const list = Array.from(new Set([...PRODUCT_TYPES, ...fromProds])).filter(Boolean)
    return list
  }, [dynamicItems])

  // Live item counts by Type
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: dynamicItems.length }
    for (const t of availableTypes) {
      counts[t] = dynamicItems.filter(
        (i) => (i.productType || inferTypeFromCategory(i.category)) === t
      ).length
    }
    return counts
  }, [dynamicItems, availableTypes])

  // Categories available for the currently selected Type
  const availableCategoriesForType = useMemo(() => {
    if (typeParam === 'All') {
      const fromProds = dynamicItems.map((i) => i.category).filter(Boolean) as string[]
      return Array.from(new Set([...categories, ...fromProds]))
    }
    const presets = TYPE_CATEGORIES_MAP[typeParam] || []
    const fromProds = dynamicItems
      .filter((i) => (i.productType || inferTypeFromCategory(i.category)) === typeParam && i.category)
      .map((i) => i.category as string)
    const combined = Array.from(new Set([...presets, ...fromProds])).filter(Boolean)
    return combined.length > 0 ? combined : ['Others']
  }, [typeParam, dynamicItems])

  // Live item counts by Category (scoped to selected Type)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const c of availableCategoriesForType) {
      counts[c] = dynamicItems.filter((i) => {
        const matchesType =
          typeParam === 'All' || (i.productType || inferTypeFromCategory(i.category)) === typeParam
        return matchesType && i.category === c
      }).length
    }
    return counts
  }, [availableCategoriesForType, dynamicItems, typeParam])

  // Sub-categories available for the currently selected Category
  const availableSubCategories = useMemo(() => {
    if (categoryParam === 'All') return []
    const presets = CATEGORY_SUBCATEGORIES[categoryParam] || []
    const fromProds = dynamicItems
      .filter((i) => i.category === categoryParam && (i.subCategory || i.type))
      .map((i) => (i.subCategory || i.type) as string)
    return Array.from(new Set([...presets, ...fromProds])).filter(Boolean)
  }, [categoryParam, dynamicItems])

  // Live item counts by SubCategory
  const subCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const sub of availableSubCategories) {
      counts[sub] = dynamicItems.filter(
        (i) =>
          i.category === categoryParam &&
          (i.subCategory === sub || i.type === sub || i.typeLabel === sub)
      ).length
    }
    return counts
  }, [availableSubCategories, dynamicItems, categoryParam])

  // Filter items matching all active hierarchical criteria
  const filteredItems = useMemo(() => {
    return dynamicItems.filter((item) => {
      const resolvedType = item.productType || inferTypeFromCategory(item.category)
      const matchesType = typeParam === 'All' || resolvedType === typeParam
      const matchesCategory = categoryParam === 'All' || item.category === categoryParam
      const matchesSubCategory =
        subCategoryParam === 'All' ||
        item.subCategory === subCategoryParam ||
        item.type === subCategoryParam ||
        item.typeLabel === subCategoryParam

      return matchesType && matchesCategory && matchesSubCategory
    })
  }, [dynamicItems, typeParam, categoryParam, subCategoryParam])

  // URL state updater
  const updateHierarchy = ({
    newType,
    newCategory,
    newSubCategory,
    newQuery,
    newStock,
    newSort,
  }: {
    newType?: string
    newCategory?: string
    newSubCategory?: string
    newQuery?: string
    newStock?: string
    newSort?: string
  }) => {
    const next = new URLSearchParams(params)

    if (newType !== undefined) {
      if (!newType || newType === 'All') next.delete('type')
      else next.set('type', newType)
      // When changing type, reset category and subcategory if no longer valid
      if (newCategory === undefined) next.delete('category')
      if (newSubCategory === undefined) next.delete('subCategory')
    }

    if (newCategory !== undefined) {
      if (!newCategory || newCategory === 'All') next.delete('category')
      else next.set('category', newCategory)
      // When changing category, reset subcategory
      if (newSubCategory === undefined) next.delete('subCategory')
    }

    if (newSubCategory !== undefined) {
      if (!newSubCategory || newSubCategory === 'All') {
        next.delete('subCategory')
        next.delete('sub')
      } else {
        next.set('subCategory', newSubCategory)
      }
    }

    if (newQuery !== undefined) {
      if (!newQuery) next.delete('q')
      else next.set('q', newQuery)
    }

    if (newStock !== undefined) {
      if (!newStock || newStock === 'all') next.delete('stock')
      else next.set('stock', newStock)
    }

    if (newSort !== undefined) {
      if (!newSort || newSort === 'featured') next.delete('sort')
      else next.set('sort', newSort)
    }

    setParams(next, { replace: true })
    if (newType !== undefined || newCategory !== undefined) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Clear all filters helper
  const handleClearAll = () => {
    const next = new URLSearchParams()
    setParams(next, { replace: true })
  }

  const isDeepFiltered =
    typeParam !== 'All' ||
    categoryParam !== 'All' ||
    subCategoryParam !== 'All' ||
    Boolean(query)

  const activeCategoryDef = categoryParam === 'All' ? null : catalogues[categoryParam as Category]
  const noun: [string, string] = activeCategoryDef?.noun || ['product', 'products']

  const totalInStock = dynamicItems.filter(
    (i) => i.inStock !== false && (i.stockCount === undefined || i.stockCount > 0)
  ).length

  // Build catalogue subtabs for Catalogue component
  const catalogueSubTabs = useMemo(() => {
    return availableSubCategories.map((label) => ({
      id: label,
      label,
    }))
  }, [availableSubCategories])

  return (
    <>
      <PageHeader
        eyebrow="Commercial Manufacturing Unit · Chennai"
        title={
          subCategoryParam !== 'All'
            ? subCategoryParam
            : categoryParam !== 'All'
            ? categoryParam
            : typeParam !== 'All'
            ? `${typeParam} Collection`
            : 'Live Factory Shop'
        }
      >
        {activeCategoryDef?.intro ??
          'Commercial-grade modular office furniture direct from our Chennai manufacturing plant. Precision-engineered workstations, ergonomic executive seating, conference tables and storage solutions.'}
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ── Live Inventory Status Banner ── */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 px-4 sm:px-6 py-3.5 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white block">
                Live Factory Inventory
              </span>
              <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5">
                {dynamicItems.length} active models in catalog · {totalInStock} ready for dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Chennai Manufacturing Plant
            </span>
          </div>
        </div>

        {/* ── Level 1: TYPE Selector Bar ── */}
        <div className="mt-8 rounded-2xl border border-stone-200/80 bg-white p-3.5 sm:p-4 shadow-xs">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent">
                  Step 1 · Furniture Type
                </span>
                <span className="text-stone-300 text-xs">/</span>
                <span className="text-xs text-stone-500 font-medium">Browse by category type</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateHierarchy({ newType: 'All' })}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                    typeParam === 'All'
                      ? 'bg-ink text-white shadow-md shadow-ink/20 scale-[1.02]'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/70'
                  }`}
                >
                  <span>{typeIcons.All}</span>
                  <span>All Types</span>
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                      typeParam === 'All' ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-stone-600'
                    }`}
                  >
                    {dynamicItems.length}
                  </span>
                </button>

                {availableTypes.map((t) => {
                  const count = typeCounts[t] ?? 0
                  const isSelected = typeParam === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => updateHierarchy({ newType: t })}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-ink text-white shadow-md shadow-ink/20 scale-[1.02]'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/70'
                      }`}
                    >
                      <span className={isSelected ? 'text-white' : 'text-stone-500'}>
                        {typeIcons[t] || typeIcons.Others}
                      </span>
                      <span>{t}</span>
                      <span
                        className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-stone-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Global Search Input */}
            <div className="relative w-full lg:w-72 shrink-0">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <input
                type="search"
                placeholder={
                  categoryParam !== 'All'
                    ? `Search ${categoryParam}…`
                    : typeParam !== 'All'
                    ? `Search ${typeParam}…`
                    : `Search ${dynamicItems.length} factory models…`
                }
                value={query}
                onChange={(e) => updateHierarchy({ newQuery: e.target.value })}
                className="w-full rounded-xl border border-stone-200/90 bg-stone-50/60 py-2 pl-10 pr-4 text-xs sm:text-sm outline-none transition placeholder:text-stone-400 focus:bg-white focus:border-ink/40 focus:ring-1 focus:ring-ink/20 shadow-xs"
              />
            </div>
          </div>

          {/* ── Level 2: CATEGORY Filter Row ── */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1 shrink-0">
              {typeParam !== 'All' ? `${typeParam} Categories:` : 'Categories:'}
            </span>

            <button
              type="button"
              onClick={() => updateHierarchy({ newCategory: 'All' })}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                categoryParam === 'All'
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              All {typeParam !== 'All' ? typeParam : 'Categories'}
            </button>

            {availableCategoriesForType.map((cat) => {
              const count = categoryCounts[cat] ?? 0
              const isSelected = categoryParam === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => updateHierarchy({ newCategory: cat })}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium transition cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-white font-semibold shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/90 hover:text-stone-900'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-stone-200/80 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── Level 3: SUB-CATEGORY Filter Row ── */}
          {categoryParam !== 'All' && availableSubCategories.length > 0 && (
            <div className="mt-3 pt-3 border-t border-dashed border-stone-200 flex flex-wrap items-center gap-2 animate-fade-in">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600/90 mr-1 shrink-0 flex items-center gap-1">
                <span>Sub-Categories:</span>
              </span>

              <button
                type="button"
                onClick={() => updateHierarchy({ newSubCategory: 'All' })}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                  subCategoryParam === 'All'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 border border-amber-200/60 hover:bg-amber-100'
                }`}
              >
                All {categoryParam}
              </button>

              {availableSubCategories.map((sub) => {
                const count = subCategoryCounts[sub] ?? 0
                const isSelected = subCategoryParam === sub
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => updateHierarchy({ newSubCategory: sub })}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white font-semibold shadow-xs'
                        : 'bg-amber-50/70 text-amber-900 border border-amber-200/60 hover:bg-amber-100'
                    }`}
                  >
                    <span>{sub}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold tabular-nums ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-amber-200/60 text-amber-800'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Active Hierarchy Breadcrumb & Clear Filters ── */}
        {isDeepFiltered && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-stone-50 border border-stone-200/70 px-4 py-2.5 text-xs text-stone-600 animate-fade-in">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-stone-400 uppercase text-[10px] tracking-wider">
                Current Filter:
              </span>

              {typeParam !== 'All' && (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-800 shadow-2xs">
                  <span className="text-stone-400">Type:</span>
                  <span className="font-semibold text-ink">{typeParam}</span>
                  <button
                    type="button"
                    onClick={() => updateHierarchy({ newType: 'All' })}
                    className="ml-1 text-stone-400 hover:text-rose-600 font-bold"
                    title="Remove Type filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {categoryParam !== 'All' && (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-800 shadow-2xs">
                  <span className="text-stone-400">Category:</span>
                  <span className="font-semibold text-accent">{categoryParam}</span>
                  <button
                    type="button"
                    onClick={() => updateHierarchy({ newCategory: 'All' })}
                    className="ml-1 text-stone-400 hover:text-rose-600 font-bold"
                    title="Remove Category filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {subCategoryParam !== 'All' && (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-xs font-medium text-amber-900 shadow-2xs">
                  <span className="text-amber-600/70">Sub-Category:</span>
                  <span className="font-semibold text-amber-950">{subCategoryParam}</span>
                  <button
                    type="button"
                    onClick={() => updateHierarchy({ newSubCategory: 'All' })}
                    className="ml-1 text-amber-600 hover:text-rose-600 font-bold"
                    title="Remove Sub-category filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {query && (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-800 shadow-2xs">
                  <span className="text-stone-400">Search:</span>
                  <span className="font-semibold text-ink">"{query}"</span>
                  <button
                    type="button"
                    onClick={() => updateHierarchy({ newQuery: '' })}
                    className="ml-1 text-stone-400 hover:text-rose-600 font-bold"
                    title="Clear search"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline underline-offset-2 transition cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* ── Content View ── */}
        {loading && dynamicItems.length === 0 ? (
          <div className="py-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-xl bg-stone-100 p-4 space-y-3">
                <div className="aspect-square w-full rounded-lg bg-stone-200" />
                <div className="h-4 w-3/4 rounded bg-stone-200" />
                <div className="h-3 w-1/2 rounded bg-stone-200" />
              </div>
            ))}
          </div>
        ) : isDeepFiltered ? (
          /* Active Filtered Catalogue View */
          <div className="mt-6">
            <Catalogue
              key={`${typeParam}-${categoryParam}-${subCategoryParam}`}
              items={filteredItems}
              types={catalogueSubTabs}
              noun={noun}
              type={subCategoryParam !== 'All' ? subCategoryParam : null}
              query={query}
              onTypeChange={(t) => updateHierarchy({ newSubCategory: t ?? 'All' })}
              stockFilter={stockParam}
              onStockFilterChange={(s) => updateHierarchy({ newStock: s })}
              sortBy={sortParam}
              onSortByChange={(sort) => updateHierarchy({ newSort: sort })}
            />
          </div>
        ) : (
          /* Default All Categories Overview */
          <CatalogueOverview
            items={dynamicItems}
            backendOnline={backendOnline}
            onSelect={(c) => updateHierarchy({ newCategory: c })}
          />
        )}
      </div>
    </>
  )
}
