import { useState } from 'react'
import { Category, Availability, FilterableItem, DEFAULT_LOCATION } from '@/components/services/types'

export function useServiceFilters() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('all')
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [availability, setAvailability] = useState<Availability>('all')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const activeFilterCount = [
    category !== 'all',
    location !== DEFAULT_LOCATION,
    availability !== 'all',
    !!priceMin,
    !!priceMax,
  ].filter(Boolean).length

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setLocation(DEFAULT_LOCATION)
    setAvailability('all')
    setPriceMin('')
    setPriceMax('')
  }

  /** Pass any array of FilterableItem (or superset) — returns the filtered subset */
  function applyFilters<T extends FilterableItem>(items: T[]): T[] {
    const q = search.toLowerCase()
    return items.filter((s) => {
      if (category !== 'all' && s.category !== category) return false
      if (location !== DEFAULT_LOCATION && s.location !== location) return false
      if (availability !== 'all' && s.availability !== availability) return false
      if (priceMin && s.price < Number(priceMin)) return false
      if (priceMax && s.price > Number(priceMax)) return false
      if (q && !s.name.toLowerCase().includes(q) && !s.provider.toLowerCase().includes(q)) return false
      return true
    })
  }

  return {
    search, setSearch,
    category, setCategory,
    location, setLocation,
    availability, setAvailability,
    priceMin, setPriceMin,
    priceMax, setPriceMax,
    showFilters, setShowFilters,
    activeFilterCount,
    clearFilters,
    applyFilters,
  }
}
