'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import { Availability, AVAILABILITY_OPTIONS } from '@/components/services/types'

interface ServiceFilterPanelProps {
  visible: boolean
  locations: string[]
  selectedLocation: string
  onLocationChange: (value: string) => void
  priceMin: string
  priceMax: string
  onPriceMinChange: (value: string) => void
  onPriceMaxChange: (value: string) => void
  selectedAvailability: Availability
  onAvailabilityChange: (value: Availability) => void
  className?: string
}

export function ServiceFilterPanel({
  visible,
  locations,
  selectedLocation,
  onLocationChange,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  selectedAvailability,
  onAvailabilityChange,
  className = '',
}: ServiceFilterPanelProps) {
  if (!visible) return null

  return (
    <Card className={`p-5 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Location */}
        <div>
          <label
            htmlFor="location-filter"
            className="text-sm font-medium mb-2 flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5" /> Location
          </label>
          <select
            id="location-filter"
            title="Filter by location"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Price range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Price Range ($)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => onPriceMinChange(e.target.value)}
              min={0}
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => onPriceMaxChange(e.target.value)}
              min={0}
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="text-sm font-medium mb-2 block">Availability</label>
          <div className="flex gap-2 flex-wrap">
            {AVAILABILITY_OPTIONS.map((av) => (
              <Button
                key={av}
                size="sm"
                variant={selectedAvailability === av ? undefined : 'outline'}
                onClick={() => onAvailabilityChange(av)}
                className="capitalize"
              >
                {av === 'all' ? 'Any' : av}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
