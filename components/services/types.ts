export type Category = 'all' | 'photography' | 'vehicles' | 'mc' | 'sound' | 'catering'
export type Availability = 'all' | 'available' | 'limited' | 'booked'

export interface FilterState {
  search: string
  category: Category
  location: string
  availability: Availability
  priceMin: string
  priceMax: string
}

/** Any item that can be filtered by the useServiceFilters hook */
export interface FilterableItem {
  name: string
  provider: string
  category: string
  location: string
  availability: string
  price: number
}

export const CATEGORIES = [
  { key: 'all'         as Category, label: 'All Services'  },
  { key: 'photography' as Category, label: 'Photography'   },
  { key: 'vehicles'    as Category, label: 'Vehicles'      },
  { key: 'mc'          as Category, label: 'MC & Events'   },
  { key: 'sound'       as Category, label: 'Sound Systems' },
  { key: 'catering'    as Category, label: 'Catering'      },
] as const

export const AVAILABILITY_OPTIONS: Availability[] = ['all', 'available', 'limited', 'booked']

export const DEFAULT_LOCATION = 'All Locations'
