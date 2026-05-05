'use client'

import { Button } from '@/components/ui/button'

interface CategoryOption {
  key: string
  label: string
}

interface CategoryFilterProps {
  categories: readonly CategoryOption[]
  selected: string
  onChange: (key: string) => void
  className?: string
}

export function CategoryFilter({ categories, selected, onChange, className = '' }: CategoryFilterProps) {
  return (
    <div className={`-mx-4 px-4 sm:px-0 overflow-x-auto pb-2 ${className}`}>
      <div className="flex gap-2 whitespace-nowrap">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={selected === cat.key ? undefined : 'outline'}
            size="sm"
            onClick={() => onChange(cat.key)}
            className="whitespace-nowrap"
          >
            {cat.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
