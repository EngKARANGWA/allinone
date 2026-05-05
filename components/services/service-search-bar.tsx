'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, SlidersHorizontal, X } from 'lucide-react'

interface ServiceSearchBarProps {
  search: string
  onSearchChange: (value: string) => void
  showFilters: boolean
  onToggleFilters: () => void
  activeFilterCount: number
  onClearFilters: () => void
  placeholder?: string
  className?: string
}

export function ServiceSearchBar({
  search,
  onSearchChange,
  showFilters,
  onToggleFilters,
  activeFilterCount,
  onClearFilters,
  placeholder = 'Search services or providers...',
  className = '',
}: ServiceSearchBarProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Button
        variant={showFilters ? undefined : 'outline'}
        onClick={onToggleFilters}
        className="gap-2 shrink-0"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeFilterCount > 0 && (
          <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          onClick={onClearFilters}
          className="gap-1 shrink-0 text-destructive"
        >
          <X className="w-4 h-4" /> Clear
        </Button>
      )}
    </div>
  )
}
