"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin } from 'lucide-react'
import { ServiceSearchBar } from '@/components/services/service-search-bar'
import { CategoryFilter } from '@/components/services/category-filter'
import { ServiceFilterPanel } from '@/components/services/service-filter-panel'
import { useServiceFilters } from '@/hooks/use-service-filters'
import { CATEGORIES, Category } from '@/components/services/types'
import { ALL_SERVICES } from '@/lib/services-data'

const LOCATIONS = ['All Locations', 'Downtown', 'Kigali City', 'Kimironko', 'Remera', 'Nyamirambo']

const AVAILABILITY_COLOR: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  limited:   'bg-yellow-100 text-yellow-700',
  booked:    'bg-red-100 text-red-700',
}

export default function ServicesPage() {
  const router = useRouter()
  const filters = useServiceFilters()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const category = new URLSearchParams(window.location.search).get('category')
    const allowed: Category[] = ['all', 'photography', 'vehicles', 'mc', 'sound', 'catering']
    if (category && allowed.includes(category as Category)) {
      filters.setCategory(category as Category)
    }
  }, [])

  const filtered = filters.applyFilters(ALL_SERVICES)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse All Services</h1>
          <p className="text-foreground/60">Find the perfect services for your ceremony</p>
        </div>

        <ServiceSearchBar
          search={filters.search}
          onSearchChange={filters.setSearch}
          showFilters={filters.showFilters}
          onToggleFilters={() => filters.setShowFilters(!filters.showFilters)}
          activeFilterCount={filters.activeFilterCount}
          onClearFilters={filters.clearFilters}
          className="mb-6"
        />

        <CategoryFilter
          categories={CATEGORIES}
          selected={filters.category}
          onChange={(key) => filters.setCategory(key as Category)}
          className="mb-6"
        />

        <ServiceFilterPanel
          visible={filters.showFilters}
          locations={LOCATIONS}
          selectedLocation={filters.location}
          onLocationChange={filters.setLocation}
          priceMin={filters.priceMin}
          priceMax={filters.priceMax}
          onPriceMinChange={filters.setPriceMin}
          onPriceMaxChange={filters.setPriceMax}
          selectedAvailability={filters.availability}
          onAvailabilityChange={filters.setAvailability}
          className="mb-8"
        />

        <p className="text-sm text-foreground/60 mb-5">
          {filtered.length} service{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-foreground/50">
            <p className="text-lg font-medium mb-2">No services match your filters</p>
            <Button variant="outline" onClick={filters.clearFilters}>Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <Card key={s.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 w-full bg-muted overflow-hidden">
                  <img src={s.img.src ?? s.img} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-lg">{s.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${AVAILABILITY_COLOR[s.availability]}`}>
                      {s.availability}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/60 mb-3">{s.provider}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{s.rating}</span>
                    <span className="text-sm text-foreground/60">({s.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-foreground/60 mb-4">
                    <MapPin className="w-4 h-4" />
                    {s.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">${s.price.toLocaleString()}</div>
                    <Button size="sm" onClick={() => router.push(`/services/${s.id}`)}>View & Book</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
